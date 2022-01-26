import {Octokit} from "@octokit/core";
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
const GITHUB_ASSIGNEES = process.env.GITHUB_ASSIGNEES
  ? process.env.GITHUB_ASSIGNEES.split(", ")
  : ["nathanbaleeta"];

// Parse name of project prior to saving file
function parseProjectName(values) {
  return values.name
    .trim() // removes whitespace from both ends of a string
    .normalize("NFD") // NFD normalization separates vowels from accents, to be removed later
    .toLowerCase()
    .replace(/\s{2,}/g, " ") // replace multiple consecutive whitespaces with a single whitespace
    .replace(/ /g, "-") // replace whitespace with dash
    .replace(/[^A-Za-z0-9-.]/g, "") // remove anything else other than A-Za-z0-9-. (note the inclusion of '-' and '.')
    .replace(/-{2,}/g, "-"); // replace multiple consecutive dashes with a single dash
}
// Create Github checkout branch for current submissions
function createGithubCheckoutBranch(name) {
  let nameArray = Array.from(name);
  nameArray = nameArray.filter((character) => {
    const invalidCharacters = [".", "~", "^", ":", "-"];
    switch (character) {
      case invalidCharacters[invalidCharacters.indexOf(character)]:
        break;
      default:
        return character;
    }
  });
  name = nameArray.join("");
  const checkoutBranch =
    name.replace(/\s/g, "-") + "-" + (Math.random() * 10 ** 16).toString(36);
  return checkoutBranch;
}
// Get SDG relevance info
function getSDGRelevanceInfo(values) {
  //Loop through SDG array and parse SDG information
  for (let i = 0; i < values.SDGs.length; i++) {
    let sdgNumber = parseInt(values.SDGs[i]);
    let evidenceText = "evidenceText".concat(sdgNumber);
    let evidenceURL = "evidenceURL".concat(sdgNumber);

    // Initialize the object in the array where it exists
    values.SDGs[i] = {
      SDGNumber: sdgNumber,
    };

    // Only add the field, if there exists a value for it
    if (values[evidenceText]) {
      values.SDGs[i].evidenceText = values[evidenceText];
      delete values[evidenceText];
    }

    // Only add the field, if there exists a value for it
    if (values[evidenceURL]) {
      values.SDGs[i].evidenceURL = values[evidenceURL];
      delete values[evidenceURL];
    }
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
function getSubmissionFiles(values, nomineeJSON) {
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
    "repositories",
  ].forEach((e) => delete values[e]);
  // Convert JavaScript submission sorted object into JSON string and add newline at EOF
  data = JSON.stringify(values, null, 2).concat("\n");
  // Parse project names using DPG naming convention for filenames
  name = parseProjectName(values);
  // Add nominee submission to nominee directory
  nomineePath = "nominees/" + `${name}` + ".json";
  // Add DPG submission to digitalpublicgoods directory
  dpgPath = "digitalpublicgoods/" + `${name}` + ".json";
  stage === "nominee"
    ? (files = {
        [nomineePath]: {
          content: nomineeJSON,
          encoding: "utf-8",
        },
      })
    : (files = {
        [nomineePath]: {
          content: nomineeJSON,
          encoding: "utf-8",
        },
        [dpgPath]: {
          content: data,
          encoding: "utf-8",
        },
      });
  return files;
}
// Nominee processing before opening pull request
function nomineeSubmission(values, sortedSubmission) {
  // Sort entries
  // Note that "stage": "nominee" for all nominations
  sortedSubmission = {
    name: values.name ? values.name : "",
    aliases: values.aliases ? [values.aliases] : [""],
    description: values.description ? values.description : "",
    website: values.website ? values.website : "",
    license: values.license ? values.license : [],
    SDGs: values.SDGs ? values.SDGs : [],
    sectors: values.sectors ? values.sectors : [],
    type: values.type ? values.type : [],
    repositories: values.repositories ? values.repositories : [],
    organizations: values.organizations ? [values.organizations] : [],
    stage: "nominee",
  };
  // Order nominee fields in the correct order e.g organizations
  sortedSubmission = orderFields(sortedSubmission);
  return sortedSubmission;
}

function submitPullRequests(projectName, filesObject) {
  const MyOctokit = Octokit.plugin(createPullRequest);
  const octokit = new MyOctokit({
    auth: TOKEN,
  });

  // initialize an array for Promises
  let promiseArray = [];

  for (const submission in filesObject) {
    let singleFile = {};
    singleFile[submission.toString()] = filesObject[submission.toString()];

    // Returns a normal Octokit PR response
    // See https://octokit.github.io/rest.js/#octokit-routes-pulls-create
    promiseArray.push(
      composeCreatePullRequest(octokit, {
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        title: submission.toString().includes("nominees")
          ? `Add nominee: ${projectName}`
          : `Add DPG: ${projectName}`,
        body: submission.toString().includes("nominees")
          ? "Automatic addition of a new nominee submitted through the online form available at https://digitalpublicgoods.net/submission"
          : "Automatic addition of a new digital public good submitted through the online form available at https://digitalpublicgoods.net/submission",
        base: GITHUB_BRANCH,
        head: createGithubCheckoutBranch(projectName),
        changes: [
          {
            // optional: if `files` is not passed, an empty commit is created instead
            files: singleFile,
            commit: `BLD: Add ${projectName}`,
          },
        ],
      })
    );
  }
  // return the array of promises
  return promiseArray;
}

function checkNull(arrayItem) {
  if (arrayItem) return arrayItem;
}

function removeNullsInArrays(submission) {
  let keys = Object.keys(submission);
  keys.forEach((element) => {
    // if it's an array, check for nulls and remove them
    if (Array.isArray(submission[element])) {
      submission[element] = submission[element].filter(checkNull);
    } else {
      if (typeof submission[element] == "object") {
        // recursive call
        removeNullsInArrays(submission[element]);
      }
    }
  });
  return submission;
}

export default async (req, res) => {
  const octokit = new Octokit({
    auth: TOKEN,
  });

  if (req.method === "POST") {
    let values = req.body.values;
    let nomineeJSON, sortedSubmission;

    // Exclude contact information from pull request
    delete values["contact"];

    // Remove nulls from values
    values = removeNullsInArrays(values);

    // Parse SDG information
    values = getSDGRelevanceInfo(values);
    sortedSubmission = nomineeSubmission(values, sortedSubmission);

    // Convert JavaScript submission sorted object into JSON string and add newline at EOF
    nomineeJSON = JSON.stringify(sortedSubmission, null, 2).concat("\n");

    let result = await Promise.allSettled(
      submitPullRequests(
        parseProjectName(values),
        getSubmissionFiles(values, nomineeJSON)
      )
    ).then(async (results) => {
      let pullRequestNumbers = [];

      // Only returning successful results in an array of PR number(s)
      for (const result of results) {
        if (result.status == "fulfilled") {
          pullRequestNumbers.push(result.value.data.number);

          if (GITHUB_ASSIGNEES) {
            await octokit.request(
              "DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees",
              {
                owner: GITHUB_OWNER,
                repo: GITHUB_REPO,
                issue_number: result.value.data.number,
                assignees: ["dpgabot"],
              }
            );
            await octokit.request(
              "POST /repos/{owner}/{repo}/issues/{issue_number}/assignees",
              {
                owner: GITHUB_OWNER,
                repo: GITHUB_REPO,
                issue_number: result.value.data.number,
                assignees: GITHUB_ASSIGNEES,
              }
            );
          }
        } else {
          // push error object into results array
          pullRequestNumbers.push(result);
          break;
        }
      }

      return pullRequestNumbers;
    });

    // If call to openPR was successful, result[0] contains the PR number
    if (Number.isInteger(result[0])) {
      // return success response
      res.statusCode = 200;
    } else {
      // otherwise return error
      res.statusCode = 500;
      result = result[0];
    }
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result));
  } else {
    // If it's not a POST request, return 405 - Method Not Allowed
    res.statusCode = 405;
    res.end();
  }
};
