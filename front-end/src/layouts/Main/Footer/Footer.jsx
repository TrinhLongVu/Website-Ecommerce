import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import "./footer.css";

import { Link } from "react-router-dom";

const Footer = ({ categoryList }) => {
  const today = new Date();

  return (
    <footer>
      <div className="foot-content">
        <div className="foot-row">
          <div className="foot-left-section">
            <div className="foot-title">
              <div>
                <FontAwesomeIcon icon={faCircleInfo} className="ico" /> The Mega
                Mall
              </div>
            </div>
            <div className="foot-section-content" id="foot-mega-para">
              Welcome to The Mega Mall, where luxury meets convenience in the
              world of online shopping. At The Mega Mall, we curate a
              sophisticated collection of the finest products, ensuring that
              each item reflects the epitome of elegance and quality. Dive into
              a seamless shopping experience that transcends the ordinary, with
              a user-friendly interface designed to make your online journey
              delightful and effortless.
            </div>
          </div>
          <div className="foot-right-section">
            <div className="foot-title">
              <div>
                <FontAwesomeIcon icon={faTags} className="ico" /> Categories
              </div>
            </div>
            <div className="foot-section-content" id="foot-categories">
              {categoryList.map((category, idx) => (
                <Link to={`/categories/${category.name}`} key={idx}>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="foot-banner">
        <div>
          <a>Privacy Policy | Terms & Conditions</a>
        </div>
        <div>Copyright © The Mega Mall @ {today.getFullYear()}</div>
      </div>
    </footer>
  );
};

export default Footer;
