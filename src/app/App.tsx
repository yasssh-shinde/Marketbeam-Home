import { useState, useEffect, useRef, useCallback } from "react";
import {
  Shield, BarChart3, Users, Eye, Target, ChevronDown,
  Check, ArrowRight, Play, Globe, Zap, Lock, FileText,
  TrendingUp, Award, Building2, Briefcase, HeartPulse,
  FlaskConical, Landmark, ShieldCheck, Database,
  CheckCircle2, Calendar, Layers, BookOpen, Video,
  FileBarChart, Newspaper, X, Menu, Phone, ClipboardList,
  Activity, Cpu, Sparkles, GitBranch, Archive, Bell,
  Twitter, Linkedin, Youtube, Star, Search, AlertTriangle,
  MessageSquare, PieChart, LayoutDashboard, Workflow,
  RefreshCcw, Settings, ChevronRight, Filter, MoreHorizontal
} from "lucide-react";

/* ─────────────────────────────────────────────
   Utilities
───────────────────────────────────────────── */
const cn = (...c: (string | boolean | undefined | null)[]) =>
  c.filter(Boolean).join(" ");

const TEAL = "#09A99E";
const TEAL_DARK = "#077a72";
const NAVY = "#0F172A";
const NAVY2 = "#1E293B";

/* ─────────────────────────────────────────────
   useCountUp hook
───────────────────────────────────────────── */
function useCountUp(end: number, duration = 2000, decimals = 0) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(parseFloat((eased * end).toFixed(decimals)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration, decimals]);

  return { count, ref };
}

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navItems = [
    { label: "Platform", href: "#platform" },
    { label: "Industries", href: "#industries" },
    { label: "Compliance", href: "#compliance" },
    { label: "Integrations", href: "#integrations" },
    { label: "Resources", href: "#resources" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled
        ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_24px_rgba(0,0,0,0.06)] border-b border-black/[0.06]"
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 h-[56px] sm:h-[68px] flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
          <img src="https://marketbeam.io/wp-content/uploads/2024/10/Untitled-design-15-2.png" alt="MarketBeam" className="h-8 object-contain" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => (
            <a key={item.label} href={item.href}
              className="relative px-3.5 py-2 text-[13.5px] font-semibold text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-50 group">
              {item.label}
              <span className="absolute bottom-1.5 left-3.5 right-3.5 h-px bg-[#09A99E] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
        </nav>

        {/* CTA cluster */}
        <div className="hidden lg:flex items-center gap-2.5">
          <a href="#" className="text-[13.5px] font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
            Sign In
          </a>
          <a href="#demo"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-white px-5 py-2.5 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-px"
            style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_DARK} 100%)` }}>
            Schedule Demo <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <button className="lg:hidden p-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 px-5 pb-5">
          {navItems.map(item => (
            <a key={item.label} href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-semibold text-slate-700 border-b border-slate-50 last:border-0">
              {item.label}
            </a>
          ))}
          <a href="#demo" className="mt-4 block text-center text-sm font-bold text-white py-3 rounded-xl"
            style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
            Schedule Demo
          </a>
        </div>
      )}
    </header>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function HeroDashboard() {
  const channels = ["LinkedIn", "Twitter", "Facebook", "Instagram"];
  const queue = [
    { channel: "LinkedIn", text: "Q3 Drug Launch: Expanding our oncology portfolio...", badge: "MLR Approved", badgeColor: "#09A99E", dot: "#09A99E" },
    { channel: "Twitter", text: "Join us at BIO International2026 — booth #1204...", badge: "Legal Review", badgeColor: "#3B82F6", dot: "#3B82F6" },
    { channel: "Facebook", text: "Patient support program: 3 million patients served...", badge: "Pending MLR", badgeColor: "#F59E0B", dot: "#F59E0B" },
    { channel: "LinkedIn", text: "MarketBeam named G2 Leader for compliance...", badge: "Scheduled", badgeColor: "#8B5CF6", dot: "#8B5CF6" },
  ];
  return (
    <div className="relative rounded-[20px] shadow-[0_32px_80px_rgba(0,0,0,0.28)] overflow-hidden border border-white/10"
      style={{ background: "linear-gradient(160deg, #0F172A 0%, #152030 100%)" }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 pt-3.5 pb-3 border-b border-white/[0.07]">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        <div className="flex-1 mx-3 h-[22px] rounded-md flex items-center px-2.5 gap-1.5"
          style={{ background: "rgba(255,255,255,0.06)" }}>
          <Lock className="w-2.5 h-2.5 text-emerald-400/70" />
          <span className="text-[10px] text-white/30 font-mono">app.marketbeam.ai/publish</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/10 cursor-pointer">
            <RefreshCcw className="w-2.5 h-2.5 text-white/30" />
          </div>
        </div>
      </div>

      {/* App layout */}
      <div className="flex" style={{ minHeight: 360 }}>
        {/* Sidebar */}
        <div className="w-12 border-r border-white/[0.06] flex flex-col items-center py-4 gap-3">
          {[LayoutDashboard, Calendar, Users, BarChart3, Eye, Settings].map((Icon, i) => (
            <div key={i} className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors",
              i === 0 ? "bg-[#09A99E]/20" : "hover:bg-white/5"
            )}>
              <Icon className={cn("w-4 h-4", i === 0 ? "text-[#09A99E]" : "text-white/25")} />
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 p-4 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-white text-sm font-bold leading-none mb-1">Content Publishing</div>
              <div className="text-white/35 text-[10px]">Pharma Division · Q3 Campaign</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1.5 rounded-full border border-[#09A99E]/30"
                style={{ color: TEAL, background: "rgba(9,169,158,0.12)" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#09A99E] animate-pulse" />
                Compliance Active
              </div>
            </div>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label: "Published", value: "1,247", color: TEAL },
              { label: "In Review", value: "38", color: "#3B82F6" },
              { label: "Compliance", value: "99.4%", color: "#10B981" },
              { label: "Reach", value: "2.8M", color: "#8B5CF6" },
            ].map(k => (
              <div key={k.label} className="rounded-xl p-2.5 border border-white/[0.07]"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="text-[9px] text-white/35 mb-0.5 uppercase tracking-wider">{k.label}</div>
                <div className="text-sm font-extrabold leading-none" style={{ color: k.color }}>{k.value}</div>
              </div>
            ))}
          </div>

          {/* Approval queue */}
          <div className="rounded-xl border border-white/[0.07] overflow-hidden mb-3"
            style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-3 h-3 text-white/40" />
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Approval Queue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Filter className="w-2.5 h-2.5 text-white/30" />
                <span className="text-[9px] text-white/30">4 items</span>
              </div>
            </div>
            {queue.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.03] transition-colors">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.dot }} />
                <div className="w-14 text-[9px] font-bold text-white/30 flex-shrink-0">{item.channel}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-white/55 truncate">{item.text}</div>
                </div>
                <div className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap"
                  style={{ color: item.badgeColor, background: `${item.badgeColor}20` }}>
                  {item.badge}
                </div>
              </div>
            ))}
          </div>

          {/* Sparkline */}
          <div className="flex items-center gap-1.5">
            <div className="text-[9px] text-white/25 font-mono w-8">Posts</div>
            <div className="flex-1 flex items-end gap-[2px] h-8">
              {[22, 38, 28, 55, 42, 68, 51, 78, 62, 84, 71, 90, 78, 95].map((h, i) => (
                <div key={i} className="flex-1 rounded-[2px] transition-all"
                  style={{
                    height: `${h}%`,
                    background: i >= 10
                      ? `linear-gradient(180deg, ${TEAL}, ${TEAL_DARK})`
                      : "rgba(255,255,255,0.1)"
                  }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI badge overlay */}
      <div className="absolute top-14 -right-3 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl px-3 py-2 shadow-xl hidden xl:flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-white" />
        <div>
          <div className="text-[10px] font-bold text-white leading-none">AI Writing</div>
          <div className="text-[9px] text-white/60">Generating...</div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 sm:pt-20 pb-16 sm:pb-24 overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 -z-20"
        style={{ background: "linear-gradient(160deg, #F0FDFC 0%, #F8FAFC 45%, #EFF6FF 100%)" }} />
      {/* Grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#09A99E 1px, transparent 1px), linear-gradient(90deg, #09A99E 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }} />
      {/* Glow blobs */}
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full -z-10"
        style={{ background: "radial-gradient(circle, rgba(9,169,158,0.18) 0%, transparent 65%)" }} />
      <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full -z-10"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-8 sm:gap-12 xl:gap-20 items-center">

          {/* ── Left copy ── */}
          <div className="max-w-xl">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-7 border"
              style={{ color: TEAL, borderColor: `${TEAL}35`, background: `${TEAL}0f` }}>
              <Sparkles className="w-3 h-3" />
              AI-Powered Compliance Platform · Enterprise Grade
            </div>

            <h1 className="text-[1.5rem] sm:text-[2rem] lg:text-[2.75rem] xl:text-[3.35rem] font-extrabold leading-[1.15] sm:leading-[1.08] tracking-tight text-slate-900 mb-4 sm:mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.03em" }}>
              The Enterprise Social Media Platform for{" "}
              <span className="relative inline-block">
                <span style={{ color: TEAL }}>Regulated Industries</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                  <path d="M0 5 Q50 0 100 4 Q150 8 200 3" stroke={TEAL} strokeWidth="2.5" fill="none" opacity="0.5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="text-[0.9rem] sm:text-[1rem] lg:text-[1.075rem] text-slate-500 leading-[1.6] sm:leading-[1.75] mb-6 sm:mb-9 px-2 sm:px-0">
              Publish, amplify, monitor, analyze, and manage compliant social media at scale with one AI-powered platform built for life sciences, financial services, and enterprise teams.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a href="#demo"
                className="group inline-flex items-center justify-center gap-2 text-[13px] sm:text-[14px] lg:text-[15px] font-bold text-white px-5 sm:px-6 lg:px-7 py-[12px] sm:py-[13px] lg:py-[14px] rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
                style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_DARK} 100%)` }}>
                Schedule Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="#tour"
                className="group inline-flex items-center justify-center gap-2.5 text-[15px] font-bold text-slate-700 px-7 py-[14px] rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200">
                <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${TEAL}18` }}>
                  <Play className="w-3 h-3 fill-current" style={{ color: TEAL }} />
                </span>
                Watch Product Tour
              </a>
            </div>

            {/* Compliance chips */}
            <div className="flex flex-wrap gap-2.5">
              {[
                { icon: ShieldCheck, label: "HIPAA" },
                { icon: Lock, label: "SOC 2 Type II" },
                { icon: FileText, label: "FINRA Ready" },
                { icon: Shield, label: "FDA Supported" },
                { icon: Globe, label: "GDPR Compliant" },
              ].map(({ icon: Icon, label }) => (
                <div key={label}
                  className="flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-500 px-3 py-1.5 rounded-lg bg-white border border-slate-100 shadow-sm">
                  <Icon className="w-3 h-3 flex-shrink-0" style={{ color: TEAL }} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right illustration ── */}
          <div className="relative lg:ml-4">
            <HeroDashboard />

            {/* Floating cards */}
            <div className="absolute -left-10 top-1/3 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-slate-100 p-3.5 hidden xl:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${TEAL}18` }}>
                <ShieldCheck className="w-5 h-5" style={{ color: TEAL }} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800 leading-tight">MLR Approved</div>
                <div className="text-[10px] text-slate-400">Post cleared for publishing</div>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
            </div>

            <div className="absolute -right-8 top-12 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-slate-100 p-3.5 hidden xl:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-violet-50">
                <TrendingUp className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">+400× Reach</div>
                <div className="text-[10px] text-slate-400">via Employee Advocacy</div>
              </div>
            </div>

            <div className="absolute -right-6 bottom-16 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-slate-100 p-3.5 hidden xl:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-amber-50">
                <Bell className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">Adverse Event</div>
                <div className="text-[10px] text-slate-400">AI flagged — reviewing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TRUSTED BY
