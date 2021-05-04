import { Octokit } from "@octokit/core";
import {
  createPullRequest,
  composeCreatePullRequest,
} from "octokit-plugin-create-pull-request";

const TOKEN = process.env.ACCESS_TOKEN; // create token at https://github.com/settings/tokens/new?scopes=repo
const GITHUB_OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER
  ? process.env.NEXT_PUBLIC_GITHUB_OWNER
  : "unicef";
const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO
  ? process.env.NEXT_PUBLIC_GITHUB_REPO
  : "submission-form";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH
  ? process.env.GITHUB_BRANCH
  : "main"; /* optional: defaults to default branch */

// Return Project name
function getProjectName(values) {
  return values.name;
}

// Parse name of project prior to saving file
function parseProjectName(values) {
  return (
    values.name
      .normalize("NFD")
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "-") + ".json"
  );
}

// Create Github checkout branch for current submissions
function createGithubCheckoutBranch(name) {
  const checkoutBranch =
    `${name}`.split(".").slice(0, -1).join(".") +
    "-" +
    (Math.random() * 10 ** 16).toString(36);
  return checkoutBranch;
}

// Get SDG relevance info
function getSDGRelevanceInfo(values, sdgNumber, evidenceText) {
  //Loop through SDG array and parse SDG information
  for (let i = 0; i < values.SDGs.length; i++) {
    sdgNumber = parseInt(values.SDGs[i]);
    evidenceText = "evidenceText".concat(sdgNumber);

    values.SDGs[i] = {
      SDGNumber: sdgNumber,
      evidenceText: values[evidenceText],
    };

    delete values[evidenceText];
  }
  return values;
}

// Order fields e.g organizations
function orderFields(values) {
  let name, website, org_type, contact_name, contact_email;
  // Order all entries for organizations
  for (let i = 0; i < values.organizations.length; i++) {
    name = values.organizations[i].name;
    website = values.organizations[i].website;
    org_type = values.organizations[i].org_type;
    contact_name = values.organizations[i].contact_name;
    contact_email = values.organizations[i].contact_email;

    values.organizations[i] = {
      name: name,
      website: website,
      org_type: org_type,
      contact_name: contact_name,
      contact_email: contact_email,
    };
  }
  return values;
}

// Return multiple submission files including corresponding filepaths
function getSubmissionFiles(values, myJSON) {
  let name,
    nomineePath,
    dpgPath,
    stage,
    data,
    files = {};

  stage = values.stage;

  // Delete multiple DPG nomination fields
  [
    "aliases",
    "description",
    "website",
    "type",
    "SDGs",
    "license",
    "organizations",
    "stage",
    "repositoryURL",
  ].forEach((e) => delete values[e]);

  // Convert JavaScript submission sorted object into JSON string and add newline at EOF
  data = JSON.stringify(values, null, 2).concat("\n");

  // Parse project names using DPG naming convention for filenames
  name = parseProjectName(values);

  // Add nominee submission to nominee directory
  nomineePath = "nominees/" + `${name}`;

  // Add DPG submission to screening directory
  dpgPath = "screening/" + `${name}`;

  stage === "nominee"
    ? Object.entries(myJSON).forEach(
        ([key, value]) =>
          (files = {
            [nomineePath]: {
              content: myJSON,
              encoding: "utf-8",
            },
          })
      )
    : Object.entries(myJSON).forEach(
        ([key, value]) =>
          (files = {
            [nomineePath]: {
              content: myJSON,
              encoding: "utf-8",
            },
            [dpgPath]: {
              content: data,
              encoding: "utf-8",
            },
          })
      );

  return files;
}

// Nominee processing before opening pull request
function nomineeSubmission(values, sortedSubmission) {
  // Sort entries by iterating through object and unpacking entries
  Object.entries(values).forEach(
    ([key, value]) =>
      (sortedSubmission = {
        name: values.name ? values.name : "",
        aliases: values.aliases ? [values.aliases] : [""],
        description: values.description ? values.description : "",
        website: values.website ? values.website : "",
        license: values.license ? values.license : [],
        SDGs: values.SDGs ? values.SDGs : [],
        sectors: values.sectors ? values.sectors : [],
        type: values.type ? values.type : [],
        repositoryURL: values.repositoryURL ? values.repositoryURL : "",
        organizations: values.organizations ? [values.organizations] : [],
        stage: values.stage ? values.stage : "",
      })
  );

  // Order nominee fields in the correct order e.g organizations
  sortedSubmission = orderFields(sortedSubmission);
  return sortedSubmission;
}

// DPG candidate processing before opening pull request
function dpgSubmission(values, sortedSubmission) {
  // Sort entries by iterating through object and unpacking entries
  Object.entries(values).forEach(
    ([key, value]) =>
      (sortedSubmission = {
        name: values.name ? values.name : "",
        aliases: values.aliases ? [values.aliases] : [""],
        description: values.description ? values.description : "",
        website: values.website ? values.website : "",
        license: values.license ? values.license : [],
        SDGs: values.SDGs ? values.SDGs : [],
        sectors: values.sectors ? values.sectors : [],
        type: values.type ? values.type : [],
        repositoryURL: values.repositoryURL ? values.repositoryURL : "",
        organizations: values.organizations ? [values.organizations] : [],
        stage: values.stage ? values.stage : "",
      })
  );

  // Order fields in the correct order e.g nominee organizations
  sortedSubmission = orderFields(sortedSubmission);
  return sortedSubmission;
}

export default async (req, res) => {
  if (req.method === "POST") {
    let values = req.body.values;

    let myJSON, sdgNumber, evidenceText, sortedSubmission;

    // Exclude contact information from pull request
    delete values["contact"];

    // Parse SDG information
    values = getSDGRelevanceInfo(values, sdgNumber, evidenceText);

    // Verify submission stage(nominee/ DPG) and channel to nomination or DPG review processing
    sortedSubmission =
      values.stage === "nominee"
        ? nomineeSubmission(values, sortedSubmission)
        : dpgSubmission(values, sortedSubmission);

    // Convert JavaScript submission sorted object into JSON string and add newline at EOF
    myJSON = JSON.stringify(sortedSubmission, null, 2).concat("\n");

    const MyOctokit = Octokit.plugin(createPullRequest);

    const octokit = new MyOctokit({
      auth: TOKEN,
    });

    let result;
    try {
      // Returns a normal Octokit PR response
      // See https://octokit.github.io/rest.js/#octokit-routes-pulls-create
      const response = await composeCreatePullRequest(octokit, {
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        title: `Add nominee: ${getProjectName(values)}`,
        body:
          "Automatic addition of a new nominee submitted through the online form available at https://digitalpublicgoods.net/submission",
        base: GITHUB_BRANCH,
        head: createGithubCheckoutBranch(parseProjectName(values)),
        changes: [
          {
            /* optional: if `files` is not passed, an empty commit is created instead */
            files: getSubmissionFiles(values, myJSON),
            commit: `BLD: Add ${getProjectName(values)}`,
          },
        ],
      });

      result = {
        number: response.data.number,
      };
    } catch (err) {
      result = { error: err.message || err.toString() };
    }

    // return an unconditional success response
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result));
  } else {
    // If it's not a POST request, return 405 - Method Not Allowed
    res.statusCode = 405;
    res.end();
  }
};
