import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Input as InputComponent, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const ValidatedInput = (field) => {
    const {
        input,
        placeholder,
        disabled = false,
        type,
        minDate,
        maxDate,
        prefix,
        meta: { touched, error, warning },
        displayShowPassword,
    } = field;

    const [selectedDate, setSelectedDate] = useState();
    const [inputType, setInputType] = useState(type);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = moment(date).format('MM/DD/YYYY');
        input.onChange(formattedDate);
    };

    const togglePasswordShow = (event) => {
        event.preventDefault();
        setInputType(inputType === 'password' ? 'text' : 'password');
    }

    return (
        <div>
            {type === 'date' ?
                <DatePicker
                    {...input}
                    dateFormat="MM/dd/yyyy"
                    className="form-control"
                    placeholderText="MM/DD/YYYY"
                    disabled={disabled}
                    minDate={minDate}
                    maxDate={maxDate}
                    selected={selectedDate}
                    onChange={(value) => handleDateChange(value)}
                />
                :
                prefix ?
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>{prefix}</InputGroupText>
                        </InputGroupAddon>
                        <InputComponent
                            type={type}
                            disabled={disabled}
                            placeholder={placeholder}
                            {...input} />
                    </InputGroup>
                    :
                    (
                        type === 'password' ?
                            <React.Fragment>
                                <InputComponent
                                    type={inputType}
                                    disabled={disabled}
                                    placeholder={placeholder}
                                    {...input} />
                                {displayShowPassword && <FontAwesomeIcon
                                    onClick={togglePasswordShow}
                                    className="password-toggle-icon"
                                    icon={faEye} />}
                            </React.Fragment>
                            :
                            <InputComponent
                                type={type}
                                disabled={disabled}
                                placeholder={placeholder}
                                {...input} />
                    )
            }

            {touched
                && ((error && <p className="text-danger">{error}</p>)
                    || (warning && <p className="help is-danger text-danger">{warning}</p>))}
        </div>
    );
};

export default ValidatedInput;
