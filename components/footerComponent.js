import React from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  footer: {
    padding: "0.6em",
    marginTop: "auto",
    backgroundColor: theme.palette.grey[800],
    color: "#fff",
    "& a": {
      color: "#fff",
      textDecoration: "none",
    },
    "& a:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function componentFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1" style={{textAlign: "center"}}>
          <a href="/legal">Legal</a>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <a
            href="https://github.com/lacabra/submission-digitalpublicgoods"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source Code
          </a>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <a href="https://bug-reporter.vercel.app/">Report a bug / problem</a>
        </Typography>
      </Container>
    </footer>
  );
}
