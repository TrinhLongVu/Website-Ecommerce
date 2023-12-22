import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <form action="">
        <div className="input-box">
          <FontAwesomeIcon icon={faEnvelope} className="field-ico" />
          <input
            type="email"
            className="input-field"
            placeholder="Email Address"
          />
        </div>
        <div className="input-box">
          <FontAwesomeIcon icon={faLock} className="field-ico" />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
          />
        </div>
        <div className="input-box">
          <FontAwesomeIcon icon={faLock} className="field-ico" />
          <input
            type="password"
            className="input-field"
            placeholder="Confirm Password"
          />
        </div>
        <div className="agreed-term">
          By clicking "Register" you agree to our terms and privacy policy.
        </div>
        <button type="submit" className="submit-btn">
          REGISTER
        </button>
      </form>
      <div className="authen-route">
        Already have an account? <Link to="/authentication/login">Sign In</Link>
      </div>
    </>
  );
};

export default Register;
