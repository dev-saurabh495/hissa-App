import { ArrowRight, CheckCircle2, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

const features = [
  "Split expenses without awkward calculations",
  "Keep everyone's contribution transparent",
  "Settle up with confidence",
];

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <main className="auth-shell">
      <section className="auth-brand-panel">
        <div className="brand-decoration brand-decoration-one" />
        <div className="brand-decoration brand-decoration-two" />

        <div className="brand-content">
          <Link to="/login" className="brand-logo">
            <span className="brand-logo-icon">
              <WalletCards size={24} />
            </span>

            <span>HISSA</span>
          </Link>

          <div className="brand-copy">
            <div className="eyebrow">
              <span />
              Smart expense management
            </div>

            <h1>
              Kharcha baanto,
              <br />
              <span>hisaab rakho.</span>
            </h1>

            <p>
              Share expenses, track contributions and settle up
              effortlessly with your friends, family and teams.
            </p>
          </div>

          <div className="brand-features">
            {features.map((feature) => (
              <div className="brand-feature" key={feature}>
                <CheckCircle2 size={19} />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="brand-bottom-card">
            <div className="mini-avatars">
              <span>AS</span>
              <span>RK</span>
              <span>SP</span>
              <span>+5</span>
            </div>

            <div>
              <strong>Built for real-life sharing</strong>
              <p>Trips · Flatmates · Friends · Teams</p>
            </div>

            <ArrowRight size={18} />
          </div>
        </div>
      </section>

      <section className="auth-form-panel">
        <div className="mobile-logo">
          <Link to="/login" className="brand-logo">
            <span className="brand-logo-icon">
              <WalletCards size={21} />
            </span>

            <span>HISSA</span>
          </Link>
        </div>

        <div className="auth-container">
          <div className="auth-heading">
            <h2>{title}</h2>

            {subtitle && <p>{subtitle}</p>}
          </div>

          {children}
        </div>

        <div className="auth-footer">
          <span>© {new Date().getFullYear()} HISSA</span>
          <span>·</span>
          <span>Kharcha baanto, hisaab rakho.</span>
        </div>
      </section>
    </main>
  );
}