"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const NAV_LINKS = ["Features", "How It Works", "Testimonials", "Pricing"];

const FEATURES = [
  {
    icon: "🧠",
    title: "AI Mock Interviews",
    desc: "Simulate real interviews with an adaptive AI interviewer that adjusts to your skill level and role.",
    btn: "Start Mock",
    color: "#6C63FF",
  },
  {
    icon: "📐",
    title: "Aptitude & Reasoning",
    desc: "Master quantitative aptitude, logical reasoning and verbal ability with 2000+ curated questions.",
    btn: "Practice Now",
    color: "#FF6584",
  },
  {
    icon: "💻",
    title: "Technical Interviews",
    desc: "Solve DSA problems, system design challenges, and domain-specific questions with live hints.",
    btn: "Start Technical",
    color: "#43D9AD",
  },
  {
    icon: "🗂️",
    title: "Previous Year Papers",
    desc: "Access company-wise and exam-wise previous year questions with detailed solutions.",
    btn: "Explore Papers",
    color: "#F59E0B",
  },
  {
    icon: "📊",
    title: "Performance Analytics",
    desc: "Track your progress with detailed reports, weak area identification, and improvement trends.",
    btn: "View Analytics",
    color: "#3B82F6",
  },
  {
    icon: "🎯",
    title: "Personalized Roadmap",
    desc: "Get a custom study plan based on your target company, role, and current skill assessment.",
    btn: "Get Roadmap",
    color: "#EC4899",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Create Your Profile",
    desc: "Tell us your target role, company, and experience level. Our AI builds your personalized prep plan.",
    icon: "👤",
  },
  {
    num: "02",
    title: "Practice Daily",
    desc: "Solve aptitude, reasoning, and technical questions. Each session adapts to strengthen your weak spots.",
    icon: "📚",
  },
  {
    num: "03",
    title: "Take Mock Interviews",
    desc: "Face realistic AI-powered interviews. Get instant feedback on answers, body language cues, and pacing.",
    icon: "🎤",
  },
  {
    num: "04",
    title: "Ace the Real One",
    desc: "Walk in confident. Our prep data shows 94% of users report improved performance after 2 weeks.",
    icon: "🏆",
  },
];

const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    role: "Placed at Google SWE",
    avatar: "AM",
    color: "#6C63FF",
    rating: 5,
    text: "PrepNOVA's mock interviews are scarily close to the real thing. The AI feedback after each round helped me fix my communication within days. Got my Google offer after 3 weeks of consistent prep.",
  },
  {
    name: "Sneha Rao",
    role: "TCS NQT Cleared",
    avatar: "SR",
    color: "#43D9AD",
    rating: 5,
    text: "The aptitude section is a goldmine. I used to struggle with number series and data interpretation. After 10 days of practice on PrepNOVA, I cleared TCS NQT in my first attempt.",
  },
  {
    name: "Rohan Kapoor",
    role: "Amazon SDE-2",
    avatar: "RK",
    color: "#FF6584",
    rating: 5,
    text: "The system design mock rounds are exceptional. It asks follow-up questions just like a real interviewer. PrepNOVA is the reason I cleared all 6 Amazon rounds without a single hiccup.",
  },
  {
    name: "Priya Nair",
    role: "Infosys InfyTQ",
    avatar: "PN",
    color: "#F59E0B",
    rating: 4,
    text: "I was terrible at logical reasoning. PrepNOVA broke every concept down with examples, then tested me progressively. Ended up scoring 92 percentile. Absolutely recommend to every fresher.",
  },
  {
    name: "Dev Sharma",
    role: "Microsoft FTE",
    avatar: "DS",
    color: "#3B82F6",
    rating: 5,
    text: "The personalized roadmap feature is brilliant. It knew exactly which topics to prioritize given my timeline. I had only 3 weeks and PrepNOVA made every hour count. Cleared Microsoft in one shot.",
  },
  {
    name: "Ananya Singh",
    role: "Wipro WILP",
    avatar: "AS",
    color: "#EC4899",
    rating: 4,
    text: "Previous year papers with detailed solutions saved me so much time. I didn't need to search 10 different websites. Everything was in one place and the explanations were crystal clear.",
  },
];