───────────────────────────────────────────── */
function TrustedBySection() {
  const logos = [
    { name: "Pfizer", url: "https://marketbeam.io/wp-content/uploads/2026/06/Group.png", link: "https://pfizer.com" },
    { name: "AstraZeneca", url: "https://marketbeam.io/wp-content/uploads/2026/06/image-208.png", link: "https://astrazeneca.com" },
    { name: "Johnson & Johnson", url: "https://marketbeam.io/wp-content/uploads/2026/06/Mask-group.png", link: "https://jnj.com" },
    { name: "Merck", url: "https://marketbeam.io/wp-content/uploads/2026/06/image-215.jpg", link: "https://merck.com" },
    { name: "Novartis", url: "https://marketbeam.io/wp-content/uploads/2026/06/image-216.jpg", link: "https://novartis.com" },
    { name: "Eli Lilly", url: "https://marketbeam.io/wp-content/uploads/2026/06/image-217.jpg", link: "https://lilly.com" },
    { name: "Goldman Sachs", url: "https://marketbeam.io/wp-content/uploads/2026/06/image-218.jpg", link: "https://goldmansachs.com" },
    { name: "JPMorgan Chase", url: "https://marketbeam.io/wp-content/uploads/2026/06/image-219.jpg", link: "https://jpmorganchase.com" },
    { name: "BlackRock", url: "https://marketbeam.io/wp-content/uploads/2026/06/image-220.jpg", link: "https://blackrock.com" },
    { name: "Deloitte", url: "https://marketbeam.io/wp-content/uploads/2026/06/image-221.jpg", link: "https://deloitte.com" },
  ];


  return (
    <section className="py-10 sm:py-12 lg:py-14 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-9">
          Trusted by leading enterprises in regulated industries
        </p>

        {/* Logo marquee */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-10 items-center">
          {logos.map(logo => (
            <a key={logo.name} href={logo.link} target="_blank" rel="noopener noreferrer"
              className="transition-all duration-300 hover:opacity-75 hover:scale-105">
              <img src={logo.url} alt={logo.name}
                className="h-12 object-contain" title={logo.name} />
            </a>
          ))}
        </div>

        <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-9">
          Awards & Certifications
        </p>

        {/* Awards & Certifications Image */}
        <div className="flex justify-center">
          <img src="https://marketbeam.io/wp-content/uploads/2026/05/Awards-new-2026.jpeg" alt="Awards & Certifications" className="max-w-full h-auto rounded-lg" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PLATFORM OVERVIEW
───────────────────────────────────────────── */
const SOLUTIONS = [
  {
    icon: Calendar, color: TEAL, lightBg: "#f0fdfc",
    label: "Social Publishing",
    tagline: "Publish compliantly across every channel",
    desc: "AI-assisted content creation with multi-step MLR approval workflows and automated multi-channel scheduling.",
    features: ["Content Calendar", "AI Content Generation", "Approval Workflows", "Multi-Channel Publishing", "Asset Management", "Automated Scheduling", "Campaign Management", "Role Permissions"],
    stat: { value: "60%", label: "faster review cycles" },
  },
  {
    icon: Users, color: "#3B82F6", lightBg: "#eff6ff",
    label: "Employee Advocacy",
    tagline: "Transform employees into brand amplifiers",
    desc: "One-click compliant sharing with gamification, leaderboards, and enterprise reach analytics.",
    features: ["One-Click Sharing", "Executive Advocacy", "Employee Leaderboards", "Gamification", "Reach Amplification", "Employee Analytics", "Approved Content Library", "Compliance Controls"],
    stat: { value: "400×", label: "greater organic reach" },
  },
  {
    icon: BarChart3, color: "#8B5CF6", lightBg: "#f5f3ff",
    label: "Social Analytics",
    tagline: "Executive-grade ROI intelligence",
    desc: "Connect social activity to revenue with attribution tracking, competitor benchmarking, and custom C-suite dashboards.",
    features: ["Executive Dashboards", "ROI Reporting", "Reach Analytics", "Campaign Analytics", "Attribution Tracking", "Competitor Benchmarking", "Custom Reports", "Performance Monitoring"],
    stat: { value: "2.5×", label: "higher social ROI" },
  },
  {
    icon: Eye, color: "#F59E0B", lightBg: "#fffbeb",
    label: "Social Monitoring",
    tagline: "AI-powered brand and risk intelligence",
    desc: "Real-time monitoring with adverse event detection, crisis alerts, and AI categorization — never miss a compliance risk.",
    features: ["Brand Monitoring", "Sentiment Analysis", "Competitor Tracking", "Crisis Monitoring", "Adverse Event Detection", "AI Categorization", "Response Workflows", "Compliance Alerts"],
    stat: { value: "90%", label: "lower compliance risk" },
  },
  {
    icon: Target, color: "#EF4444", lightBg: "#fff1f2",
    label: "Prospect Intelligence",
    tagline: "Turn social signals into pipeline",
    desc: "Detect buying intent, enrich leads from social data, and feed CRM with sales-ready account intelligence.",
    features: ["Buying Intent Detection", "Prospect Discovery", "Lead Enrichment", "CRM Intelligence", "Sales Alerts", "Social Engagement Insights", "Pipeline Attribution", "Account Intelligence"],
    stat: { value: "3×", label: "more efficient teams" },
  },
];

function SolutionMiniUI({ sol }: { sol: typeof SOLUTIONS[0] }) {
  const bars = [55, 72, 48, 88, 64, 78, 91, 83];
  return (
    <div className="rounded-xl overflow-hidden border border-white/70 shadow-sm"
      style={{ background: "white" }}>
      {/* Title bar */}
      <div className="px-3.5 py-2.5 border-b flex items-center justify-between"
        style={{ borderColor: `${sol.color}20`, background: `${sol.color}08` }}>
        <div className="flex items-center gap-2">
          <sol.icon className="w-3.5 h-3.5" style={{ color: sol.color }} />
          <span className="text-[10px] font-bold text-slate-700">{sol.label}</span>
        </div>
        <div className="w-12 h-1.5 rounded-full overflow-hidden bg-slate-100">
          <div className="h-full rounded-full" style={{ width: "78%", background: sol.color }} />
        </div>
      </div>
      {/* Content */}
      <div className="p-3">
        {/* Mini bars */}
        <div className="flex items-end gap-1 h-10 mb-3">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background: i > 5 ? sol.color : `${sol.color}30`
              }} />
          ))}
        </div>
        {/* Feature rows */}
        <div className="space-y-1.5">
          {sol.features.slice(0, 3).map((f, i) => (
            <div key={f} className="flex items-center justify-between">
              <span className="text-[9px] font-semibold text-slate-500">{f}</span>
              <div className="flex items-center gap-1">
                <div className="w-8 h-1 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${85 - i * 10}%`, background: sol.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlatformSection() {
  const [active, setActive] = useState(0);
  const sol = SOLUTIONS[active];

  return (
    <section id="platform" className="py-16 sm:py-20 lg:py-28" style={{ background: "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-5 border"
            style={{ color: TEAL, borderColor: `${TEAL}30`, background: `${TEAL}0d` }}>
            <Layers className="w-3 h-3" /> Platform Overview
          </div>
          <h2 className="text-[1.75rem] sm:text-[2.2rem] lg:text-[2.4rem] xl:text-[2.8rem] font-extrabold text-slate-900 mb-4 sm:mb-5 leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.025em" }}>
            One Platform.{" "}
            <span style={{ color: TEAL }}>Five Enterprise Solutions.</span>
          </h2>
          <p className="text-[0.95rem] sm:text-[1rem] lg:text-[1.05rem] text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Everything regulated enterprises need to publish, amplify, monitor, analyze, and convert — unified in a single AI-powered compliance platform.
          </p>
        </div>

        {/* Solution tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-14">
          {SOLUTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <button key={s.label} onClick={() => setActive(i)}
                className={cn(
                  "flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200 border",
                  i === active
                    ? "text-white shadow-lg scale-[1.02] border-transparent"
                    : "text-slate-500 bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm hover:text-slate-700"
                )}
                style={i === active
                  ? { background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)`, boxShadow: `0 8px 24px ${s.color}40` }
                  : {}}>
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active solution */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Detail card */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <div className="flex items-start gap-5 mb-7">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
                style={{ background: sol.lightBg }}>
                <sol.icon className="w-8 h-8" style={{ color: sol.color }} />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: sol.color }}>
                  Solution {SOLUTIONS.indexOf(sol) + 1} of 5
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 leading-tight mb-1"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {sol.label}
                </h3>
                <p className="text-sm text-slate-400 font-semibold">{sol.tagline}</p>
              </div>
            </div>

            <p className="text-[15px] text-slate-500 leading-relaxed mb-8">{sol.desc}</p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8">
              {sol.features.map(f => (
                <div key={f} className="flex items-center gap-2.5 text-[13.5px] font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ background: sol.lightBg }}>
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: sol.color }} />
                  </div>
                  {f}
                </div>
              ))}
            </div>

            {/* Stat highlight */}
            <div className="flex items-center gap-5 p-5 rounded-2xl border" style={{ background: sol.lightBg, borderColor: `${sol.color}25` }}>
              <div className="text-4xl font-extrabold" style={{ color: sol.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {sol.stat.value}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-700">{sol.stat.label}</div>
                <div className="text-xs text-slate-400">Measured customer outcome</div>
              </div>
              <a href="#demo" className="ml-auto inline-flex items-center gap-1.5 text-[13px] font-bold px-5 py-2.5 rounded-xl text-white flex-shrink-0 transition-all hover:opacity-90"
                style={{ background: sol.color }}>
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Mini UI preview */}
          <div className="lg:col-span-2 rounded-3xl p-6 border" style={{ background: sol.lightBg, borderColor: `${sol.color}20` }}>
            <div className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: sol.color }}>
              Live Platform Preview
            </div>
            <SolutionMiniUI sol={sol} />

            {/* Secondary mini cards */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                { label: "Active", value: "847" },
                { label: "This Month", value: "+31%" },
                { label: "Score", value: "A+" },
                { label: "Channels", value: "12" },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-xl p-3.5 text-center border shadow-sm" style={{ borderColor: `${sol.color}20` }}>
                  <div className="text-base font-extrabold" style={{ color: sol.color }}>{s.value}</div>
                  <div className="text-[10px] text-slate-400 font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   WORKFLOW
───────────────────────────────────────────── */
const WORKFLOW_STEPS = [
  { icon: Cpu, label: "Create Content", sub: "AI-assisted generation", color: TEAL },
  { icon: Eye, label: "Review", sub: "MLR / Legal / Regulatory", color: "#3B82F6" },
  { icon: CheckCircle2, label: "Approve", sub: "Multi-level sign-off", color: "#10B981" },
  { icon: Globe, label: "Publish", sub: "Multi-channel, scheduled", color: "#8B5CF6" },
  { icon: Users, label: "Amplify", sub: "Employee advocacy network", color: "#F59E0B" },
  { icon: Activity, label: "Monitor", sub: "AI real-time monitoring", color: "#EF4444" },
  { icon: BarChart3, label: "Analyze", sub: "ROI & attribution reporting", color: "#06B6D4" },
  { icon: Target, label: "Convert", sub: "Pipeline & revenue impact", color: "#84CC16" },
];

function WorkflowSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section className="py-28 relative overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 100%)` }}>
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }} />

      {/* Teal glow center */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(9,169,158,0.08), transparent)" }} />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-5 border border-white/15"
            style={{ color: TEAL, background: `${TEAL}15` }}>
            <Workflow className="w-3 h-3" /> End-to-End Compliance Workflow
          </div>
          <h2 className="text-[2.4rem] lg:text-[2.8rem] font-extrabold text-white mb-5 leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.025em" }}>
            From Creation to Conversion —{" "}
            <span style={{ color: TEAL }}>Always Compliant</span>
          </h2>
          <p className="text-[1.05rem] text-white/50 max-w-xl mx-auto">
            A seamless AI-powered workflow that takes content from ideation through compliance review to measurable revenue impact.
          </p>
        </div>

        {/* Steps grid */}
        <div className="relative">
          {/* Dashed connector */}
          <div className="absolute top-10 left-[6%] right-[6%] h-px hidden lg:block"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, ${TEAL}60 0, ${TEAL}60 12px, transparent 12px, transparent 22px)`
            }} />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-2">
            {WORKFLOW_STEPS.map((step, i) => {
              const Icon = step.icon;
              const isHovered = hovered === i;
              return (
                <div key={step.label}
                  className="flex flex-col items-center text-center cursor-default"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}>
                  {/* Icon circle */}
                  <div className="relative mb-4 z-10">
                    <div className={cn(
                      "w-20 h-20 rounded-2xl flex items-center justify-center border-2 transition-all duration-300",
                      isHovered ? "scale-110 shadow-2xl" : "scale-100"
                    )}
                      style={{
                        background: isHovered ? step.color : "rgba(255,255,255,0.06)",
                        borderColor: isHovered ? step.color : "rgba(255,255,255,0.1)",
                        boxShadow: isHovered ? `0 20px 48px ${step.color}50` : undefined
                      }}>
                      <Icon className="w-7 h-7 transition-colors duration-300"
                        style={{ color: isHovered ? "white" : "rgba(255,255,255,0.45)" }} />
                    </div>
                    {/* Step number */}
                    <div className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full text-[10px] font-extrabold flex items-center justify-center text-white"
                      style={{ background: step.color }}>
                      {i + 1}
                    </div>
                    {/* Connector arrow (between steps) */}
                    {i < WORKFLOW_STEPS.length - 1 && (
                      <div className="absolute top-1/2 -right-3 -translate-y-1/2 hidden lg:block">
                        <ChevronRight className="w-3 h-3" style={{ color: `${TEAL}50` }} />
                      </div>
                    )}
                  </div>
                  <div className="text-[11.5px] font-bold text-white/80 mb-0.5 leading-tight">{step.label}</div>
                  <div className="text-[9.5px] text-white/35 leading-tight px-1">{step.sub}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom caption */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6">
          {["AI-powered at every step", "Full audit trail preserved", "Zero compliance gaps", "Real-time ROI visibility"].map(item => (
            <div key={item} className="flex items-center gap-2 text-[12px] font-semibold text-white/45">
              <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: TEAL }} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   INDUSTRIES
───────────────────────────────────────────── */
const INDUSTRIES = [
  {
    icon: FlaskConical, color: TEAL, bg: "#f0fdfc",
    title: "Life Sciences",
    desc: "MLR review workflows, adverse event monitoring, FDA-compliant publishing, and HCP engagement tracking for biotech and research organizations.",
    regs: ["FDA 21 CFR", "MLR Review", "AE Detection"],
  },
  {
    icon: HeartPulse, color: "#3B82F6", bg: "#eff6ff",
    title: "Pharmaceuticals",
    desc: "Promotional material review, drug information compliance, physician communications, and full regulatory-grade audit trails.",
    regs: ["FDA", "EMA", "PAAB"],
  },
  {
    icon: Activity, color: "#8B5CF6", bg: "#f5f3ff",
    title: "Medical Devices",
    desc: "Device labeling compliance, post-market surveillance monitoring, HCP engagement, and multi-region regulatory oversight.",
    regs: ["FDA 510(k)", "CE Mark", "MDR"],
  },
  {
    icon: TrendingUp, color: "#F59E0B", bg: "#fffbeb",
    title: "Financial Services",
    desc: "FINRA and SEC compliant investment communications, advisor supervision, and fully archived records management.",
    regs: ["FINRA", "SEC", "MiFID II"],
  },
  {
    icon: Landmark, color: "#EF4444", bg: "#fff1f2",
    title: "Banking",
    desc: "Consumer communication compliance, real-time risk monitoring, regulatory disclosure management, and global brand governance.",
    regs: ["FDIC", "OCC", "Basel III"],
  },
  {
    icon: Briefcase, color: "#06B6D4", bg: "#ecfeff",
    title: "Insurance",
    desc: "Product marketing compliance, agent communication oversight, multi-state regulatory management, and policyholder disclosures.",
    regs: ["NAIC", "State DOI", "Lloyd's"],
  },
  {
    icon: Building2, color: "#84CC16", bg: "#f7fee7",
    title: "Enterprise Technology",
    desc: "Global brand consistency, multi-market publishing, executive thought leadership programs, and enterprise governance at scale.",
    regs: ["GDPR", "CCPA", "ISO 27001"],
  },
];

function IndustriesSection() {
  return (
    <section id="industries" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-5 border"
            style={{ color: TEAL, borderColor: `${TEAL}30`, background: `${TEAL}0d` }}>
            <Building2 className="w-3 h-3" /> Industry Solutions
          </div>
          <h2 className="text-[1.75rem] sm:text-[2.2rem] lg:text-[2.4rem] xl:text-[2.8rem] font-extrabold text-slate-900 mb-4 sm:mb-5 leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.025em" }}>
            Purpose-Built for Every{" "}
            <span style={{ color: TEAL }}>Regulated Industry</span>
          </h2>
          <p className="text-[1.05rem] text-slate-500 max-w-2xl mx-auto">
            Compliance requirements differ by industry. MarketBeam is pre-configured for each regulatory environment — not generic software bolted on.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {INDUSTRIES.map(ind => {
            const Icon = ind.icon;
            return (
              <div key={ind.title}
                className="group relative rounded-2xl border border-slate-100 bg-white p-6 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ background: `linear-gradient(135deg, ${ind.bg}, white)` }} />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: ind.bg }}>
                    <Icon className="w-6 h-6" style={{ color: ind.color }} />
                  </div>
                  <h3 className="text-[15px] font-extrabold text-slate-800 mb-2.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {ind.title}
                  </h3>
                  <p className="text-[12.5px] text-slate-500 leading-relaxed mb-4">{ind.desc}</p>

                  {/* Regulation chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {ind.regs.map(r => (
                      <span key={r} className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                        style={{ color: ind.color, background: `${ind.color}15` }}>
                        {r}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-[12px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: ind.color }}>
                    Explore solution <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COMPLIANCE
───────────────────────────────────────────── */
const COMPLIANCE_FEATURES = [
  { icon: GitBranch, title: "MLR Workflows", desc: "Medical, legal, regulatory review automation with configurable routing and escalation rules." },
  { icon: Shield, title: "FDA Supported", desc: "21 CFR Part 11 compliant workflows for pharmaceutical and device promotional materials." },
  { icon: FileText, title: "FINRA Compliance", desc: "Rule 2210 supervision, pre-approval routing, and FINRA-ready archiving built in." },
  { icon: Landmark, title: "SEC Compliance", desc: "Investment adviser and broker-dealer communication standards and recordkeeping." },
  { icon: Archive, title: "Audit Logs", desc: "Immutable, timestamped, tamper-proof records of every action across every workflow." },
  { icon: ClipboardList, title: "Governance Policies", desc: "Enterprise-wide policy enforcement with delegation controls across teams and geographies." },
  { icon: CheckCircle2, title: "Approval Trails", desc: "Complete chain-of-custody for every piece of content from draft to published." },
  { icon: Lock, title: "Role Permissions", desc: "Granular RBAC — control who can create, review, approve, and publish by role and region." },
  { icon: Database, title: "Content Archiving", desc: "Long-term compliant retention with full-text search and regulatory retrieval capabilities." },
  { icon: FileBarChart, title: "Regulatory Reporting", desc: "One-click compliance reports configured for any regulatory body or audit request." },
];

function ComplianceSection() {
  return (
    <section id="compliance" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(160deg, #f0fdfc 0%, #eff6ff 100%)" }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full -z-10 opacity-30"
        style={{ background: `radial-gradient(circle, ${TEAL}40, transparent)`, transform: "translate(40%,-40%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-6 border bg-white"
              style={{ color: TEAL, borderColor: `${TEAL}30` }}>
              <ShieldCheck className="w-3 h-3" /> Enterprise Compliance
            </div>
            <h2 className="text-[2.4rem] lg:text-[2.8rem] font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.025em" }}>
              Compliance Built Into{" "}
              <span style={{ color: TEAL }}>Every Workflow</span>
            </h2>
            <p className="text-[1.05rem] text-slate-500 leading-relaxed mb-8">
              MarketBeam is not a compliance add-on retrofitted to a social tool. It is a compliance-first platform where every feature, every workflow, and every approval step is purpose-built to reduce regulatory risk and accelerate review cycles.
            </p>

            {/* Cert badges */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {["HIPAA", "SOC 2 Type II", "FINRA", "SEC 17a-4", "FDA 21 CFR", "GDPR", "ISO 27001", "CCPA"].map(cert => (
                <div key={cert}
                  className="flex items-center gap-1.5 text-[11.5px] font-bold px-3 py-1.5 rounded-lg bg-white border border-slate-100 shadow-sm"
                  style={{ color: TEAL_DARK }}>
                  <Shield className="w-3 h-3" style={{ color: TEAL }} />
                  {cert}
                </div>
              ))}
            </div>

            {/* Shield visual */}
            <div className="flex items-center gap-4 p-6 rounded-2xl border border-[#09A99E]/20 bg-white shadow-sm">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-base font-extrabold text-slate-800 mb-1">Zero Compliance Violations</div>
                <div className="text-sm text-slate-400">
                  Customers report zero regulatory violations in the 18 months after deploying MarketBeam's compliance workflows.
                </div>
              </div>
            </div>
          </div>

          {/* Right: feature grid */}
          <div className="grid grid-cols-2 gap-3">
            {COMPLIANCE_FEATURES.map(f => {
              const Icon = f.icon;
              return (
                <div key={f.title}
                  className="group bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3.5"
                    style={{ background: `${TEAL}12` }}>
                    <Icon className="w-4.5 h-4.5" style={{ color: TEAL }} />
                  </div>
                  <div className="text-[13px] font-extrabold text-slate-800 mb-1.5">{f.title}</div>
                  <div className="text-[11.5px] text-slate-400 leading-relaxed">{f.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   INTEGRATIONS
───────────────────────────────────────────── */
const INTEGRATIONS = [
  { name: "Veeva Vault", cat: "Life Sciences", color: "#F47721", tier: "featured", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLpyeI6CkQSisxZqpK1sUQ9pGXJpSmjwxwiDhQoMSDLQ&s=10" },
  { name: "Salesforce", cat: "CRM", color: "#00A1E0", tier: "featured", logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfDnHxaiWDSP12X4w_hN3tSE4JkgLTt6wfJDED8D8IOg&s=10" },
  { name: "HubSpot", cat: "Marketing", color: "#FF7A59", tier: "featured", logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-GYjHv0ygt0wSwDrkS_rM5V3EtupBnF_EL1u6f1WRWg&s=10" },
  { name: "LinkedIn", cat: "Social", color: "#0A66C2", tier: "featured", logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRti_hHULf5IumOwOvXB4elZqf5VPTDPqK4NKnzVWJZcw&s=10" },
  { name: "Slack", cat: "Collaboration", color: "#4A154B", tier: "standard", logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6xbrbBttDkmewr22dLmq-lHCXAwgLZ5xx4LVTnseMyQ&s=10" },
  { name: "Microsoft Teams", cat: "Collaboration", color: "#5059C9", tier: "standard", logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7p-BGvz88d9VUOx165grkkmXpTbdTAzXhHsyqjDQjMw&s=10" },
  { name: "Workday", cat: "HRIS", color: "#F5A623", tier: "standard", logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4FlbLcKMJ1RRDd9yy0fW5pfRYp08nXngjXr9IMc7rHA&s=10" },
  { name: "Tableau", cat: "Analytics", color: "#E8762D", tier: "standard", logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlF0oVZfwLaX-bOhRs-xgbWudMICIgBSYUtYADHVPADw&s=10" },
  { name: "Twitter / X", cat: "Social", color: "#000000", tier: "standard", logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJtf3wb3EB4Tbgs6pHMYFXir2Sca6OlI-Ka4GnHJQ-5A&s=10" },
  { name: "Facebook", cat: "Social", color: "#1877F2", tier: "standard", logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEY-bJCWKl8XQCQwHMhc5kgdiK-k3Q_lOAyJlmn9fb1g&s=10" },
  { name: "Power BI", cat: "BI", color: "#F2C811", tier: "standard", logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRggU1bUBHWR5MLRhSbuMaG1LFJ7pV6ic3rEJIv3mxi5w&s=10" },
  { name: "ServiceNow", cat: "Enterprise", color: "#81B5A1", tier: "standard", logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSov2QoRGo7YEIPg_vZh0GVUksxS_IIOBTI_l6FNmikDw&s=10" },
  { name: "Marketo", cat: "Marketing", color: "#5C4EE5", tier: "standard", logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ03mP4YHDRbw9VkqGNcjPXGBeOIpKrB8qX7PFEB0_eQ&s=10" },
  { name: "Veeva CRM", cat: "Life Sciences", color: "#F47721", tier: "standard", logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH65wDVR2fIXRmqb8rOBnLGXDsA4xcBgPwsKW_uDEwag&s=10" },
  { name: "SAP", cat: "ERP", color: "#0870C4", tier: "standard", logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoo8OyaIX33boK-mJB2WNXzx9rFy4alR5IKdfBA6jcGw&s=10" },
  { name: "Google Analytics", cat: "Analytics", color: "#E37400", tier: "standard", logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ22yCUsWhiKWLoEdx98pEK-y4JSfDxC15NzctUpzBhDw&s=10" },
];

function IntegrationsSection() {
  return (
    <section id="integrations" className="py-28" style={{ background: "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-5 border"
            style={{ color: TEAL, borderColor: `${TEAL}30`, background: `${TEAL}0d` }}>
            <Zap className="w-3 h-3" /> 200+ Integrations
          </div>
          <h2 className="text-[1.75rem] sm:text-[2.2rem] lg:text-[2.4rem] xl:text-[2.8rem] font-extrabold text-slate-900 mb-4 sm:mb-5 leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.025em" }}>
            Connects to Your{" "}
            <span style={{ color: TEAL }}>Existing Enterprise Stack</span>
          </h2>
          <p className="text-[1.05rem] text-slate-500 max-w-xl mx-auto">
            Plug MarketBeam into the systems your teams already use. No rip-and-replace, no data silos.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {INTEGRATIONS.map(intg => (
            <div key={intg.name}
              className="group bg-white rounded-2xl border border-slate-100 p-4.5 flex items-center gap-3.5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
              {intg.logo ? (
                <img src={intg.logo} alt={intg.name} className="w-11 h-11 rounded-xl flex-shrink-0 object-contain" />
              ) : (
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-sm font-extrabold shadow-sm"
                  style={{ background: intg.color }}>
                  {intg.name[0]}
                </div>
              )}
              <div className="min-w-0">
                <div className="text-[13px] font-bold text-slate-800 truncate">{intg.name}</div>
                <div className="text-[10.5px] text-slate-400 font-semibold">{intg.cat}</div>
              </div>
              {intg.tier === "featured" && (
                <div className="ml-auto flex-shrink-0">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: `${TEAL}18` }}>
                    <Star className="w-2.5 h-2.5" style={{ color: TEAL }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#" className="inline-flex items-center gap-2 text-[13.5px] font-bold transition-colors"
            style={{ color: TEAL }}>
            View all 200+ integrations <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STATS
───────────────────────────────────────────── */
function StatCard({ end, suffix = "", decimals = 0, label, sub, icon: Icon }: {
  end: number; suffix?: string; decimals?: number;
  label: string; sub: string; icon: React.ElementType;
}) {
  const { count, ref } = useCountUp(end, 2200, decimals);
  return (
    <div ref={ref}
      className="group text-center rounded-3xl border border-slate-100 bg-white p-8 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform"
        style={{ background: `${TEAL}12` }}>
        <Icon className="w-7 h-7" style={{ color: TEAL }} />
      </div>
      <div className="text-[2.75rem] font-extrabold leading-none mb-2"
        style={{ color: TEAL, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}{suffix}
      </div>
      <div className="text-[14px] font-bold text-slate-800 mb-1">{label}</div>
      <div className="text-[12px] text-slate-400 font-medium">{sub}</div>
    </div>
  );
}

function StatsSection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-[1.75rem] sm:text-[2.2rem] lg:text-[2.4rem] xl:text-[2.8rem] font-extrabold text-slate-900 mb-4 sm:mb-5 leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.025em" }}>
            Results That Speak{" "}
            <span style={{ color: TEAL }}>for Themselves</span>
          </h2>
          <p className="text-[1.05rem] text-slate-500">
            Measured outcomes from enterprise customers across regulated industries.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard end={60} suffix="%" label="Faster Review Cycles" sub="vs. manual MLR workflows" icon={Zap} />
          <StatCard end={90} suffix="%" label="Lower Compliance Risk" sub="AI-flagged before publish" icon={ShieldCheck} />
          <StatCard end={3} suffix="×" label="More Efficient Teams" sub="with automated workflows" icon={Users} />
          <StatCard end={2.5} suffix="×" decimals={1} label="Higher Social ROI" sub="attributed to pipeline" icon={TrendingUp} />
          <StatCard end={400} suffix="×" label="Greater Organic Reach" sub="through employee advocacy" icon={Globe} />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CASE STUDIES
───────────────────────────────────────────── */
const CASE_STUDIES = [
  {
    industry: "Life Sciences", company: "Global Biotech Leader", color: TEAL,
    challenge: "50-person MLR team manually reviewing every social post across 12 therapeutic areas — review cycles taking 3–4 weeks and delaying time-sensitive launches.",
    solution: "MarketBeam automated MLR routing, version control, and audit trails, giving all reviewers a single workspace with AI pre-screening that flags issues before human review.",
    results: ["67% faster MLR review cycles", "Zero compliance violations in 18 months", "$2.1M in operational savings annually"],
    quote: "MarketBeam transformed our MLR process from our biggest bottleneck into a genuine competitive advantage. We now publish in days, not weeks.",
    author: "VP, Digital Strategy & Innovation",
  },
  {
    industry: "Financial Services", company: "Top-5 US Investment Bank", color: "#3B82F6",
    challenge: "Decentralized social media activity across 40 financial advisors creating FINRA supervision gaps, archiving failures, and growing regulatory exposure.",
    solution: "Deployed MarketBeam with FINRA-compliant pre-approval workflows, real-time supervision dashboards, and compliant content archiving across all channels and advisors.",
    results: ["100% FINRA compliant communications", "40 advisors unified on one platform", "3× increase in approved content volume"],
    quote: "We went from reactive compliance fire-fighting to proactive governance in under 90 days. Our CCO finally sleeps at night.",
    author: "Chief Compliance Officer",
  },
  {
    industry: "Pharmaceuticals", company: "Fortune 500 Pharma", color: "#8B5CF6",
    challenge: "200+ country affiliates publishing inconsistent content without centralized regulatory oversight, creating significant legal risk and brand inconsistency globally.",
    solution: "Global MarketBeam rollout with market-specific approval workflows, approved content libraries, and a centralized compliance dashboard spanning all 200+ markets.",
    results: ["200+ global affiliates on one platform", "89% reduction in unapproved content", "Unified global compliance oversight"],
    quote: "For the first time, we have complete visibility and control over our global social presence — in every market, every language, every channel.",
    author: "Global Head of Digital, Corporate Affairs",
  },
];

function CaseStudiesSection() {
  return (
    <section className="py-28" style={{ background: "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-5 border"
            style={{ color: TEAL, borderColor: `${TEAL}30`, background: `${TEAL}0d` }}>
            <Star className="w-3 h-3" /> Customer Success Stories
          </div>
          <h2 className="text-[1.75rem] sm:text-[2.2rem] lg:text-[2.4rem] xl:text-[2.8rem] font-extrabold text-slate-900 mb-4 sm:mb-5 leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.025em" }}>
            Enterprise Success at Scale
          </h2>
          <p className="text-[1.05rem] text-slate-500 max-w-xl mx-auto">
            See how the world's most regulated organizations use MarketBeam to scale social without compliance risk.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map(cs => (
            <div key={cs.company}
              className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              {/* Color top bar */}
              <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${cs.color}, ${cs.color}80)` }} />

              <div className="p-7 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-6">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg"
                    style={{ color: cs.color, background: `${cs.color}15` }}>
                    {cs.industry}
                  </span>
                  <span className="text-[12px] text-slate-400 font-semibold">{cs.company}</span>
                </div>

                {/* C/S/R */}
                {[
                  { heading: "Challenge", text: cs.challenge },
                  { heading: "Solution", text: cs.solution },
                ].map(block => (
                  <div key={block.heading} className="mb-5">
                    <div className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-300 mb-1.5">{block.heading}</div>
                    <p className="text-[12.5px] text-slate-600 leading-relaxed">{block.text}</p>
                  </div>
                ))}

                <div className="mb-6">
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-300 mb-2.5">Results</div>
                  <div className="space-y-2">
                    {cs.results.map(r => (
                      <div key={r} className="flex items-start gap-2.5 text-[12.5px]">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${cs.color}18` }}>
                          <Check className="w-2.5 h-2.5" style={{ color: cs.color }} />
                        </div>
                        <span className="font-bold text-slate-800">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="mt-auto pt-5 border-t border-slate-50">
                  <div className="text-2xl mb-2" style={{ color: `${cs.color}60` }}>"</div>
                  <p className="text-[13px] italic text-slate-500 leading-relaxed mb-3">{cs.quote}</p>
                  <div className="text-[11.5px] font-bold text-slate-700">— {cs.author}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   RESOURCES
───────────────────────────────────────────── */
const RESOURCES = [
  { icon: BookOpen, cat: "Blog", color: TEAL, title: "FINRA Social Media Compliance: The Complete2026 Guide for Financial Advisors", read: "8 min" },
  { icon: FileBarChart, cat: "Case Study", color: "#3B82F6", title: "How a Global Biotech Cut MLR Review Cycles by 67% with MarketBeam", read: "12 min" },
  { icon: Shield, cat: "Compliance Guide", color: "#8B5CF6", title: "FDA Social Media Guidance: What Pharma Marketers Need to Know in2026", read: "15 min" },
  { icon: Video, cat: "Webinar", color: "#F59E0B", title: "AI in Regulated Social Media: Navigating the Compliance Landscape", read: "45 min" },
  { icon: Newspaper, cat: "Industry Report", color: "#EF4444", title: "State of Social Media in Life Sciences2026: Trends & Benchmarks", read: "20 min" },
  { icon: LayoutDashboard, cat: "Product Guide", color: "#06B6D4", title: "Getting Started with MLR Workflow Automation: A Step-by-Step Guide", read: "10 min" },
];

function ResourcesSection() {
  return (
    <section id="resources" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-4 border"
              style={{ color: TEAL, borderColor: `${TEAL}30`, background: `${TEAL}0d` }}>
              <BookOpen className="w-3 h-3" /> Resources
            </div>
            <h2 className="text-[2rem] lg:text-[2.4rem] font-extrabold text-slate-900 leading-tight tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.025em" }}>
              Knowledge for Compliance Leaders
            </h2>
          </div>
          <a href="#" className="inline-flex items-center gap-1.5 text-[13.5px] font-bold" style={{ color: TEAL }}>
            View all resources <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESOURCES.map(r => {
            const Icon = r.icon;
            return (
              <a key={r.title} href="#"
                className="group rounded-2xl border border-slate-100 bg-slate-50/50 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${r.color}15` }}>
                    <Icon className="w-4.5 h-4.5" style={{ color: r.color }} />
                  </div>
                  <span className="text-[10.5px] font-extrabold uppercase tracking-wider" style={{ color: r.color }}>
                    {r.cat}
                  </span>
                </div>
                <h3 className="text-[13.5px] font-bold text-slate-800 leading-snug mb-3 group-hover:text-[#09A99E] transition-colors">
                  {r.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 font-semibold">{r.read} read</div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#09A99E] group-hover:translate-x-0.5 transition-all" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */
const FAQS = [
  {
    q: "How does MarketBeam handle MLR review workflows for pharmaceutical companies?",
    a: "MarketBeam provides fully configurable multi-step review workflows that route content through your Medical, Legal, and Regulatory teams in sequence or parallel based on content type and therapeutic area. Every version, comment, and approval decision is captured in an immutable audit log. Our AI pre-screens content before human review, flagging potential issues to reduce back-and-forth cycles.",
  },
  {
    q: "Which regulatory frameworks and compliance standards does MarketBeam support?",
    a: "MarketBeam supports FINRA Rule 2210, SEC 17a-4, FDA guidance on internet and social media promotion, 21 CFR Part 11, HIPAA, GDPR, CCPA, ISO 27001, SOC 2 Type II, and more. Our dedicated compliance team monitors regulatory changes and updates the platform proactively — you're always ahead of the requirements, not behind them.",
  },
  {
    q: "How does the Veeva Vault PromoMats integration work?",
    a: "MarketBeam has a native bidirectional integration with Veeva Vault PromoMats. Approved promotional content flows directly from Veeva into MarketBeam's publishing queue with all metadata preserved. Social engagement data and performance analytics can be pushed back into Veeva for regulatory documentation and promotional material tracking.",
  },
  {
    q: "Can MarketBeam scale to a global multi-market enterprise organization?",
    a: "Yes — MarketBeam is designed for global enterprise deployments with multi-market, multi-language, and multi-brand support. Our role-based access controls allow granular permission settings across regions, business units, therapeutic areas, and brands. Country affiliates can work within locally-configured compliance guardrails while corporate maintains global visibility.",
  },
  {
    q: "How does Employee Advocacy maintain regulatory compliance?",
    a: "Employees can only share content from a pre-approved, compliance-reviewed library. All sharing activity is tracked, attributed, and archived. Compliance teams set guardrails on which content can be shared, by which employee roles, and on which channels. Every share generates an audit record. AI continuously monitors shared content for compliance drift.",
  },
  {
    q: "What does enterprise implementation and onboarding look like?",
    a: "Our Enterprise Success team provides a dedicated implementation manager, technical integration engineering, compliance workflow configuration, SSO/SCIM setup, training, and go-live support. Most enterprise customers complete implementation in 60–90 days depending on integration complexity. We offer a 90-day Success Guarantee: you go live or we extend support at no charge.",
  },
  {
    q: "How is MarketBeam different from general social media management tools?",
    a: "General tools are built for marketing teams and bolt on compliance as an afterthought. MarketBeam is architected from the ground up for regulated industries — MLR workflows, adverse event detection, FINRA supervision, audit logs, and regulatory reporting are core capabilities, not add-ons. This distinction matters enormously when your social activity is subject to FDA, FINRA, or SEC review.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-28" style={{ background: "#F8FAFC" }}>
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-[2.4rem] font-extrabold text-slate-900 mb-4 tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.025em" }}>
            Frequently Asked Questions
          </h2>
          <p className="text-[1.05rem] text-slate-500">
            Everything compliance leaders and digital teams need to know before evaluating MarketBeam.
          </p>
        </div>
        <div className="space-y-2.5">
          {FAQS.map((faq, i) => (
            <div key={i}
              className={cn(
                "bg-white rounded-2xl border overflow-hidden transition-all duration-200",
                open === i ? "border-[#09A99E]/30 shadow-md" : "border-slate-100 hover:border-slate-200"
              )}>
              <button
                className="w-full flex items-start justify-between px-6 py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}>
                <span className="text-[14px] font-bold text-slate-800 leading-snug">{faq.q}</span>
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all",
                  open === i ? "rotate-180" : ""
                )}
                  style={{ background: open === i ? `${TEAL}15` : "#f1f5f9" }}>
                  <ChevronDown className="w-3.5 h-3.5" style={{ color: open === i ? TEAL : "#94a3b8" }} />
                </div>
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="text-[13.5px] text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────────── */
function CTASection() {
  return (
    <section id="demo" className="py-32 relative overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${NAVY} 0%, #0a1628 100%)` }}>
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-25"
          style={{ background: `radial-gradient(ellipse, ${TEAL}, transparent)` }} />
      </div>
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }} />

      <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-8 border border-white/15"
          style={{ color: TEAL, background: `${TEAL}18` }}>
          <Zap className="w-3 h-3" /> Get Started Today
        </div>

        <h2 className="text-[2.6rem] lg:text-[3.2rem] xl:text-[3.6rem] font-extrabold text-white mb-7 leading-[1.08] tracking-tight"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.03em" }}>
          Ready to Scale Social Media{" "}
          <span style={{ color: TEAL }}>Without Compliance Risk?</span>
        </h2>

        <p className="text-[1.15rem] text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join hundreds of regulated enterprises who trust MarketBeam to publish, amplify, and monitor compliant social media — at any scale, in any market.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <a href="#"
            className="group inline-flex items-center justify-center gap-2.5 text-[15px] font-extrabold text-white px-9 py-4 rounded-xl shadow-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(9,169,158,0.5)]"
            style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_DARK} 100%)` }}>
            Schedule Demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a href="#"
            className="inline-flex items-center justify-center gap-2.5 text-[15px] font-bold text-white px-9 py-4 rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-200">
            <Phone className="w-4 h-4" />
            Talk to an Expert
          </a>
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap items-center justify-center gap-7">
          {[
            "No long-term contracts required",
            "Dedicated enterprise success manager",
            "Compliant from day one",
            "90-day success guarantee",
          ].map(item => (
            <div key={item} className="flex items-center gap-2 text-[12px] font-semibold text-white/35">
              <Check className="w-3.5 h-3.5" style={{ color: TEAL }} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  const cols = [
    {
      heading: "Platform",
      links: ["Social Publishing", "Employee Advocacy", "Social Analytics", "Social Monitoring", "Prospect Intelligence", "AI Features"],
    },
    {
      heading: "Industries",
      links: ["Life Sciences", "Pharmaceuticals", "Medical Devices", "Financial Services", "Banking", "Insurance", "Enterprise Tech"],
    },
    {
      heading: "Resources",
      links: ["Blog", "Case Studies", "Compliance Guides", "Webinars", "Industry Reports", "Documentation", "API Reference"],
    },
    {
      heading: "Company",
      links: ["About MarketBeam", "Careers", "Press & Media", "Partner Program", "Contact Us", "Security & Trust"],
    },
  ];

  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 pt-12 sm:pt-14 lg:pt-16 pb-8 sm:pb-10">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-10 mb-14">
          {/* Brand column */}
          <div>
            <div className="mb-5">
              <img src="https://marketbeam.io/wp-content/uploads/2024/10/Untitled-design-15-2.png" alt="MarketBeam" className="h-8 object-contain" />
            </div>
            <p className="text-[12.5px] text-slate-400 leading-relaxed mb-6 max-w-[220px]">
              The AI-powered social media compliance platform built for regulated industries.
            </p>
            <div className="flex items-center gap-2.5 mb-6">
              {[Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
            {/* Cert badges */}
            <div className="flex flex-wrap gap-1.5">
              {["SOC 2", "HIPAA", "GDPR"].map(c => (
                <div key={c} className="text-[9.5px] font-bold px-2 py-0.5 rounded border border-slate-100 text-slate-400">{c}</div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.heading}>
              <h5 className="text-[10.5px] font-extrabold uppercase tracking-[0.15em] text-slate-900 mb-4">{col.heading}</h5>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-[12.5px] text-slate-400 hover:text-slate-700 transition-colors font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11.5px] text-slate-400 font-medium">
            ©2026 MarketBeam, Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "Security"].map(link => (
              <a key={link} href="#" className="text-[11.5px] text-slate-400 hover:text-slate-700 transition-colors font-medium">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}>
      <Nav />
      <main>
        <HeroSection />
        <TrustedBySection />
        <PlatformSection />
        <WorkflowSection />
        <IndustriesSection />
        <ComplianceSection />
        <IntegrationsSection />
        <StatsSection />
        <CaseStudiesSection />
        <ResourcesSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <div className="bg-slate-50 border-t border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <p className="text-[12px] text-slate-500 font-medium">
            This design is made with ❤️ by <a href="https://achivoo.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-700 hover:text-slate-900 transition-colors">Achivoo</a>
          </p>
        </div>
      </div>
    </div>
  );
}
