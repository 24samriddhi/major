import Link from "next/link";
import {
  Show,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1758691031787-90867cb6fb2c?auto=format&fit=crop&w=1200&q=80";
const PROFILE_IMG =
  "https://images.unsplash.com/photo-1758686253896-e6c76b6f7aa1?auto=format&fit=crop&w=900&q=80";
const DOCTOR_MALE_IMG =
  "https://images.unsplash.com/photo-1758691463384-771db2f192b3?auto=format&fit=crop&w=900&q=80";
const DOCTOR_FEMALE_IMG =
  "https://images.unsplash.com/photo-1758691462651-611d730c5272?auto=format&fit=crop&w=900&q=80";
const CONSULT_IMG =
  "https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&w=900&q=80";

export default function Home() {
  return (
    <div className="auth-wrap">
      <div style={{ maxWidth: 1160, width: "100%" }}>
        <div
          className="card"
          style={{
            padding: 34,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* TEXTURE BLOBS */}
          <div className="bg-blob bg-blob-1" />
          <div className="bg-blob bg-blob-2" />
          <div className="bg-blob bg-blob-3" />

          <div style={{ position: "relative", zIndex: 1 }}>

            {/* HEADER */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div className="brand">
                <span className="brand-mark">
                  <HeartPulse size={18} />
                </span>
                DocIT
              </div>

              {/* LOGGED OUT */}
              <Show when="signed-out">
                <div style={{ display: "flex", gap: 10 }}>
                  <SignInButton mode="modal">
                    <button className="btn btn-secondary">
                      Sign in
                    </button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <button className="btn btn-primary">
                      Create account
                    </button>
                  </SignUpButton>
                </div>
              </Show>

              {/* LOGGED IN */}
              <Show when="signed-in">
                <Link className="btn btn-primary" href="/dashboard">
                  Open dashboard
                  <ArrowRight size={16} />
                </Link>
              </Show>
            </div>

            {/* HERO */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: 40,
                alignItems: "center",
                padding: "60px 0 55px",
              }}
              className="hero-grid"
            >
              {/* LEFT: COPY */}
              <div>
                <div className="eyebrow">
                  <Sparkles size={13} />
                  &nbsp;AI-powered parent care system · Front-end prototype
                </div>

                <h1
                  className="h1"
                  style={{
                    fontSize: "clamp(38px, 5.4vw, 62px)",
                    marginTop: 16,
                  }}
                >
                  Care, connected.<br />
                  <span className="grad-text">Simple enough for everyone.</span>
                </h1>

                <p className="sub" style={{ fontSize: 17 }}>
                  A calm digital space for families to maintain a care
                  profile, keep health vitals together, store medical
                  record names and book healthcare support — all in one
                  warm, easy place.
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginTop: 25,
                  }}
                >
                  <Show when="signed-out">
                    <SignUpButton mode="modal">
                      <button className="btn btn-primary">
                        Start demo
                        <ArrowRight size={17} />
                      </button>
                    </SignUpButton>
                  </Show>

                  <Show when="signed-in">
                    <Link className="btn btn-primary" href="/dashboard">
                      Go to my care space
                      <ArrowRight size={17} />
                    </Link>
                  </Show>

                  <button className="btn btn-gold">
                    <Star size={16} />
                    See how it works
                  </button>
                </div>

                {/* TRUST ROW */}
                <div className="trust-row">
                  <span className="trust-item">
                    <ShieldCheck size={15} color="var(--primary)" />
                    Clerk-secured sign-in
                  </span>
                  <span className="trust-item">
                    <Clock size={15} color="var(--primary)" />
                    24×7 care access
                  </span>
                  <span className="trust-item">
                    <BadgeCheck size={15} color="var(--primary)" />
                    Built for families
                  </span>
                </div>

                {/* AVATAR STRIP */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginTop: 26,
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <span className="avatar-circle" style={{ marginRight: -14 }}>
                      <img src={DOCTOR_FEMALE_IMG} alt="Care professional" />
                    </span>
                    <span className="avatar-circle" style={{ marginRight: -14 }}>
                      <img src={DOCTOR_MALE_IMG} alt="Care professional" />
                    </span>
                    <span className="avatar-circle">
                      <img src={PROFILE_IMG} alt="Family member" />
                    </span>
                  </div>
                  <div className="muted" style={{ fontSize: 12.5 }}>
                    Designed alongside caregivers &amp; families<br />
                    who look after loved ones every day.
                  </div>
                </div>
              </div>

              {/* RIGHT: HERO PHOTO */}
              <div
                className="photo-card"
                style={{ height: 430, position: "relative" }}
              >
                <img src={HERO_IMG} alt="Happy family being cared for" />

                <span
                  className="float-chip"
                  style={{ top: 18, left: 18 }}
                >
                  <span className="dot" />
                  Care system online
                </span>

                <span
                  className="float-chip"
                  style={{ bottom: 18, left: 18 }}
                >
                  <HeartPulse size={14} color="var(--primary)" />
                  Vitals synced today
                </span>

                <span
                  className="float-chip"
                  style={{ bottom: 18, right: 18 }}
                >
                  <ShieldCheck size={14} color="var(--primary)" />
                  Protected profile
                </span>
              </div>
            </div>

            {/* FEATURES — IMAGE CARDS */}
            <div className="grid grid-3" style={{ marginTop: 6 }}>

              <div className="media-card">
                <div className="media-card-photo">
                  <img src={PROFILE_IMG} alt="Family profile" />
                </div>
                <div className="media-card-icon">
                  <UsersRound size={19} />
                </div>
                <div className="media-card-body">
                  <div className="card-title">Profile</div>
                  <div className="muted" style={{ marginTop: 6 }}>
                    Name, age, contact, address and caregiver details —
                    kept together and easy to update.
                  </div>
                </div>
              </div>

              <div className="media-card">
                <div className="media-card-photo">
                  <img src={CONSULT_IMG} alt="Vitals and health check" />
                </div>
                <div className="media-card-icon">
                  <HeartPulse size={19} />
                </div>
                <div className="media-card-body">
                  <div className="card-title">Vitals Vault</div>
                  <div className="muted" style={{ marginTop: 6 }}>
                    Blood pressure, heart rate, SpO₂, temperature,
                    sugar and weight, all in one place.
                  </div>
                </div>
              </div>

              <div className="media-card">
                <div className="media-card-photo">
                  <img src={DOCTOR_MALE_IMG} alt="Verified healthcare professional" />
                </div>
                <div className="media-card-icon">
                  <ShieldCheck size={19} />
                </div>
                <div className="media-card-body">
                  <div className="card-title">Secure sign-in</div>
                  <div className="muted" style={{ marginTop: 6 }}>
                    Clerk authentication for the demo; backend
                    storage and verified providers come next.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
