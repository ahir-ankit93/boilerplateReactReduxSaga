import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { toast } from "react-toastify";
import { getStates } from "../../../utils/helper";
import {
  Col,
  FormGroup,
  Label,
  Input as InputComponent,
  UncontrolledTooltip,
  Form,
} from "reactstrap";
import { register, resetFlags } from "../../../redux/actions/AuthAction";
import ValidatedInput from "../../../components/ValidatedInput";
import ValidatedSelect from "../../../components/ValidatedSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const Register = ({
  authFlags,
  authErrors,
  user,
  register,
  resetFlags,
  history,
  handleSubmit,
}) => {
  const [termsChecked, setTerms] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [states] = useState(getStates());

  useEffect(() => {
    if (authErrors && authErrors.register) {
      toast.error(authErrors.register);
      resetFlags();
      setProcessing(false);
    }

    if (authFlags && authFlags.registerSuccess) {
      resetFlags();
      history.push("/resend-email");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authErrors, authFlags]);

  const handleCheck = () => {
    setTerms(!termsChecked);
  };

  const handleRegister = (formData) => {
    if (!termsChecked) {
      toast.error(
        "Please consent to the language and authorizations outlined in the ESIGN Consent, Privacy Policy, Terms of Use and Dispute Resolution Agreement."
      );
      return;
    }
    setProcessing(true);
    const { first_name, last_name, state, email, password } = formData;
    register({ first_name, last_name, state, email, password });
  };

  return (
    <div className="auth-page-wrapper">
      <Form className="form-container" onSubmit={handleSubmit(handleRegister)}>
        <div className="form-title">
          <h2>New User</h2>
          <p>
            Already a user? <Link to="/login">Log In</Link>
          </p>
        </div>
        <FormGroup row>
          <Label sm={4}>First Name</Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="text"
              name="first_name"
              placeholder="First Name"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>Last Name</Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="text"
              name="last_name"
              placeholder="Last Name"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="stateSelect" sm={4}>
            State of Residence
          </Label>
          <Col sm={7}>
            <Field
              component={ValidatedSelect}
              name="state"
              value={states[0].name}
              placeholder="Select State"
              isSearchable={true}
              isClearable={true}
              options={states}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} xs={12}>
            Email Address
          </Label>
          <Col sm={7} xs={10}>
            <Field
              component={ValidatedInput}
              type="email"
              name="email"
              placeholder="Email"
            />
          </Col>
          <div sm={1} xs={2}>
            <span id="email-tooltip">
              <FontAwesomeIcon icon={faQuestionCircle} />
            </span>
            <UncontrolledTooltip
              innerClassName="text-left fs12"
              placement="right"
              target="email-tooltip"
            >
              Your email will also be your username to log back in when you
              return to BrandName.
            </UncontrolledTooltip>
          </div>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} xs={12}>
            Password
          </Label>
          <Col sm={7} xs={10}>
            <Field
              component={ValidatedInput}
              type="password"
              name="password"
              placeholder="Password"
            />
          </Col>
          <div sm={1} xs={2}>
            <span id="password-tooltip">
              <FontAwesomeIcon icon={faQuestionCircle} />
            </span>
            <UncontrolledTooltip
              innerClassName="text-left fs12"
              placement="right"
              target="password-tooltip"
            >
              Please use at least one upper-case, one lower-case, one numbers,
              and one symbol in your password to make it more secure.
            </UncontrolledTooltip>
          </div>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} xs={12}>
            Confirm Password
          </Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="terms-check" sm={1} xs={1} className="ml-4">
            <InputComponent
              type="checkbox"
              id="terms-check"
              name="termsCheck"
              checked={termsChecked}
              onChange={handleCheck}
            />
          </Label>
          <Col
            sm={{ size: "10", offset: 1 }}
            xs={{ size: "10", offset: 1 }}
            className="pl-3 reduce-mt-1"
          >
            <Label check>
              I AGREE: I have read, understood Privacy Policy, Terms of Use and
              Dispute Resolution Agreement.
            </Label>
          </Col>
        </FormGroup>

        <div className="button_wrapper">
          <button
            className="custom-btn-primary"
            type="submit"
            disabled={processing}
          >
            SIGN UP {processing && <FontAwesomeIcon icon={faSpinner} spin />}
          </button>
        </div>
      </Form>
    </div>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = "Field is required";
  }
  if (!values.last_name) {
    errors.last_name = "Field is required";
  }
  if (!values.state) {
    errors.state = "Field is required";
  }
  if (!values.email) {
    errors.email = "Field is required";
  }
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Field is required";
  }
  if (
    values.password &&
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
      values.password
    )
  ) {
    errors.password =
      "Password must include uppercase, lowercase, digit and special character";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Field is required";
  }
  if (
    values.password &&
    values.confirmPassword &&
    values.password !== values.confirmPassword
  ) {
    errors.confirmPassword = "Password doesn't match";
  }
  return errors;
};

const mapStateToProps = (state) => ({
  authErrors: state.Auth.errors,
  authFlags: state.Auth.flags,
});

const mapDispatchToProps = (dispatch) => ({
  register: (payload) => {
    dispatch(register(payload));
  },
  resetFlags: (payload) => {
    dispatch(resetFlags());
  },
});

const RegisterComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default reduxForm({
  form: "RegisterForm",
  validate,
})(RegisterComponent);
