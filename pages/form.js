import React, {useState, useCallback, useEffect} from "react";
import {useCookies} from "react-cookie";
import {v4 as uuidv4} from "uuid";
import Head from "next/head";
import {useRouter} from "next/router";
import {FormRenderer} from "@data-driven-forms/react-form-renderer";

import {FormTemplate, componentMapper} from "@data-driven-forms/mui-component-mapper";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

import {ThemeProvider} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import LoadingOverlay from "react-loading-overlay";
import FooterComponent from "../components/footerComponent";
import theme from "../src/theme";
import schema from "../schemas/schema";

const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SPREADSHEET_SCRIPT_URL;

const validatorMapper = {};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(6),
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

const MyFormTemplate = (props) => <FormTemplate {...props} showFormControls={false} />;

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
  return function (...args) {
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
  const [cookies, setCookie, removeCookie] = useCookies(["uuid"]);
  const [initialValues, setInitialValues] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(`/api/loadDB/${cookies.uuid}`);
      const values = await result.json();
      setInitialValues(values);
      setShowAlert(true);
    }

    // Initialize cookie if not present
    const userId = uuidv4();
    if (!cookies.uuid) {
      setCookie("uuid", userId, {path: "/", maxAge: 2592000}); // maxAge: 30 days
    } else {
      fetchData();
    }
  }, []);

  const debouncedSave = useCallback(
    debounce((values) => saveToDb(values), 1000),
    [cookies.uuid]
  );

  async function saveToDb(values) {
    if (cookies.uuid) {
      await fetch(`/api/saveDB/${cookies.uuid}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          values: values,
        }),
      });
    }
  }

  async function openPR(values) {
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

    if (result.length == 0) {
      router.push({
        pathname: "/error",
        query: {error: result.error},
        state: values,
      });
    } else {
      // Clear form fields after clicking submit
      router.push({
        pathname: "/thank-you",
        query: result,
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
        errors["evidenceText" + i] = "Either the description or a URL is required";
        errors["evidenceURL" + i] = "Either the description or a URL is required";
      }
    }
    debouncedSave(values);

    return errors;
  };

  const onCancel = () => {
    // Delete the submission data from the DB
    async function removeData() {
      await fetch(`/api/removeDB/${cookies.uuid}`);
    }
    removeData();
    // Remove the cookie, no longer needed
    removeCookie("uuid");
    // Redirect to the start page
    router.push({
      pathname: "/",
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Head>
        <title>DPG Submission Form</title>
      </Head>

      <LoadingOverlay active={loadingOverlayActive} spinner text="Submitting the form...">
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
              onSubmit={(values) => openPR(values)}
              FormTemplate={MyFormTemplate}
              componentMapper={componentMapper}
              validatorMapper={validatorMapper} // not required
              initialValues={initialValues}
              onCancel={onCancel}
            />
          </ThemeProvider>
        </div>
      </LoadingOverlay>
      <FooterComponent />
    </Container>
  );
}
