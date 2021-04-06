import "../styles/global.css";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const history = createMemoryHistory();

export default function App({ Component, pageProps }) {
  return (
    <Router history={history}>
      <Component {...pageProps} />
    </Router>
  );
}
