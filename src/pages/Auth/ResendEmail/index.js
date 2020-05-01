import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { resendEmail, deleteUser, resetFlags } from "../../../redux/actions/AuthAction";
import { connect } from "react-redux";
import { Col, Form, FormGroup, Label, Row } from "reactstrap";
import { Field, reduxForm, change } from "redux-form";
import ValidatedInput from "../../../components/ValidatedInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ResendEmail = ({ authFlags, authErrors, resendEmail, deleteUser, resetFlags, handleSubmit, user, dispatch, history }) => {
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        dispatch(change('ResendEmailForm', 'email', (user && user.email) || null));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (authErrors && authErrors.resendEmail) {
            toast.error(authErrors.resendEmail);
            setProcessing(false);
            resetFlags();
        }

        if (authErrors && authErrors.deleteUser) {
            toast.error(authErrors.deleteUser);
            setProcessing(false);
            resetFlags();
        }

        if (authFlags && authFlags.resendEmailSuccess) {
            toast.success('Email has been successfully sent.');
            setProcessing(false);
            resetFlags();
        }

        if (authFlags && authFlags.deleteUserSuccess) {
            setProcessing(false);
            resetFlags();
            history.push('/sign-up');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authErrors, authFlags]);


    const handleResendEmail = () => {
        setProcessing(true);
        resendEmail({ uid: user.id });
    };

    const handleDelete = () => {
        setProcessing(true);
        if (!processing) {
            deleteUser({ id: user.id });
        }

    };

    return (
        <div className="auth-page-wrapper">
            <Form className="form-container" onSubmit={handleSubmit(handleResendEmail)}>
                <div className="form-header">
                    <h2>Verify your email address</h2>
                    <span>To verify you're human, please verify your email address.<br />
                        An email has been sent to:</span>
                </div>
                <FormGroup>
                    <Row>
                        <Label sm={6} xs={6}>Email Address:</Label>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <Field
                                component={ValidatedInput}
                                type="text"
                                name="email"
                                disabled={true} />
                        </Col>
                    </Row>
                </FormGroup>
                <div className="button_wrapper">
                    <button className="custom-btn-primary" type="submit" disabled={processing}>
                        RESEND EMAIL {processing && <FontAwesomeIcon icon={faSpinner} spin />}
                    </button>
                </div>
                <div className="links-forgot">
                    <a href="#/" onClick={handleDelete}>Entered an incorrect email address?</a>
                </div>
            </Form>
        </div>
    )
};

const mapStateToProps = state => ({
    authErrors: state.Auth.errors,
    authFlags: state.Auth.flags,
    user: state.Auth.user
});

const mapDispatchToProps = dispatch => ({
    resendEmail: payload => {
        dispatch(resendEmail(payload))
    },
    deleteUser: payload => {
        dispatch(deleteUser(payload))
    },
    resetFlags: payload => {
        dispatch(resetFlags())
    }
});

const ResendEmailComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResendEmail);

export default reduxForm({
    form: 'ResendEmailForm',
})(ResendEmailComponent);
