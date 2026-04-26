import React from "react";
import '../css/ButtonClass.css'

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger" | "outline";
  buttonText: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};

const CommonButton = ({
  variant = "primary",
  type = "button",
  onClick,
  className = "",
  disabled = false,
  loading = false,
  buttonText,
}: ButtonProps) => {
  const baseClass = "btn";
  const variantClass = `btn-${variant}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClass} ${variantClass} ${className}`}
    >
      {loading ? "Loading..." : buttonText}
    </button>
  );
};

export default CommonButton;