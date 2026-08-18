interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({
  password,
}: PasswordStrengthProps) {
  if (!password) return null;

  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  const score = checks.filter(Boolean).length;

  const labels = [
    "Very weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Excellent",
  ];

  return (
    <div className="password-strength">
      <div className="strength-bars">
        {checks.map((passed, index) => (
          <span
            key={index}
            className={passed ? "active" : ""}
          />
        ))}
      </div>

      <div className="strength-label">
        <span>Password strength</span>
        <strong>{labels[score]}</strong>
      </div>
    </div>
  );
}