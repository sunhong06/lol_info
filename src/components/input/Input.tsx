import React from "react";

interface inputProps {
  disabled?: boolean;
  id?: string;
  label?: string;
  type: string;
  placeholder: string;
  value: string;
  name: string;
  onChange?: (e: any) => void;
  required: boolean;
}

function Input({
  id,
  label,
  type,
  placeholder,
  value,
  name,
  onChange,
  required,
}: inputProps) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
      />
    </>
  );
}

export default Input;
