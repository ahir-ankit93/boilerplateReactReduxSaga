import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Col, Form, FormGroup, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import ValidatedInput from "../../../components/ValidatedInput";
import PageLoader from "../../../components/PageLoader";
import { login, resetFlags, verifyAccount } from "../../../redux/actions/AuthAction";
import { isLoggedIn } from "../../../utility";

const Login = ({ authFlags, authErrors, user, login, verifyAccount, resetFlags, history, handleSubmit }) => {
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const search = history.location.search;
        if (search) {
            const params = new URLSearchParams(search);
            const uid = params.get('uid');
            const token = params.get('token');
            if (token && uid) {
                setLoading(true);
                verifyAccount({ token, uid });
            }
        }

        if (isLoggedIn()) {
            if (user && user.is_phone_verify) {
                history.push('/verified');
            } else {
                history.push('/add-phone');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (authErrors && authErrors.login) {
            toast.error(authErrors.login);
            resetFlags();
            setProcessing(false);
        }

        if (authFlags && authFlags.loginSuccess) {
            resetFlags();
            if (user && user.is_phone_verify) {
                history.push('/verified');
            } else {
                history.push('/add-phone');
            }
        }

        if (authErrors && authErrors.verifyAccount) {
            toast.error(authErrors.verifyAccount);
            setLoading(false);
            resetFlags();
            history.push('/login');
        }

        if (authFlags && authFlags.verifyAccountSuccess) {
            resetFlags();
            setLoading(false);
            history.push('/add-phone');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authErrors, authFlags]);

    const handleLogin = (formData) => {
        const { email, password } = formData;
        setProcessing(true);
        login({ email, password });
    };

    if (loading) {
        return <PageLoader />
    }

    return (
        <div className="auth-page-wrapper">
            <Form className="form-container" onSubmit={handleSubmit(handleLogin)}>
                <div className="form-header">
                    <h2>Welcome Back!</h2>
                </div>
                <FormGroup>
                    <Row>
                        <Label sm={4} xs={6}>Email</Label>
                        <Col sm={8} xs={6} className="label-redirection">
                            <Link to="/sign-up">Create Account?</Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <Field
                                component={ValidatedInput} type="email" name="email" placeholder="Email" />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Label sm={4} xs={6}>Password</Label>
                        <Col sm={8} xs={6} className="label-redirection">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <Field component={ValidatedInput} type="password" name="password" placeholder="Password" />
                        </Col>
                    </Row>
                </FormGroup>
                <div className="button_wrapper">
                    <button className="custom-btn-primary" type="submit" disabled={processing}>
                        LOG IN {processing && <FontAwesomeIcon icon={faSpinner} spin />}
                    </button>
                </div>
            </Form>
        </div>
    )
};

const validate = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Field is required';
    }
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Field is required';
    }
    return errors;
};

const mapStateToProps = state => ({
    authErrors: state.Auth.errors,
    authFlags: state.Auth.flags,
    user: state.Auth.user,
});

const mapDispatchToProps = dispatch => ({
    login: payload => {
        dispatch(login(payload))
    },
    verifyAccount: payload => {
        dispatch(verifyAccount(payload))
    },
    resetFlags: payload => {
        dispatch(resetFlags())
    }
});

const LoginComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default reduxForm({
    form: 'LoginForm',
    validate,
})(LoginComponent);
