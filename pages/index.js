import React, { useState, useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { v4 as uuidv4 } from 'uuid';
import Head from "next/head";
import { useRouter } from 'next/router';
import FormRenderer from "@data-driven-forms/react-form-renderer";

import {
  FormTemplate,
  componentMapper,
} from "@data-driven-forms/mui-component-mapper";
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import Box from "@material-ui/core/Box";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { Octokit } from "@octokit/core";
import { createPullRequest } from "octokit-plugin-create-pull-request";
import LoadingOverlay from 'react-loading-overlay';

import schema from "../schemas/schema";

const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SPREADSHEET_SCRIPT_URL;

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

async function saveContactToGoogleSpreadsheet(values) {
  // Access contact key from values
  const contact = values["contact"];
  // Create empty form data element
  let formData = new FormData();

  // Add contact key value pairs to formData
  formData.append("Project Name", values.name);
  formData.append("Contact Name", contact.name);
  formData.append("Email Address", contact.email);

  fetch(scriptURL, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log(response.status);
    })
    .catch((error) => {
      console.log("Error!", error.message);
    });
}

const debounce = (func, wait) => {
  let timeout;
  return function(...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
};

export default function Home() {
  const classes = useStyles();
  const router = useRouter();
  const [loadingOverlayActive, setLoadingOverlayActive] = useState(false);
  const [values, setValues] = useState({});
  const [cookies, setCookie] = useCookies(['uuid']);
  const [initialValues, setInitialValues] = useState({});
  const [showAlert, setShowAlert] = useState(false);


  useEffect(() => {
    // Initialize cookie if not present
    const userId = uuidv4();
    if(!cookies.uuid){
      setCookie('uuid', userId, { path: '/', maxAge: 2592000 }); // maxAge: 30 days
    } else {
      async function fetchData() {
        const result = await fetch(`/api/loadDB/${cookies.uuid}`);
        const values = await result.json();
        setInitialValues(values);
        setShowAlert(true);
      }
      fetchData();
    }
  }, []);

  const debouncedSave = useCallback(
    debounce(values => saveToDb(values), 1000),
    [cookies.uuid]
  );

  async function saveToDb(values) {
    if(cookies.uuid) {
      const response = await fetch(`/api/saveDB/${cookies.uuid}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          values: values
        }),
      });
    }
  }

  async function openPR(values, formApi, state) {

    setLoadingOverlayActive(true);

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

    // Save contact information to google spreadsheet
    saveContactToGoogleSpreadsheet(values);

    if('error' in result) {
      router.push({
        pathname: '/error',
        query: { error: result.error},
        state: values
      });
    } else {
      // Clear form fields after clicking submit
      router.push({
        pathname: '/thank-you',
        query: { pr: result.number}
      });
    }
  }

  const validate = (values) => {
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
    debouncedSave(values);

    return errors;
  };

  return (
    <Container component="main" maxWidth="sm">
      <Head>
        <title>DPG Submission Form</title>
      </Head>

      <LoadingOverlay
          active={loadingOverlayActive}
          spinner
          text='Submitting the form...'
          >
        <div className={classes.paper}>
        
          <Collapse in={showAlert}>
              <Alert 
                severity="info"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setShowAlert(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Found data from a previous session, and loaded into the form.
              </Alert>
            </Collapse>

          <ThemeProvider theme={theme}>
            <FormRenderer
              validate={validate}
              schema={schema}
              onSubmit={(values, formApi) => openPR(values)}
              FormTemplate={MyFormTemplate}
              componentMapper={componentMapper}
              validatorMapper={validatorMapper} // not required
              initialValues={initialValues}
            />
          </ThemeProvider>
        </div>
      </LoadingOverlay>
    </Container>
  );
}
