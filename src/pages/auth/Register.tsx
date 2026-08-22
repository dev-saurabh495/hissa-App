import {
  ArrowRight,
  Mail,
  Phone,
  UserRound,
  AtSign,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import {
  useForm,
  Controller,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import PasswordStrength from "../../components/auth/PasswordStrength";
import SocialLogin from "../../components/auth/SocialLogin";

import {
  registerSchema,
  type RegisterSchema,
} from "../../lib/validations/auth";

import { useAuthStore } from "../../store/authStore";

export default function Register() {
  const navigate = useNavigate();

  const registerUser = useAuthStore(
    (state) => state.register
  );

  const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  /*
   * Watch password only for PasswordStrength component.
   */
  const password = watch("password");

  const onSubmit = async (data: RegisterSchema) => {
  try {
    console.log("FORM DATA:", data);

    const payload = {
      name: data.name.trim(),
      username: data.username.trim().toLowerCase(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      password: data.password,
      password_confirmation: data.confirmPassword,
    };

    console.log("REQUEST PAYLOAD:", payload);

    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    console.log("STATUS:", response.status);
    console.log("OK:", response.ok);

    const rawResponse = await response.text();

    console.log("RAW RESPONSE:", rawResponse);

    let result;

    try {
      result = JSON.parse(rawResponse);
    } catch {
      throw new Error(
        "Laravel returned an invalid JSON response."
      );
    }

    console.log("PARSED RESPONSE:", result);

    if (response.status === 422) {
      if (result.errors) {
        Object.entries(result.errors).forEach(
          ([field, messages]) => {
            const message = Array.isArray(messages)
              ? messages[0]
              : String(messages);

            toast.error(`${field}: ${message}`);
          }
        );
      } else {
        toast.error(
          result.message ||
            "Validation failed."
        );
      }

      return;
    }

    if (!response.ok) {
      throw new Error(
        result.message ||
          "Registration failed."
      );
    }

    console.log(
      "SUCCESS DATA:",
      result.data
    );

    if (result.data?.user) {
      registerUser(
  result.data.user,
  result.data.token
);
    }

    toast.success(
      result.message ||
        "Account created successfully!"
    );

    navigate("/verify-email");
  } catch (error) {
    console.error(
      "FULL REGISTRATION ERROR:",
      error
    );

    toast.error(
      error instanceof Error
        ? error.message
        : "Something went wrong."
    );
  }
};

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start keeping your shared expenses simple and transparent."
    >
      <form
        className="auth-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* =========================
            NAME + USERNAME
        ========================== */}

        <div className="two-column">
          <AuthInput
            id="name"
            label="Full name"
            type="text"
            placeholder="Saurabh Pandey"
            autoComplete="name"
            icon={<UserRound size={18} />}
            error={errors.name?.message}
            {...register("name")}
          />

          <AuthInput
            id="username"
            label="Username"
            type="text"
            placeholder="saurabh"
            autoComplete="username"
            icon={<AtSign size={18} />}
            error={errors.username?.message}
            {...register("username")}
          />
        </div>

        {/* =========================
            PHONE
        ========================== */}

        <AuthInput
          id="phone"
          label="Phone number"
          type="tel"
          placeholder="9876543210"
          autoComplete="tel"
          icon={<Phone size={18} />}
          error={errors.phone?.message}
          {...register("phone")}
        />

        {/* =========================
            EMAIL
        ========================== */}

        <AuthInput
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          icon={<Mail size={18} />}
          error={errors.email?.message}
          {...register("email")}
        />

        {/* =========================
            PASSWORD
        ========================== */}

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              name="password"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.password?.message}
            />
          )}
        />

        {/* =========================
            PASSWORD STRENGTH
        ========================== */}

        <PasswordStrength
          password={password}
        />

        {/* =========================
            CONFIRM PASSWORD
        ========================== */}

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <PasswordInput
              name="confirmPassword"
              label="Confirm password"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={
                errors.confirmPassword?.message
              }
            />
          )}
        />

        {/* =========================
            TERMS & CONDITIONS
        ========================== */}

        <label className="checkbox-label terms-checkbox">
          <input
            type="checkbox"
            {...register("terms")}
            aria-invalid={Boolean(
              errors.terms
            )}
            aria-describedby={
              errors.terms
                ? "terms-error"
                : undefined
            }
          />

          <span>
            I agree to the{" "}

            <button
              type="button"
              className="inline-link"
            >
              Terms of Service
            </button>

            {" "}and{" "}

            <button
              type="button"
              className="inline-link"
            >
              Privacy Policy
            </button>
          </span>
        </label>

        {errors.terms && (
          <p
            id="terms-error"
            className="field-error"
            role="alert"
          >
            {errors.terms.message}
          </p>
        )}

        {/* =========================
            SUBMIT BUTTON
        ========================== */}

        <button
          type="submit"
          className="primary-button"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span
                className="spinner"
                aria-hidden="true"
              />

              Creating account...
            </>
          ) : (
            <>
              Create account

              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      {/* =========================
          SOCIAL LOGIN
      ========================== */}

      <div className="divider">
        <span>OR</span>
      </div>

      <SocialLogin />

      {/* =========================
          LOGIN LINK
      ========================== */}

      <p className="auth-switch">
        Already have an account?{" "}

        <Link to="/login">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}