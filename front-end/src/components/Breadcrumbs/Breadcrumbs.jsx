// Libraries
import { Link } from "react-router-dom";
// Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
// Style
import "./breadcrumbs.css";
const Breadcrumbs = ({ crumbList }) => {
  return (
    <>
      <div className="breadcrumbs">
        {crumbList.reverse().map((crumb, idx) => (
          <Link key={idx} to={crumb.link} className="crumb">
            {crumb.name}
          </Link>
        ))}
        <Link to="/" className="crumb">
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </div>
    </>
  );
};

export default Breadcrumbs;
