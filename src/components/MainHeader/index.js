import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./mainHeader.scss";
import {
  toggleMobileMenu,
  getUserProfile,
  logout,
  resetFlags,
} from "../../redux/actions/AuthAction";

const MainHeader = ({
  user,
  toggleMobileMenu,
  getUserProfile,
  investAccount,
  getPlaidAccounts,
  getInvestAccount,
  logout,
  resetAccountFlags,
  authFlags,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authFlags && authFlags.getUserProfileSuccess) {
      if (investAccount && investAccount.id) {
        resetAccountFlags();
        getPlaidAccounts({ id: investAccount.id });
        getInvestAccount({ id: investAccount.id });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [investAccount, authFlags]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="site-header">
      <div className="top-bar">
        <a href="#/">Refer friends</a>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>
            {(user && (user.first_name || user.username)) || "Login User"}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <button className="sidebar-toggle ml-2" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authErrors: state.Auth.errors,
  authFlags: state.Auth.flags,
  user: state.Auth.user,
  showMobileMenu: state.Auth.showMobileMenu,
  investAccount: state.Account.investAccount,
});

const mapDispatchToProps = (dispatch) => ({
  toggleMobileMenu: (payload) => {
    dispatch(toggleMobileMenu(payload));
  },
  getUserProfile: () => {
    dispatch(getUserProfile());
  },

  logout: () => {
    dispatch(logout());
  },
  resetAccountFlags: () => {
    dispatch(resetFlags());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
