import React, { Component } from "react";
import PlaidLink from "react-plaid-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

class PlaidControl extends Component {
  handleOnSuccess = (token, metadata) => {
    // send token to client server
    this.props.onSuccess(token, metadata);
  };
  handleOnExit = () => {
    // handle the case when your user exits Link
    this.props.onExit();
  };
  render() {
    return (
      <PlaidLink
        clientName="BrandName"
        env="sandbox"
        product={["transactions", "auth", "identity", "assets", "income"]}
        publicKey="b4377ff8e892f834decdbdb11d85a7"
        onExit={this.handleOnExit}
        onSuccess={this.handleOnSuccess}
      >
        {this.props.title}{" "}
        {this.props.processing && <FontAwesomeIcon icon={faSpinner} spin />}
      </PlaidLink>
    );
  }
}

export default PlaidControl;
