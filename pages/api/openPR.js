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

// Nominee processing before opening pull request
function nomination(values, sortedSubmission) {
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
        organizations: values.organizations ? values.organizations : [],
        stage: values.stage ? values.stage : "",
      })
  );

  return sortedSubmission;
}

// DPG candidate processing before opening pull request
function dpgReview(values, sortedSubmission) {
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

  // Order fields by iterating through object
  Object.entries(values).forEach(
    ([key, value]) =>
      (sortedSubmission = {
        name: values.name ? values.name : "",
        clearOwnership: values.clearOwnership ? values.clearOwnership : "",
        platformIndependence: values.platformIndependence
          ? values.platformIndependence
          : "",
        documentation: values.documentation ? values.documentation : "",
        NonPII: values.NonPII ? values.NonPII : "",
        privacy: values.privacy ? values.privacy : "",
        standards: values.standards ? values.standards : "",

        doNoHarm: values.doNoHarm ? values.doNoHarm : "",

        locations: values.locations ? values.locations : {},
      })
  );
  console.log(sortedSubmission);
  return sortedSubmission;
}

function getFilePath(values, name, nomineePath, dpgPath) {
  // Return project json file aligned with naming convention (includes removing accents)
  name =
    values.name
      .normalize("NFD")
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "-") + ".json";

  // Add nominee submission to nominee directory
  nomineePath = "nominees/" + `${name}`;

  // Add DPG submission to screening directory
  dpgPath = "screening/" + `${name}`;

  return values.stage === "nominee" ? nomineePath : dpgPath;
}

export default async (req, res) => {
  if (req.method === "POST") {
    let values = req.body.values;

    let myJSON,
      name,
      sdgNumber,
      evidenceText,
      filePath,
      nomineePath,
      dpgPath,
      sortedSubmission;

    // Exclude contact information from pull request
    delete values["contact"];

    // Parse SDG information
    values = getSDGRelevanceInfo(values, sdgNumber, evidenceText);

    // Verify submission stage(nominee/ DPG) and channel to nomination or DPG review processing
    sortedSubmission =
      values.stage === "nominee"
        ? nomination(values, sortedSubmission)
        : dpgReview(values);

    // Convert JavaScript submission sorted object into JSON string
    myJSON = JSON.stringify(sortedSubmission, null, 3);

    // Add newline at end of file
    myJSON += "\r\n";

    // Get file path & correct naming for nominee or DPG
    filePath = getFilePath(values, name, nomineePath, dpgPath);

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
        title: `Add nominee: ${values.name}`,
        body:
          "Automatic addition of a new nominee submitted through the online form available at https://digitalpublicgoods.net/submission",
        base: GITHUB_BRANCH,
        head:
          `${name}`.split(".").slice(0, -1).join(".") +
          "-" +
          (Math.random() * 10 ** 16).toString(36),
        changes: [
          {
            /* optional: if `files` is not passed, an empty commit is created instead */
            files: {
              [filePath]: {
                content: myJSON,
                encoding: "utf-8",
              },
            },
            commit: `BLD: Add ${values.name}`,
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
