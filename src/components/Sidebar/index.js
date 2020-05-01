import React from "react";
import "./sidebar.scss";
import { toggleMobileMenu } from "../../redux/actions/AuthAction";
import { connect } from "react-redux";

const Sidebar = ({ showMobileMenu }) => (
  <div className={`sidebar-panel  ${!showMobileMenu ? "hide-mobile" : ""}`}>
    <nav>
      <a href="#/">
        <img src="/logo-square.png" alt="BrandName" />
      </a>
    </nav>
    <ul>
      <li>
        <a href="#/">Dashboard</a>
      </li>
      <li>
        <a href="#/">Plan</a>
      </li>
      <li>
        <a href="#/">Invest</a>
      </li>
      <li>
        <a href="#/">Protect</a>
      </li>
      <li>
        <a href="#/">Taxes</a>
      </li>
      <li className="divider"></li>
      <li>
        <a href="#/">Action Items</a>
      </li>
      <li>
        <a href="#/">Document</a>
      </li>
      <li>
        <a href="#/">Communication</a>
      </li>
      <a href="#/" className="link">
        Give Feedback
      </a>
    </ul>
  </div>
);

const mapStateToProps = (state) => ({
  showMobileMenu: state.Auth.showMobileMenu,
});

const mapDispatchToProps = (dispatch) => ({
  toggleMobileMenu: (payload) => {
    dispatch(toggleMobileMenu(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
