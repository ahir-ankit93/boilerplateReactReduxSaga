import React from "react";
import Select from "react-select";

const ValidatedSelect = (field) => {
    const {
        input,
        name,
        options,
        disabled,
        placeholder,
        isSearchable = false,
        isClearable = false,
        meta: { touched, error, warning },
    } = field;

    const customStyles = {
        placeholder: (defaultStyles) => {
            return {
                ...defaultStyles,
                fontSize: '14px',
                color: '#b1b8c4',
            }
        }
    }

    const selected = options.find(option => option.value === input.value);

    return (
        <div>
            <Select
                name={name}
                styles={customStyles}
                value={input.value ? selected : null}
                isClearable={isClearable}
                isSearchable={isSearchable}
                isDisabled={disabled}
                options={options}
                placeholder={placeholder}
                onChange={(value) => input.onChange(value ? value.value : null)}
                onBlur={(value) => input.onBlur(value ? value.value : null)}
            />
            {touched
                && ((error && <p className="help is-danger text-danger">{error}</p>)
                    || (warning && <p className="help is-danger text-danger">{warning}</p>))}
        </div>
    );
};

export default ValidatedSelect;
