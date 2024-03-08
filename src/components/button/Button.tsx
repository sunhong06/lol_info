import React, { ReactNode } from "react";

interface buttonProps {
  disabled?: boolean;
  className?: string;
  onClick?: any;
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  name?: string;
}

function Button({
  children,
  type,
  disabled,
  className,
  onClick,
  name,
}: buttonProps) {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      name={name}
    >
      {children}
    </button>
  );
}

export default Button;
