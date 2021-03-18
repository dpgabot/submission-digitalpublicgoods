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

//const scriptURL = process.env.GOOGLE_SPREADSHEET_SCRIPT_URL;

const scriptURL =
  "https://script.google.com/macros/s/AKfycbx5HwOrXAiUpEHpSJOo-bFykOVGno_Ze8tp5pp_c-rlZAewmcQ1YGPMaXdYzr1-FxBOKQ/exec";

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

const wrapperStyles = {
  padding: 16,
  borderRadius: 4,
  fontFamily: "Roboto",
};
const getBackgroundColor = (variant) =>
  ({
    primary: "RebeccaPurple",
    add: "LimeGreen",
    remove: "#FF4136",
  }[variant] || "#888");

const getButtonStyle = (variant) => ({
  color: "White",
  backgroundColor: getBackgroundColor(variant),
  padding: "8px 16px",
  borderRadius: 4,
  cursor: "pointer",
  border: "none",
  marginRight: 4,
});

const Button = ({ children, label, variant, ...props }) => (
  <button style={getButtonStyle(variant)} {...props}>
    {label}
  </button>
);

const MyFormTemplate = (props) => (
  <FormTemplate {...props} showFormControls={false} />
);

const FieldArrayCustom = (props) => {
  const {
    fieldKey,
    arrayValidator,
    title,
    description,
    fields,
    itemDefault,
    meta,
    ...rest
  } = useFieldApi(props);
  const { dirty, submitFailed, error } = meta;
  const isError = (dirty || submitFailed) && error && typeof error === "string";
  return (
    <FieldArray key={fieldKey} name={rest.input.name} validate={arrayValidator}>
      {(cosi) => (
        <Fragment>
          {title && <h3>{title}</h3>}
          {description && <p>{description}</p>}
          {cosi.fields.map((name, index) => (
            <ArrayItem
              key={`${name || fieldKey}-${index}`}
              fields={fields}
              name={name}
              fieldKey={fieldKey}
              fieldIndex={index}
              remove={cosi.fields.remove}
            />
          ))}
          {isError && error}
          <br />
          <Button
            type="button"
            variant="add"
            onClick={() => cosi.fields.push(itemDefault)}
            label="Add +"
          />
          <br />
          <br />
        </Fragment>
      )}
    </FieldArray>
  );
};

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

async function openPR(values) {
  const response = await fetch("/api/openPR", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      values: values,
    }),
  });
  const result = await response.json();
  console.log(result);

  // Save contact information to google spreadsheet
  saveContactToGoogleSpreadsheet(values);
}

async function saveContactToGoogleSpreadsheet(values) {
  const data = JSON.stringify(values["contact"]);

  fetch(scriptURL, {
    method: "POST",
    body: data,
  })
    .then((response) => {
      console.log(response.status);
    })
    .catch((error) => {
      console.log("Error!", error.message);
    });
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
