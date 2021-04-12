import Head from "next/head";
import { useRouter } from 'next/router';
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const GITHUB_OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER
  ? process.env.NEXT_PUBLIC_GITHUB_OWNER
  : "unicef";
const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO
  ? process.env.NEXT_PUBLIC_GITHUB_REPO
  : "submission-form";

const useStyles = makeStyles((theme) => ({
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

const getButtonStyle = (variant) => ({
  color: "White",
  backgroundColor: "blue",
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

function ThankYou(props) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Container component="main" maxWidth="sm">
      <Head>
        <title>Thank you</title>
      </Head>

      <div className={classes.paper}>
        <h1>
          Thank you!
        </h1>

        <p style={{fontSize: '1.3em'}}>Your nomination for a digital public good has been submitted successfully. 
        We will review your submission promptly, and we will be in contact with any follow up questions as needed.</p>

        <p style={{fontSize: '1.3em'}}>You can track the progress of your nomination through&nbsp;
        <a href={'https://github.com/'+GITHUB_OWNER+'/'+GITHUB_REPO+'/pull/'+router.query.pr} target="_blank" rel="noreferrer">
        this pull request
        </a>
        &nbsp;on our open source code repository.</p>

        <p>&nbsp;</p>

        <Button
          type="button"
          variant="add"
          onClick={() => router.push('/')}
          label="Start a New Nomination"
        />
      </div>
    </Container>
  );
}

export default ThankYou;
