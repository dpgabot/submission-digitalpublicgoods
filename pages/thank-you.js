function ThankYou(props) {
  return (
    <h1>
      Thank you for making a submission, your pull request can be found here:
      {props.pr}
    </h1>
  );
}

export default ThankYou;
