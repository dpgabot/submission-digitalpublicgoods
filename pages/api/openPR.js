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

export default async (req, res) => {
  if (req.method === "POST") {
    const values = req.body.values;

    let myJSON, sdgNumber, evidenceText, nomineePath;

    // Exclude contact information from pull request
    delete values["contact"];

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

    let sortedObject;
    // Sort entries by iterating through object and unpacking entries
    Object.entries(values).forEach(
      ([key, value]) =>
        (sortedObject = {
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

    //console.log(sortedObject);

    myJSON = JSON.stringify(sortedObject, null, 3); // Convert JavaScript object to JSON string

    // Add newline at end of file
    myJSON += "\r\n";

    // Return project json file aligned with naming convention (includes removing accents)
    let name =
      values.name
        .normalize("NFD")
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, "-") + ".json";

    // Add partial submission to nominee directory
    nomineePath = "nominees/" + `${name}`;

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
              [nomineePath]: {
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
