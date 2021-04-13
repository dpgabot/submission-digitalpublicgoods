import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  footer: {
    padding: '0.1em',
    marginTop: 'auto',
    backgroundColor: theme.palette.grey[800],
  },
}));

export default function componentFooter() {
  const classes = useStyles();

  return (
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">
          	<p style={{textAlign:"center"}}>
				<a href="/legal">Legal</a>
				&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
				<a href="https://github.com/lacabra/submission-digitalpublicgoods" target="_blank" rel="noopener">Source Code</a>
				&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
				<a href="mailto:info@digitalpublicgoods.net">Contact us</a>
			</p>
          </Typography>
        </Container>
      </footer>
  );
}
