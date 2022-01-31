import Head from "next/head";
import Link from "next/link";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import FooterComponent from "../components/footerComponent";
import {makeStyles} from "@material-ui/core/styles";

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
  disclaimer: {
    fontSize: "0.9em",
    color: "darkgrey",
    fontStyle: "italic",
  },
}));

export default function Intro() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      <Head>
        <title>DPG Submission Form</title>
      </Head>

      <main>
        <Typography component="div" variant="body1">
          <a name="top">
            <h1 style={{fontSize: "3rem"}}>DPG Submission Form</h1>
          </a>

          <p>
            This submission form requests information that will be used to assess whether
            a project meets the minimum requirements to be considered a Digital Public
            Good according to the DPG Alliance. This process is being regularly updated
            and improved so additional information may be requested in addition to what is
            collected through this form.
          </p>

          <p>
            Please check the&nbsp;
            <a
              href="http://digitalpublicgoods.net/submission-guide"
              target="_blank"
              rel="noreferrer"
            >
              submission guide
            </a>
            &nbsp;in advance to know what information will be requested of you. If you do
            not have all of the information about a project you may still submit it.
            Please provide as much information as possible. Projects with more complete
            information will move more quickly through the vetting process.
          </p>

          <p>
            Problems?{" "}
            <a href="mailto:support@digitalpublicgoods.net">
              support@digitalpublicgoods.net
            </a>
          </p>

          <Box textAlign="center" style={{marginTop: "3em"}}>
            <Link href="/form">
              <Button variant="contained" color="primary">
                Start
              </Button>
            </Link>
          </Box>

          <p className={classes.disclaimer}>
            This site uses cookies to &quot;remember&quot; you, and autosave the
            information that you are entering in this form until you submit. By doing so,
            you can come back to a previous session and continue where you left off your
            form. By continuing, you are agreeing to our{" "}
            <a href="/legal#cookies-policy">use of cookies</a> and{" "}
            <a href="/legal#terms-of-use">terms of use</a>.
          </p>
        </Typography>
      </main>

      <FooterComponent />
    </Container>
  );
}
