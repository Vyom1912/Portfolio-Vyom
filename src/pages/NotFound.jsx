import { Link } from "react-router";
import Page from "../components/Page.jsx";

export default function NotFound() {
  return (
    <Page path="/404">
      <section className="wrap page-head not-found">
        <p className="label">404</p>
        <h1>This page doesn't exist</h1>
        <p className="lede">The link may be old, or the address might have a typo.</p>
        <div className="actions">
          <Link className="btn btn-solid" to="/">Go to the home page</Link>
          <Link className="btn" to="/work/">See my work</Link>
        </div>
      </section>
    </Page>
  );
}
