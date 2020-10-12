import Head from 'next/head'
import FormRenderer from '@data-driven-forms/react-form-renderer';
import { FormTemplate, componentMapper } from '@data-driven-forms/mui-component-mapper';

import Box from '@material-ui/core/Box';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import schema from '../schemas/schema';

const validatorMapper = {}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }

}));

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
    MuiCheckbox: {
      root: {
        padding: '1px 9px'
      }
    }
  },
});

const validate = (values) => {
  console.log(values)
  const errors = {};

  for(let i=1; i<=17; i++){
    if (values.SDGs && values.SDGs.includes(i) && ! values['evidenceText'+i] && ! values['evidenceURL'+i]) {
      errors['evidenceText'+i] = 'Either the description or a URL is required';
      errors['evidenceURL'+i] = 'Either the description or a URL is required';
    }
  }

  return errors;
}

export default function Home() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">

      <Head>
        <title>Submission Form</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={classes.paper}>
        <ThemeProvider theme={theme}>

          <FormRenderer 
            validate={validate}
            schema={schema}
            onSubmit={(values, formApi) => alert('You are submitting this data: '+JSON.stringify(values))}
            FormTemplate={FormTemplate}
            componentMapper={componentMapper}
            validatorMapper={validatorMapper} // not required
          />
        </ThemeProvider>
      </div>
      
    </Container>
  )
}
