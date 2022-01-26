import React, {useState, useEffect} from "react";
import Head from "next/head";
import {useRouter} from "next/router";
import {useCookies} from "react-cookie";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import FooterComponent from "../components/footerComponent";

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Error() {
  const classes = useStyles();
  const router = useRouter();
  const [values, setValues] = useState({});
  const [error, setError] = useState({});
  const [cookies] = useCookies(["uuid"]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(`/api/loadDB/${cookies.uuid}`);
      const values = await result.json();
      setValues(values);
    }
    fetchData();
    setError(JSON.parse(router.query.error));
  }, []);

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      <Head>
        <title>Error</title>
      </Head>

      <div className={classes.paper}>
        <h1>Oh Snap! :(</h1>

        <p style={{fontSize: "1.3em"}}>
          Something went wrong in your submission. Please contact{" "}
          <a href="mailto:nominations@digitalpublicgoods.net">
            nominations@digitalpublicgoods.net
          </a>{" "}
          and include the information below:
        </p>
        <h3 style={{alignSelf: "flex-start"}}>Error:</h3>
        <pre style={{alignSelf: "flex-start"}}>{JSON.stringify(error, null, 2)}</pre>

        <h3 style={{alignSelf: "flex-start"}}>Copy of your submission:</h3>
        <pre style={{alignSelf: "flex-start"}}>{JSON.stringify(values, null, 2)}</pre>
      </div>
      <FooterComponent />
    </Container>
  );
}

export default Error;
