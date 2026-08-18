import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  label?: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onBlur?: () => void;
  name?: string;
  error?: string;
  placeholder?: string;
}

export default function PasswordInput({
  label = "Password",
  value,
  onChange,
  onBlur,
  name,
  error,
  placeholder = "Enter your password",
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <div className={`input-wrapper ${error ? "input-error" : ""}`}>
        <span className="input-icon">
          <LockKeyhole size={18} />
        </span>

        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />

        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword((value) => !value)}
          aria-label={
            showPassword ? "Hide password" : "Show password"
          }
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>

      {error && <p className="field-error">{error}</p>}
    </div>
  );
}