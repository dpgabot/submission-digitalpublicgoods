import { Octokit } from "@octokit/core";
import { createPullRequest, composeCreatePullRequest } from "octokit-plugin-create-pull-request";

const TOKEN = process.env.ACCESS_TOKEN; // create token at https://github.com/settings/tokens/new?scopes=repo
const GITHUB_OWNER = process.env.GITHUB_OWNER ? process.env.GITHUB_OWNER : "nathanbaleeta";
const GITHUB_REPO = process.env.GITHUB_REPO ? process.env.GITHUB_REPO : "submission-form";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH ? process.env.GITHUB_BRANCH : "main"; /* optional: defaults to default branch */

export default async (req, res) => {
	if (req.method === 'POST') {

		const values = req.body.values;
		console.log(values)

		// Exclude contact information from pull request
		delete values["contact"];

		let sdgNumber, evidenceText;
		for (let i = 0; i < values.SDGs.length; i++) {
		sdgNumber = parseInt(values.SDGs[i]);
		evidenceText = "evidenceText".concat(sdgNumber);

		values.SDGs[i] = {
		  SDGNumber: sdgNumber,
		  evidenceText: values[evidenceText],
		};

		delete values[evidenceText];
		}

		const myJSON = JSON.stringify(values, null, "\t");

		// Return project json file aligned with naming convention (includes removing accents)
		let name =
		values.name
		  .normalize("NFD")
		  .toLowerCase()
		  .replace(/[\u0300-\u036f]/g, "")
		  .replace(/ /g, "-") + ".json";

		const MyOctokit = Octokit.plugin(createPullRequest);

		const octokit = new MyOctokit({
			auth: TOKEN,
		});

		// Returns a normal Octokit PR response
		// See https://octokit.github.io/rest.js/#octokit-routes-pulls-create
		const response = await composeCreatePullRequest(octokit,
		{
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
		        [name]: {
		          content: myJSON,
		          encoding: "utf-8",
		        },
		      },
		      commit: `BLD: Add ${values.name}`,
		    },
		  ],
		})

		console.log(response)

		const result = {
			number: response.data.number
		}

		console.log(result)

		// return an unconditional success response
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(result));
	} else {
		// If it's not a POST request, return 405 - Method Not Allowed
		res.statusCode = 405;
		res.end();
	}
}
