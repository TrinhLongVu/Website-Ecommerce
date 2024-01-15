import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileRetro } from "@fortawesome/free-solid-svg-icons";

import "./error-404.css";

import { Link, useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="body-404">
        <div className="content-404">
          <div className="title-404">
            4
            <div className="error-404-icon">
              <FontAwesomeIcon icon={faMobileRetro} shake />
            </div>
            4
          </div>
          <div className="explain-404">OOPS !!! SOMETHING WENT WRONG !!!</div>
          <div className="nav-btn">
            <Link to="#" className="btn-404" onClick={goBack}>
              Go Back
            </Link>
            <Link to="/" className="btn-404">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404;