const STATS = [
  { value: "50K+", label: "Students Placed" },
  { value: "2000+", label: "Practice Questions" },
  { value: "94%", label: "Success Rate" },
  { value: "200+", label: "Companies Covered" },
];

const PRICING = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    color: "#6C63FF",
    features: ["100 aptitude questions", "3 mock interviews/month", "Basic analytics", "Community access"],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    color: "#43D9AD",
    features: ["Unlimited questions", "Unlimited mock interviews", "AI feedback & analysis", "Company-wise prep", "Personalized roadmap", "Priority support"],
    cta: "Start Pro Trial",
    highlight: true,
  },
  {
    name: "Team",
    price: "₹999",
    period: "/month",
    color: "#FF6584",
    features: ["Everything in Pro", "Up to 5 members", "Team analytics dashboard", "Campus placement drive prep", "Dedicated mentor sessions"],
    cta: "Contact Us",
    highlight: false,
  },
];

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= rating ? "#F59E0B" : "#333", fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target.replace(/\D/g, ""));
        let current = 0;
        const step = Math.ceil(num / 60);
        const timer = setInterval(() => {
          current = Math.min(current + step, num);
          setCount(current);
          if (current >= num) clearInterval(timer);
        }, 25);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const display = target.includes("K") ? `${Math.floor(count / 1000)}K+` :
    target.includes("%") ? `${count}%` : `${count}+`;

  return <span ref={ref}>{display}</span>;
}

