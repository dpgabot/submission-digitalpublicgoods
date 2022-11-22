import Head from "next/head";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    textAlign: "center",
    marginTop: theme.spacing(24),
  },
  main: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
}));

export default function Intro() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md" className={classes.root}>
      <Head>
        <title>DPG Submission Form</title>
      </Head>

      <main>
        <Typography component="div" variant="body1">
          <p style={{fontSize: "3rem"}}>
            Please visit
            <a
              style={{textDecoration: "none"}}
              name="top"
              href="https://app.digitalpublicgoods.net/signup"
            >
              {" "}
              app.digitalpublicgoods.net
            </a>
          </p>
        </Typography>
      </main>
    </Container>
  );
}
