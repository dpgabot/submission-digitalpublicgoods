import Head from "next/head";
import FormRenderer from "@data-driven-forms/react-form-renderer";
import {
  FormTemplate,
  componentMapper,
} from "@data-driven-forms/mui-component-mapper";

import Box from "@material-ui/core/Box";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import { Octokit } from "@octokit/core";
import { createPullRequest } from "octokit-plugin-create-pull-request";

import schema from "../schemas/schema";

const validatorMapper = {};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        padding: "0 30px",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      },
    },
    MuiCheckbox: {
      root: {
        padding: "1px 9px",
      },
    },
  },
});

const MyFormTemplate = (props) => (
  <FormTemplate {...props} showFormControls={false} />
);

const validate = (values) => {
  console.log(values);
  const errors = {};

  for (let i = 1; i <= 17; i++) {
    if (
      values.SDGs &&
      values.SDGs.includes(i) &&
      !values["evidenceText" + i] &&
      !values["evidenceURL" + i]
    ) {
      errors["evidenceText" + i] =
        "Either the description or a URL is required";
      errors["evidenceURL" + i] = "Either the description or a URL is required";
    }
  }

  return errors;
};

function openPR(values) {
  const MyOctokit = Octokit.plugin(createPullRequest);

  const TOKEN = "99ed9ad8b3a818835cb543f587b8048b9895661f"; // create token at https://github.com/settings/tokens/new?scopes=repo
  const octokit = new MyOctokit({
    auth: TOKEN,
  });

  // Returns a normal Octokit PR response
  // See https://octokit.github.io/rest.js/#octokit-routes-pulls-create
  octokit
    .createPullRequest({
      owner: "nathanbaleeta",
      repo: "submission-form",
      title: `Add nominee: ${values.name}`,
      body:
        "Automatic addition of a new nominee submitted through the online form available at https://digitalpublicgoods.net/submission",
      base: "main" /* optional: defaults to default branch */,
      head:
        `${values.name}`.replace(/ /g, "_") +
        "-" +
        (Math.random() * 10 ** 16).toString(36),
      changes: [
        {
          /* optional: if `files` is not passed, an empty commit is created instead */
          /* files: {
        "path/to/file1.txt": "Content for file1",
        "path/to/file2.png": {
          content: "_base64_encoded_content_",
          encoding: "base64",
        },
        // deletes file if it exists,
        "path/to/file3.txt": null,
        // updates file based on current content
        "path/to/file4.txt": ({ exists, encoding, content }) => {
          // do not create the file if it does not exist
          if (!exists) return null;

          return Buffer.from(content, encoding)
            .toString("utf-8")
            .toUpperCase();
        },
      }, */
          commit: `BLD: Add ${values.name}`,
        },
      ],
    })
    .then((pr) => console.log(pr.data.number));
}

export default function Home() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <Head>
        <title>DPG Submission Form</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={classes.paper}>
        <ThemeProvider theme={theme}>
          <FormRenderer
            validate={validate}
            schema={schema}
            onSubmit={(values, formApi) => openPR(values)}
            FormTemplate={MyFormTemplate}
            componentMapper={componentMapper}
            validatorMapper={validatorMapper} // not required
          />
        </ThemeProvider>
      </div>
    </Container>
  );
}