export default function PrepNOVA() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredTest, setHoveredTest] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const styles = {
    root: {
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: "#080B14",
      color: "#E8ECF4",
      minHeight: "100vh",
      overflowX: "hidden",
    },
    nav: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 48px",
      background: scrolled ? "rgba(8,11,20,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(108,99,255,0.15)" : "none",
      transition: "all 0.3s ease",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontWeight: 800,
      fontSize: 22,
      letterSpacing: "-0.5px",
      color: "#fff",
    },
    logoBadge: {
      background: "linear-gradient(135deg, #6C63FF, #43D9AD)",
      borderRadius: 8,
      padding: "4px 8px",
      fontSize: 13,
      fontWeight: 700,
      color: "#fff",
    },
    navLinks: {
      display: "flex",
      gap: 32,
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    navLink: {
      fontSize: 14,
      fontWeight: 500,
      color: "#9BA3B8",
      cursor: "pointer",
      transition: "color 0.2s",
      textDecoration: "none",
    },
    navCta: {
      background: "linear-gradient(135deg, #6C63FF, #5A52E0)",
      color: "#fff",
      border: "none",
      borderRadius: 10,
      padding: "10px 22px",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      letterSpacing: "0.2px",
    },

    // HERO
    hero: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "120px 48px 80px",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
    },
    heroBg: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,99,255,0.18) 0%, transparent 70%)",
      pointerEvents: "none",
    },
    heroBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      background: "rgba(108,99,255,0.12)",
      border: "1px solid rgba(108,99,255,0.3)",
      borderRadius: 100,
      padding: "6px 16px",
      fontSize: 13,
      fontWeight: 600,
      color: "#A89FFF",
      marginBottom: 28,
      letterSpacing: "0.3px",
    },
    heroTitle: {
      fontSize: "clamp(38px, 6vw, 72px)",
      fontWeight: 900,
      lineHeight: 1.08,
      letterSpacing: "-2px",
      margin: "0 0 24px",
      maxWidth: 900,
    },
    heroGrad: {
      background: "linear-gradient(135deg, #6C63FF 0%, #43D9AD 50%, #FF6584 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    heroSub: {
      fontSize: 18,
      color: "#7D8BA6",
      maxWidth: 560,
      lineHeight: 1.7,
      marginBottom: 40,
    },
    heroBtns: {
      display: "flex",
      gap: 16,
      justifyContent: "center",
      flexWrap: "wrap",
    },
    btnPrimary: {
      background: "linear-gradient(135deg, #6C63FF, #5A52E0)",
      color: "#fff",
      border: "none",
      borderRadius: 12,
      padding: "14px 32px",
      fontSize: 15,
      fontWeight: 700,
      cursor: "pointer",
      letterSpacing: "0.2px",
      boxShadow: "0 0 30px rgba(108,99,255,0.4)",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    btnOutline: {
      background: "transparent",
      color: "#E8ECF4",
      border: "1.5px solid rgba(255,255,255,0.18)",
      borderRadius: 12,
      padding: "14px 32px",
      fontSize: 15,
      fontWeight: 600,
      cursor: "pointer",
      backdropFilter: "blur(8px)",
    },
    heroCard: {
      marginTop: 72,
      background: "linear-gradient(135deg, #1A1D2E 0%, #0F1220 100%)",
      border: "1px solid rgba(108,99,255,0.2)",
      borderRadius: 24,
      padding: "32px 48px",
      display: "flex",
      gap: 64,
      justifyContent: "center",
      flexWrap: "wrap",
      width: "100%",
      maxWidth: 900,
      boxShadow: "0 0 60px rgba(108,99,255,0.08)",
    },
    statItem: {
      textAlign: "center",
    },
    statValue: {
      fontSize: 38,
      fontWeight: 900,
      background: "linear-gradient(135deg, #6C63FF, #43D9AD)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-1px",
    },
    statLabel: {
      fontSize: 13,
      color: "#5A6478",
      fontWeight: 500,
      marginTop: 4,
    },

    // SECTION
    section: {
      padding: "96px 48px",
      maxWidth: 1200,
      margin: "0 auto",
    },
    sectionTag: {
      display: "inline-block",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "2px",
      color: "#6C63FF",
      textTransform: "uppercase",
      marginBottom: 14,
    },
    sectionTitle: {
      fontSize: "clamp(28px, 4vw, 44px)",
      fontWeight: 900,
      letterSpacing: "-1.5px",
      lineHeight: 1.1,
      margin: "0 0 16px",
    },
    sectionSub: {
      fontSize: 16,
      color: "#5A6478",
      maxWidth: 480,
      lineHeight: 1.7,
    },

    // FEATURES GRID
    featGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: 20,
      marginTop: 56,
    },
    featCard: (color, hovered) => ({
      background: hovered ? "rgba(26,29,46,0.95)" : "rgba(13,16,30,0.7)",
      border: `1px solid ${hovered ? color + "55" : "rgba(255,255,255,0.06)"}`,
      borderRadius: 20,
      padding: "32px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      transform: hovered ? "translateY(-4px)" : "none",
      boxShadow: hovered ? `0 20px 60px ${color}20` : "none",
    }),
    featIcon: (color) => ({
      width: 52,
      height: 52,
      borderRadius: 14,
      background: color + "18",
      border: `1px solid ${color}30`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 24,
      marginBottom: 20,
    }),
    featTitle: {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 10,
      letterSpacing: "-0.3px",
    },
    featDesc: {
      fontSize: 14,
      color: "#5A6478",
      lineHeight: 1.7,
      marginBottom: 24,
    },
    featBtn: (color) => ({
      display: "inline-block",
      background: color + "18",
      color: color,
      border: `1px solid ${color}40`,
      borderRadius: 100,
      padding: "7px 18px",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
    }),

    // HOW IT WORKS
    howSection: {
      padding: "96px 48px",
      background: "rgba(108,99,255,0.03)",
      borderTop: "1px solid rgba(255,255,255,0.04)",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
    },
    howInner: {
      maxWidth: 1200,
      margin: "0 auto",
    },
    stepsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: 24,
      marginTop: 56,
      position: "relative",
    },
    stepCard: {
      background: "rgba(13,16,30,0.8)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 20,
      padding: "32px 28px",
      position: "relative",
    },
    stepNum: {
      fontSize: 56,
      fontWeight: 900,
      color: "rgba(108,99,255,0.12)",
      lineHeight: 1,
      marginBottom: 16,
      letterSpacing: "-3px",
    },
    stepIcon: {
      fontSize: 32,
      marginBottom: 16,
    },
    stepTitle: {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 10,
    },
    stepDesc: {
      fontSize: 14,
      color: "#5A6478",
      lineHeight: 1.7,
    },

    // TESTIMONIALS
    testGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
      gap: 20,
      marginTop: 56,
    },
    testCard: (hovered) => ({
      background: hovered ? "rgba(26,29,46,0.98)" : "rgba(13,16,30,0.7)",
      border: `1px solid ${hovered ? "rgba(108,99,255,0.3)" : "rgba(255,255,255,0.06)"}`,
      borderRadius: 20,
      padding: "28px",
      transition: "all 0.3s ease",
      transform: hovered ? "translateY(-3px)" : "none",
      cursor: "default",
    }),
    testTop: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom: 18,
    },
    avatar: (color) => ({
      width: 44,
      height: 44,
      borderRadius: 12,
      background: `linear-gradient(135deg, ${color}88, ${color}44)`,
      border: `1px solid ${color}60`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: 14,
      color: "#fff",
      flexShrink: 0,
    }),
    testName: {
      fontSize: 15,
      fontWeight: 700,
    },
    testRole: {
      fontSize: 12,
      color: "#5A6478",
      marginTop: 2,
    },
    testText: {
      fontSize: 14,
      color: "#7D8BA6",
      lineHeight: 1.75,
    },

    // PRICING
    pricGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    marginTop: 56,
},
    pricCard: (highlight, color) => ({
      background: highlight
        ? `linear-gradient(160deg, rgba(108,99,255,0.15) 0%, rgba(67,217,173,0.08) 100%)`
        : "rgba(13,16,30,0.7)",
      border: highlight ? "1.5px solid rgba(108,99,255,0.5)" : "1px solid rgba(255,255,255,0.06)",
      borderRadius: 24,
      padding: "36px 28px",
      position: "relative",
      boxShadow: highlight ? "0 0 60px rgba(108,99,255,0.12)" : "none",
    }),
    pricBadge: {
      position: "absolute",
      top: -14,
      left: "50%",
      transform: "translateX(-50%)",
      background: "linear-gradient(135deg, #6C63FF, #43D9AD)",
      color: "#fff",
      borderRadius: 100,
      padding: "4px 16px",
      fontSize: 12,
      fontWeight: 700,
      whiteSpace: "nowrap",
    },
    pricName: {
      fontSize: 14,
      fontWeight: 700,
      color: "#5A6478",
      letterSpacing: "1px",
      textTransform: "uppercase",
      marginBottom: 12,
    },
    pricPrice: {
      fontSize: 44,
      fontWeight: 900,
      letterSpacing: "-2px",
      lineHeight: 1,
    },
    pricPer: {
      fontSize: 15,
      color: "#5A6478",
      fontWeight: 400,
    },
    pricFeatures: {
      listStyle: "none",
      margin: "28px 0",
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },
    pricFeat: {
      fontSize: 14,
      color: "#9BA3B8",
      display: "flex",
      alignItems: "center",
      gap: 10,
    },
    pricCheck: (color) => ({
      width: 20,
      height: 20,
      borderRadius: 6,
      background: color + "20",
      border: `1px solid ${color}40`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      color: color,
      flexShrink: 0,
    }),
    pricBtn: (highlight, color) => ({
      width: "100%",
      background: highlight ? "linear-gradient(135deg, #6C63FF, #43D9AD)" : "rgba(255,255,255,0.06)",
      color: highlight ? "#fff" : "#9BA3B8",
      border: highlight ? "none" : "1px solid rgba(255,255,255,0.1)",
      borderRadius: 12,
      padding: "13px",
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer",
      letterSpacing: "0.3px",
    }),

    // CTA SECTION
    ctaSection: {
      padding: "80px 48px",
      textAlign: "center",
    },
    ctaBox: {
      background: "linear-gradient(135deg, rgba(108,99,255,0.15) 0%, rgba(67,217,173,0.08) 50%, rgba(255,101,132,0.08) 100%)",
      border: "1px solid rgba(108,99,255,0.25)",
      borderRadius: 32,
      padding: "72px 48px",
      maxWidth: 800,
      margin: "0 auto",
      position: "relative",
      overflow: "hidden",
    },
    ctaGlow: {
      position: "absolute",
      width: 400,
      height: 400,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
    },
    footer: {
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "32px 48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 16,
    },
    footerText: {
      fontSize: 13,
      color: "#3A4055",
    },
  };

  return (
    <div style={styles.root}>
      {/* Google Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080B14; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #080B14; }
        ::-webkit-scrollbar-thumb { background: rgba(108,99,255,0.3); border-radius: 3px; }
        .hero-btn-primary:hover { transform: translateY(-2px) !important; box-shadow: 0 0 50px rgba(108,99,255,0.55) !important; }
      `}</style>

      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <span style={styles.logoBadge}>PN</span>
          PrepNOVA
        </div>
        <ul style={styles.navLinks}>
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                style={{ ...styles.navLink, color: activeNav === l ? "#fff" : "#9BA3B8" }}
                onMouseEnter={() => setActiveNav(l)}
                onMouseLeave={() => setActiveNav(null)}
              >{l}</a>
            </li>
          ))}
        </ul>
        <button style={styles.navCta} onClick={() => router.push("/home")}>Get Started Free →</button>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroBg} />
        <div style={styles.heroBadge}>
          <span>⚡</span> AI-Powered Interview Prep Platform
        </div>
        <h1 style={styles.heroTitle}>
          Crack Your Dream Job
          <br />
          <span style={styles.heroGrad}>Before the Interview.</span>
        </h1>
        <p style={styles.heroSub}>
          Master aptitude, reasoning, and technical interviews with adaptive AI mock sessions. Real questions. Real feedback. Real results.
        </p>
        <div style={styles.heroBtns}>
          <button className="hero-btn-primary" style={styles.btnPrimary} onClick={() => router.push("/home")}>
            🚀 Start Practicing Free
          </button>
          <button style={styles.btnOutline}>
            ▶ Watch Demo
          </button>
        </div>
        <div style={styles.heroCard}>
          {STATS.map((s) => (
            <div key={s.label} style={styles.statItem}>
              <div style={styles.statValue}>
                <AnimatedCounter target={s.value} />
              </div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ ...styles.section, paddingTop: 48 }}>
        <span style={styles.sectionTag}>What We Offer</span>
        <h2 style={styles.sectionTitle}>Everything You Need<br />to <span style={styles.heroGrad}>Prepare & Succeed</span></h2>
        <p style={styles.sectionSub}>One platform for all your interview preparation needs — from aptitude to AI mock rounds.</p>
        <div style={styles.featGrid}>
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              style={styles.featCard(f.color, hoveredCard === i)}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.featIcon(f.color)}>{f.icon}</div>
              <div style={styles.featTitle}>{f.title}</div>
              <div style={styles.featDesc}>{f.desc}</div>
              <span style={styles.featBtn(f.color)}>{f.btn} →</span>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={styles.howSection}>
        <div style={styles.howInner}>
          <span style={styles.sectionTag}>Process</span>
          <h2 style={styles.sectionTitle}>
            How PrepNOVA <span style={styles.heroGrad}>Works</span>
          </h2>
          <p style={styles.sectionSub}>From signup to job offer — a clear, guided journey to interview success.</p>
          <div style={styles.stepsGrid}>
            {STEPS.map((s, i) => (
              <div key={s.num} style={styles.stepCard}>
                <div style={styles.stepNum}>{s.num}</div>
                <div style={styles.stepIcon}>{s.icon}</div>
                <div style={styles.stepTitle}>{s.title}</div>
                <div style={styles.stepDesc}>{s.desc}</div>
                {i < STEPS.length - 1 && (
                  <div style={{
                    position: "absolute",
                    right: -12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(108,99,255,0.3)",
                    fontSize: 20,
                    zIndex: 2,
                    display: "none",
                  }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={styles.section}>
        <span style={styles.sectionTag}>Success Stories</span>
        <h2 style={styles.sectionTitle}>Students Who <span style={styles.heroGrad}>Made It</span></h2>
        <p style={styles.sectionSub}>Real reviews from students who cracked their interviews using PrepNOVA.</p>
        <div style={styles.testGrid}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              style={styles.testCard(hoveredTest === i)}
              onMouseEnter={() => setHoveredTest(i)}
              onMouseLeave={() => setHoveredTest(null)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={styles.testTop}>
                  <div style={styles.avatar(t.color)}>{t.avatar}</div>
                  <div>
                    <div style={styles.testName}>{t.name}</div>
                    <div style={styles.testRole}>{t.role}</div>
                  </div>
                </div>
                <StarRating rating={t.rating} />
              </div>
              <p style={styles.testText}>"{t.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ ...styles.howSection }}>
        <div style={styles.howInner}>
          <span style={styles.sectionTag}>Pricing</span>
          <h2 style={styles.sectionTitle}>Simple, <span style={styles.heroGrad}>Transparent</span> Pricing</h2>
          <p style={styles.sectionSub}>No hidden charges. Start free, upgrade when you're ready.</p>
          <div style={styles.pricGrid}>
            {PRICING.map((p) => (
              <div key={p.name} style={styles.pricCard(p.highlight, p.color)}>
                {p.highlight && <div style={styles.pricBadge}>Most Popular</div>}
                <div style={styles.pricName}>{p.name}</div>
                <div style={styles.pricPrice}>
                  {p.price}
                  <span style={styles.pricPer}>{p.period}</span>
                </div>
                <ul style={styles.pricFeatures}>
                  {p.features.map((f) => (
                    <li key={f} style={styles.pricFeat}>
                      <span style={styles.pricCheck(p.color)}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button style={styles.pricBtn(p.highlight, p.color)}>{p.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaBox}>
          <div style={styles.ctaGlow} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
            <h2 style={{ ...styles.sectionTitle, marginBottom: 16, textAlign: "center" }}>
              Ready to <span style={styles.heroGrad}>Crack It?</span>
            </h2>
            <p style={{ ...styles.sectionSub, textAlign: "center", margin: "0 auto 36px" }}>
              Join 50,000+ students who trusted PrepNOVA to get them interview-ready. Your dream job is one prep session away.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button style={{ ...styles.btnPrimary, fontSize: 16, padding: "16px 40px" }} onClick={() => router.push("/home")}>
                Start Free Today →
              </button>
              <button style={{ ...styles.btnOutline, fontSize: 16, padding: "16px 40px" }}>
                Talk to Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={{ ...styles.logo, fontSize: 18 }}>
          <span style={{ ...styles.logoBadge, fontSize: 11 }}>PN</span>
          PrepNOVA
        </div>
        <div style={styles.footerText}>
          © 2025 PrepNOVA. Built to help you succeed.
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Contact"].map((l) => (
            <span key={l} style={{ ...styles.footerText, cursor: "pointer", color: "#4A5268" }}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}