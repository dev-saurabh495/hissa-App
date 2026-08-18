import type { InputHTMLAttributes } from "react";

interface AuthInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function AuthInput({
  label,
  error,
  icon,
  id,
  ...props
}: AuthInputProps) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>

      <div className={`input-wrapper ${error ? "input-error" : ""}`}>
        {icon && <span className="input-icon">{icon}</span>}

        <input id={id} {...props} />
      </div>

      {error && <p className="field-error">{error}</p>}
    </div>
  );
}