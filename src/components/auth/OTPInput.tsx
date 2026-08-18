import { useEffect, useRef } from "react";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

export default function OTPInput({
  value,
  onChange,
  length = 6,
}: OTPInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (
    index: number,
    inputValue: string
  ) => {
    const digit = inputValue.replace(/\D/g, "").slice(-1);

    const chars = value.split("");

    chars[index] = digit;

    const nextValue = chars.join("").slice(0, length);

    onChange(nextValue);

    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key === "Backspace" &&
      !value[index] &&
      index > 0
    ) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    onChange(pasted);

    const focusIndex = Math.min(
      pasted.length,
      length - 1
    );

    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div className="otp-container">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(element) => {
            inputsRef.current[index] = element;
          }}
          value={value[index] ?? ""}
          inputMode="numeric"
          maxLength={1}
          autoComplete="one-time-code"
          onChange={(event) =>
            handleChange(index, event.target.value)
          }
          onKeyDown={(event) =>
            handleKeyDown(index, event)
          }
          onPaste={handlePaste}
          className="otp-input"
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
}