import React,{Fragment} from 'react';
function FormField({ name, type, placeholder, value, onChange, label, className }) {
    return (
        <>
            <input 
                id={name} 
                className={className} 
                value={value} 
                onChange={onChange} 
                name={name} 
                type={type} 
                placeholder={placeholder} 
            />
            {label ? <label htmlFor={name}>{label}</label> : null}
        </>
    );
}

export default function Form({ formFields, onSubmit, error, errorMessages }) {
    return (
        <form onSubmit={onSubmit}>
            {formFields.map((field, index) => (
                <Fragment key={index}>
                    <FormField 
                        value={field.value} 
                        onChange={field.onChange} 
                        name={field.name} 
                        type={field.type} 
                        label={field?.label} 
                        placeholder={field?.placeholder} 
                        className={field.className} 
                    />
                    {error[field.name] && (
                        <p>{errorMessages[field.name]?.message}</p>
                    )}
                </Fragment>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
}
