import React, { useState, useEffect } from 'react';
import Head from "next/head";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import FooterComponent from '../components/footerComponent';


const GITHUB_OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER
  ? process.env.NEXT_PUBLIC_GITHUB_OWNER
  : "unicef";
const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO
  ? process.env.NEXT_PUBLIC_GITHUB_REPO
  : "submission-form";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
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


function ThankYou(props) {
  const classes = useStyles();
  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(['uuid']);
  
  useEffect(() => {
    // Delete the submission data from the DB
    async function fetchData() {
      const result = await fetch(`/api/removeDB/${cookies.uuid}`);
    }
    fetchData();
    // Remove the cookie, no longer needed
    removeCookie('uuid');
  }, []);

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      <Head>
        <title>Thank you</title>
      </Head>

      <main>
        <Typography component="div" variant="body1">
          <h1>
            Thank you!
          </h1>

          <p>Your nomination for a digital public good has been submitted successfully. 
          We will review your submission promptly, and we will be in contact with any follow up questions as needed.</p>

          <p>You can track the progress of your nomination through&nbsp;
          <a href={'https://github.com/'+GITHUB_OWNER+'/'+GITHUB_REPO+'/pull/'+router.query.pr} target="_blank" rel="noreferrer">
          this pull request
          </a>
          &nbsp;on our open source code repository.</p>

          <Box textAlign='center' style={{marginTop: '3em'}}>
            <Link href="/">
              <Button variant="contained" color="primary">Start a New Nomination</Button>
            </Link>
          </Box>

        </Typography>
      </main>
      <FooterComponent />
    </Container>
  );
}

export default ThankYou;
