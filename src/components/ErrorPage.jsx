import { Link } from "react-router-dom";
import "./ErrorPage.css";

export default function ErrorPage() {
  return (
    <>
      <h3 className="errorpage-message">
        Oops...looks like you are at the wrong page!
      </h3>
      <Link to="/">
        <h3 className="errorpage-message">Go Back to HomePage</h3>
      </Link>
    </>
  );
}
