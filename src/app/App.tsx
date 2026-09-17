import { useState, useEffect, useRef } from "react";
import {
  Shield, BarChart3, Users, Eye, Target, ChevronDown,
  Check, ArrowRight, Play, Globe, Zap, Lock, FileText,
  TrendingUp, Building2, Landmark, FlaskConical,
  ShieldCheck, Database, CheckCircle2, Calendar, Layers,
  BookOpen, Video, FileBarChart, Newspaper, X, Menu,
  ClipboardList, Activity, Cpu, Sparkles, GitBranch, Archive,
  Bell, Twitter, Linkedin, Youtube, Star, AlertTriangle,
  Workflow, RefreshCcw, Settings, ChevronRight, Filter,
  CheckSquare, ShieldAlert, Award
} from "lucide-react";

/* ─────────────────────────────────────────────
   Utilities & Color Constants
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
   NAV (Header - Untouched design)
───────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    { label: "Why MarketBeam", href: "#why-marketbeam" },
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
            Book A Demo <ArrowRight className="w-3.5 h-3.5" />
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
            Book A Demo
          </a>
        </div>
      )}
    </header>
  );
}

/* ─────────────────────────────────────────────
   1. HERO SECTION (Updated Content)
───────────────────────────────────────────── */
function HeroDashboard() {
  const queue = [
    { channel: "LinkedIn", text: "Q3 Clinical Study Results: Multi-center trial shows positive endpoints...", badge: "MLR Approved", badgeColor: "#09A99E", dot: "#09A99E" },
    { channel: "Twitter / X", text: "Join our healthcare symposium live stream at 2 PM EST...", badge: "AI Prechecked", badgeColor: "#3B82F6", dot: "#3B82F6" },
    { channel: "Facebook", text: "Patient advocacy initiatives expanding to 5 new regions...", badge: "Pending Review", badgeColor: "#F59E0B", dot: "#F59E0B" },
    { channel: "LinkedIn", text: "Veeva PromoMats cleared campaign launching across global teams...", badge: "Scheduled", badgeColor: "#8B5CF6", dot: "#8B5CF6" },
  ];
  return (
    <div className="relative rounded-[20px] shadow-[0_32px_80px_rgba(0,0,0,0.28)] overflow-hidden border border-white/10"
      style={{ background: "linear-gradient(160deg, #0F172A 0%, #152030 100%)" }}>
      {/* Chrome header */}
      <div className="flex items-center gap-1.5 px-4 pt-3.5 pb-3 border-b border-white/[0.07]">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        <div className="flex-1 mx-3 h-[22px] rounded-md flex items-center px-2.5 gap-1.5"
          style={{ background: "rgba(255,255,255,0.06)" }}>
          <Lock className="w-2.5 h-2.5 text-emerald-400/70" />
          <span className="text-[10px] text-white/30 font-mono">app.marketbeam.ai/compliance-hub</span>
        </div>
        <div className="flex items-center gap-1">
          <RefreshCcw className="w-2.5 h-2.5 text-white/30" />
        </div>
      </div>

      {/* Main app preview */}
      <div className="flex" style={{ minHeight: 350 }}>
        <div className="w-12 border-r border-white/[0.06] flex flex-col items-center py-4 gap-3">
          {[Layers, Calendar, Users, BarChart3, Eye, Settings].map((Icon, i) => (
            <div key={i} className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors",
              i === 0 ? "bg-[#09A99E]/20" : "hover:bg-white/5"
            )}>
              <Icon className={cn("w-4 h-4", i === 0 ? "text-[#09A99E]" : "text-white/25")} />
            </div>
          ))}
        </div>

        <div className="flex-1 p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-white text-sm font-bold leading-none mb-1">Compliance & Social Hub</div>
              <div className="text-white/35 text-[10px]">Life Sciences & Financial Enterprise Division</div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#09A99E]/30 text-[#09A99E] bg-[#09A99E]/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#09A99E] animate-pulse" />
              AI Precheck Active
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label: "Approved Posts", value: "1,420", color: TEAL },
              { label: "In MLR Review", value: "24", color: "#3B82F6" },
              { label: "Compliance Rate", value: "100%", color: "#10B981" },
              { label: "AE Alerts", value: "0 Active", color: "#8B5CF6" },
            ].map(k => (
              <div key={k.label} className="rounded-xl p-2.5 border border-white/[0.07]"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="text-[9px] text-white/35 mb-0.5 uppercase tracking-wider">{k.label}</div>
                <div className="text-sm font-extrabold leading-none" style={{ color: k.color }}>{k.value}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/[0.07] overflow-hidden mb-3"
            style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-3 h-3 text-white/40" />
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Governed Workflow Queue</span>
              </div>
              <span className="text-[9px] text-white/30">Veeva & MLR Synced</span>
            </div>
            {queue.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2 border-b border-white/[0.04] last:border-0">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.dot }} />
                <div className="w-16 text-[9px] font-bold text-white/30 flex-shrink-0">{item.channel}</div>
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
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-20"
        style={{ background: "linear-gradient(160deg, #F0FDFC 0%, #F8FAFC 45%, #EFF6FF 100%)" }} />
      <div className="absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#09A99E 1px, transparent 1px), linear-gradient(90deg, #09A99E 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }} />
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full -z-10"
        style={{ background: "radial-gradient(circle, rgba(9,169,158,0.18) 0%, transparent 65%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-8 sm:gap-12 xl:gap-16 items-center">
          {/* Left content */}
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-5 border"
              style={{ color: TEAL, borderColor: `${TEAL}35`, background: `${TEAL}0f` }}>
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Social Media Management & Compliance
            </div>

            {/* H1 */}
            <h1 className="text-[1.8rem] sm:text-[2.4rem] lg:text-[2.7rem] xl:text-[3.1rem] font-extrabold leading-[1.12] tracking-tight text-slate-900 mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.03em" }}>
              Social Media Management Built for{" "}
              <span style={{ color: TEAL }}>Regulated Industries</span>
            </h1>

            {/* Description */}
            <p className="text-[0.95rem] sm:text-[1.025rem] text-slate-600 leading-[1.65] mb-6">
              MarketBeam helps life sciences, financial services, and enterprise teams create, review, approve, publish, monitor, and measure social media content while maintaining compliance across every workflow.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-3.5 mb-6">
              <a href="#demo"
                className="group inline-flex items-center justify-center gap-2 text-[14px] sm:text-[15px] font-bold text-white px-7 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
                style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_DARK} 100%)` }}>
                Book A Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* 3 Supporting Points - Horizontal Compact Row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 border-t border-slate-200/60">
              {[
                "Built-in MLR & approval workflows",
                "AI-powered compliance precheck",
                "Audit-ready publishing and reporting"
              ].map(point => (
                <div key={point} className="flex items-center gap-2 text-[12.5px] font-semibold text-slate-700">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${TEAL}18` }}>
                    <Check className="w-3 h-3" style={{ color: TEAL }} />
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Dashboard Visual */}
          <div className="relative lg:ml-4">
            <HeroDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   2. BUSINESS RESULTS SECTION (Copy Updated)
───────────────────────────────────────────── */
function StatCard({ end, suffix = "", decimals = 0, label, sub, icon: Icon }: {
  end: number; suffix?: string; decimals?: number;
  label: string; sub: string; icon: React.ElementType;
}) {
  const { count, ref } = useCountUp(end, 2200, decimals);
  return (
    <div ref={ref}
      className="group text-center rounded-2xl border border-slate-100 bg-white p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
        style={{ background: `${TEAL}12` }}>
        <Icon className="w-6 h-6" style={{ color: TEAL }} />
      </div>
      <div className="text-[2.5rem] font-extrabold leading-none mb-2"
        style={{ color: TEAL, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}{suffix}
      </div>
      <div className="text-[14px] font-bold text-slate-800 mb-1.5">{label}</div>
      <div className="text-[12px] text-slate-500 font-medium leading-relaxed">{sub}</div>
    </div>
  );
}

function StatsSection() {
  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[1.75rem] sm:text-[2.2rem] font-extrabold text-slate-900 mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Proven Business Results
          </h2>
          <p className="text-[1rem] text-slate-500 max-w-xl mx-auto">
            Measurable impact reported by organizations using MarketBeam.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard end={60} suffix="%" label="60% Faster Review Cycles" sub="Automate approvals and reduce manual compliance handoffs." icon={Zap} />
          <StatCard end={90} suffix="%" label="90% Lower Compliance Risk" sub="Identify potential issues before content reaches publishing." icon={ShieldCheck} />
          <StatCard end={3} suffix="X" label="3X More Efficient Teams" sub="Manage publishing, approvals, monitoring, and advocacy from one platform." icon={Users} />
          <StatCard end={2.5} suffix="X" decimals={1} label="2.5X Higher Social Media ROI" sub="Turn compliant social engagement into measurable business impact." icon={TrendingUp} />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   3. INDUSTRIES SECTION (Updated Content)
───────────────────────────────────────────── */
const INDUSTRIES = [
  {
    icon: FlaskConical, color: TEAL, bg: "#f0fdfc",
    title: "Life Sciences",
    desc: "Manage social publishing, MLR review, Veeva workflows, adverse-event monitoring, and audit readiness across pharma, biotech, and medtech teams.",
    cta: "Explore Life Sciences →",
  },
  {
    icon: Landmark, color: "#3B82F6", bg: "#eff6ff",
    title: "Financial Services",
    desc: "Manage governed social publishing with approval workflows, recordkeeping, and compliance controls for regulated financial organizations.",
    cta: "Explore Financial Services →",
  },
  {
    icon: Building2, color: "#8B5CF6", bg: "#f5f3ff",
    title: "Enterprise Teams",
    desc: "Coordinate global teams, brands, and social channels with centralized workflows, permissions, and governance.",
    cta: "Explore Enterprise →",
  },
];

function IndustriesSection() {
  return (
    <section id="industries" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-4 border bg-white"
            style={{ color: TEAL, borderColor: `${TEAL}30` }}>
            <Building2 className="w-3.5 h-3.5" /> Regulated Industry Solutions
          </div>
          <h2 className="text-[1.75rem] sm:text-[2.4rem] font-extrabold text-slate-900 mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Built for Industries Where Compliance Matters
          </h2>
          <p className="text-[1rem] text-slate-500 max-w-xl mx-auto">
            Purpose-configured compliance guardrails tailored to your regulatory requirements.
          </p>
        </div>

        {/* 3 Industry Layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {INDUSTRIES.map(ind => {
            const Icon = ind.icon;
            return (
              <div key={ind.title}
                className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                    style={{ background: ind.bg }}>
                    <Icon className="w-7 h-7" style={{ color: ind.color }} />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-3"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {ind.title}
                  </h3>
                  <p className="text-[14px] text-slate-500 leading-relaxed mb-6">
                    {ind.desc}
                  </p>
                </div>
                <a href="#demo" className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors group-hover:translate-x-1 duration-200 mt-auto pt-4 border-t border-slate-100"
                  style={{ color: ind.color }}>
                  {ind.cta}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   4. PLATFORM SECTION (Updated Content & 6 Capabilities)
───────────────────────────────────────────── */
const PLATFORM_CAPABILITIES = [
  {
    icon: Calendar, color: TEAL, lightBg: "#f0fdfc",
    label: "Social Media Publishing",
    desc: "Plan, create, approve, and publish compliant content across multiple social channels from one centralized platform.",
  },
  {
    icon: Users, color: "#3B82F6", lightBg: "#eff6ff",
    label: "Employee Advocacy",
    desc: "Help employees safely share approved content with AI personalization, controlled sharing, and measurable advocacy programs.",
  },
  {
    icon: BarChart3, color: "#8B5CF6", lightBg: "#f5f3ff",
    label: "Social Analytics",
    desc: "Measure content, campaign, advocacy, and channel performance with centralized analytics and reporting.",
  },
  {
    icon: Eye, color: "#F59E0B", lightBg: "#fffbeb",
    label: "Social Monitoring & AE Management",
    desc: "Monitor conversations, detect potential adverse events, manage approved responses, and route risks to the appropriate teams.",
  },
  {
    icon: Zap, color: "#EC4899", lightBg: "#fdf2f8",
    label: "Compliant Paid Ads",
    desc: "Create, review, approve, and launch governed paid social campaigns through compliant workflows.",
  },
  {
    icon: Target, color: "#EF4444", lightBg: "#fff1f2",
    label: "Prospect Intelligence",
    desc: "Connect social engagement with CRM data to identify prospects, understand buying signals, and support sales teams.",
  },
];

function PlatformSection() {
  return (
    <section id="platform" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-5 border"
            style={{ color: TEAL, borderColor: `${TEAL}30`, background: `${TEAL}0d` }}>
            <Layers className="w-3.5 h-3.5" /> THE MARKETBEAM PLATFORM
          </div>
          <h2 className="text-[1.8rem] sm:text-[2.4rem] lg:text-[2.8rem] font-extrabold text-slate-900 mb-5 leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Manage the Complete Social Media Lifecycle
          </h2>
          <p className="text-[1.05rem] text-slate-500 max-w-2xl mx-auto leading-relaxed">
            From content creation and compliance review to publishing, monitoring, employee advocacy, paid campaigns, analytics, and sales intelligence — manage everything from one governed platform.
          </p>
        </div>

        {/* 6 Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {PLATFORM_CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <div key={cap.label}
                className="bg-slate-50/70 rounded-2xl border border-slate-200/70 p-7 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    style={{ background: cap.lightBg }}>
                    <Icon className="w-6 h-6" style={{ color: cap.color }} />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-3"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {cap.label}
                  </h3>
                  <p className="text-[13.5px] text-slate-500 leading-relaxed mb-6">
                    {cap.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section CTA */}
        <div className="text-center">
          <a href="#demo" className="inline-flex items-center gap-2 text-sm font-bold text-white px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all"
            style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_DARK} 100%)` }}>
            Explore the Platform <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   5. NEW SECTION: VEEVA + MLR WORKFLOW
───────────────────────────────────────────── */
function VeevaWorkflowSection() {
  const veevaLogo = "https://www.vectorlogo.zone/logos/veeva/veeva-icon.svg";

  const workflowSteps = [
    { num: "01", title: "Create", sub: "Draft social content with AI assistance.", icon: Cpu, color: TEAL },
    { num: "02", title: "AI Precheck", sub: "Automated scan for compliance risks.", icon: ShieldAlert, color: "#3B82F6" },
    { num: "03", title: "MLR Review", sub: "Routing to Medical, Legal, & Regulatory.", icon: GitBranch, color: "#8B5CF6" },
    { num: "04", title: "Veeva PromoMats", sub: "Native Vault approval & asset sync.", logo: veevaLogo, color: "#F47721" },
    { num: "05", title: "Approve", sub: "Final sign-off across global teams.", icon: CheckCircle2, color: "#10B981" },
    { num: "06", title: "Publish", sub: "Scheduled multi-channel publishing.", icon: Globe, color: "#EC4899" },
    { num: "07", title: "Monitor", sub: "24/7 AI adverse event detection.", icon: Eye, color: "#EF4444" },
    { num: "08", title: "Audit Trail", sub: "Immutable regulatory compliance log.", icon: Archive, color: "#84CC16" },
  ];

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden" id="compliance">
      {/* Glow backgrounds */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 relative z-10">
        {/* Section Header with Veeva Logo Badge */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full mb-6 border border-orange-500/40 bg-slate-800/90 text-orange-400 shadow-md">
            <div className="w-5 h-5 rounded flex items-center justify-center bg-white p-0.5 shadow-sm">
              <img src={veevaLogo} alt="Veeva" className="w-full h-full object-contain" />
            </div>
            <span>VEEVA PROMOMATS INTEGRATION</span>
          </div>
          <h2 className="text-[2rem] lg:text-[2.8rem] font-extrabold text-white mb-5 leading-tight tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Connect Social Media Directly to Your MLR Workflow
          </h2>
          <p className="text-[1.05rem] text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Move social content through review and approval without disconnected manual processes. MarketBeam connects creation, compliance precheck, MLR review, approval, publishing, monitoring, and audit history in one governed workflow.
          </p>
        </div>

        {/* Integration Architecture Card */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 lg:p-8 shadow-2xl mb-12 backdrop-blur-sm">
          {/* Top Banner: MarketBeam <-> Veeva PromoMats */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-700/60">
            <div className="flex flex-wrap items-center gap-3">
              {/* MarketBeam Logo Card */}
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-md h-10">
                <img src="https://marketbeam.io/wp-content/uploads/2024/10/Untitled-design-15-2.png" alt="MarketBeam" className="h-6 object-contain" />
              </div>

              <span className="text-teal-400 text-sm font-black px-1">⟷</span>

              {/* Native API Integration Badge */}
              <span className="text-teal-300 text-xs font-mono font-extrabold px-3 py-2 rounded-xl bg-teal-500/15 border border-teal-500/40 flex items-center gap-1.5 shadow-sm">
                <Zap className="w-3.5 h-3.5 text-teal-400" />
                <span>Native API Integration</span>
              </span>

              <span className="text-teal-400 text-sm font-black px-1">⟷</span>

              {/* Veeva Vault PromoMats Logo Card */}
              <div className="flex items-center gap-2.5 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-md h-10">
                <img src={veevaLogo} alt="Veeva PromoMats" className="w-6 h-6 object-contain" />
                <span className="text-xs font-extrabold text-slate-900 tracking-tight">Veeva Vault PromoMats</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-full shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Bidirectional Vault Sync Active</span>
            </div>
          </div>

          {/* 8 Workflow Step Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num}
                  className="bg-slate-900/90 border border-slate-700/70 hover:border-teal-500/50 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      {step.logo ? (
                        <img src={step.logo} alt={step.title} className="w-10 h-10 rounded-xl object-contain p-1.5 bg-white border border-slate-700 group-hover:scale-110 transition-transform" />
                      ) : Icon ? (
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-800 border border-slate-700 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" style={{ color: step.color }} />
                        </div>
                      ) : null}
                      <span className="text-[11px] font-black px-2.5 py-0.5 rounded bg-slate-800 text-teal-400 border border-slate-700">
                        {step.num}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-teal-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-[11.5px] text-slate-400 leading-relaxed">
                      {step.sub}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[10.5px] font-semibold text-slate-400">
                    <span>Stage {step.num}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-teal-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action & Trust Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-slate-300">
          {[
            "Direct Veeva Vault Sync",
            "Automated MLR Routing",
            "Immutable Audit Trail",
            "21 CFR Part 11 Compliant"
          ].map(item => (
            <div key={item} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-teal-400" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#demo" className="inline-flex items-center gap-2 text-sm font-bold text-white px-8 py-3.5 rounded-xl shadow-lg transition-all hover:shadow-teal-500/20"
            style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_DARK} 100%)` }}>
            Explore Compliance Workflows <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   6. AI SECTION (Updated Content)
───────────────────────────────────────────── */
function AISection() {
  const steps = [
    { label: "Create", desc: "Create and adapt social content.", color: TEAL },
    { label: "AI Precheck", desc: "Identify potential policy, regulatory, and disclosure issues.", color: "#3B82F6" },
    { label: "Review", desc: "Help reviewers focus on higher-risk content first.", color: "#8B5CF6" },
    { label: "Approve & Publish", desc: "Publish approved content through governed workflows.", color: "#10B981" },
  ];

  const issueList = [
    { label: "High-risk language", icon: AlertTriangle, color: "text-amber-500" },
    { label: "Potential policy violations", icon: ClipboardList, color: "text-rose-500" },
    { label: "Unapproved claims", icon: CheckSquare, color: "text-red-500" },
    { label: "Missing disclosures", icon: Eye, color: "text-blue-500" },
    { label: "Outdated information", icon: Calendar, color: "text-purple-[#8B5CF6]" },
    { label: "Potential compliance risks", icon: ShieldAlert, color: "text-teal-600" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-5 border"
            style={{ color: TEAL, borderColor: `${TEAL}30`, background: `${TEAL}0d` }}>
            <Cpu className="w-3.5 h-3.5" /> AI FOR REGULATED SOCIAL MEDIA
          </div>
          <h2 className="text-[2rem] lg:text-[2.6rem] font-extrabold text-slate-900 mb-5 leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            AI That Helps Teams Create Faster and Review Smarter
          </h2>
          <p className="text-[1.05rem] text-slate-500 max-w-2xl mx-auto leading-relaxed">
            MarketBeam uses AI to support content creation and compliance review while keeping human oversight at the center of regulated workflows.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Workflow Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Governed AI Creation & Review Flow</h3>
            {steps.map((st, i) => (
              <div key={st.label} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold text-xs flex-shrink-0"
                  style={{ background: st.color }}>
                  {i + 1}
                </div>
                <div>
                  <div className="text-base font-extrabold text-slate-900 mb-1">{st.label}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{st.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Precheck Issues List */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/80">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-6">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              Automated AI Precheck Detects:
            </div>
            <div className="grid grid-cols-2 gap-3">
              {issueList.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-2.5 text-xs font-bold text-slate-700 bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm">
                    <Icon className={cn("w-4 h-4 flex-shrink-0", item.color)} />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   7. NEW SECTION: SOCIAL MONITORING
───────────────────────────────────────────── */
function SocialMonitoringSection() {
  const flow = ["Detect", "Review", "Respond", "Document"];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-5 border bg-white text-amber-600 border-amber-200">
            <Eye className="w-3.5 h-3.5" /> RISK & ADVERSE EVENT MANAGEMENT
          </div>
          <h2 className="text-[1.8rem] sm:text-[2.4rem] font-extrabold text-slate-900 mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Turn Social Monitoring Into a Compliance Workflow
          </h2>
          <p className="text-[1.05rem] text-slate-500 leading-relaxed">
            Identify important social activity before it becomes a regulatory risk. Detect potential adverse events, route activity to compliance or pharmacovigilance teams, manage governed responses, and maintain centralized records.
          </p>
        </div>

        {/* Workflow */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
          {flow.map((item, idx) => (
            <div key={item} className="flex items-center gap-4">
              <div className="bg-white rounded-xl border border-slate-200 px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm">
                {item}
              </div>
              {idx < flow.length - 1 && (
                <ChevronRight className="w-4 h-4 text-slate-400 hidden sm:block" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#demo" className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors">
            Explore Social Monitoring <ArrowRight className="w-3.5 h-3.5" style={{ color: TEAL }} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   8. NEW SECTION: COMPLIANT PAID ADS
───────────────────────────────────────────── */
function PaidAdsSection() {
  const steps = ["Create", "Review", "Approve", "Launch"];

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-5 border bg-pink-50 text-pink-600 border-pink-200">
            <Zap className="w-3.5 h-3.5" /> GOVERNED PAID SOCIAL CAMPAIGNS
          </div>
          <h2 className="text-[1.8rem] sm:text-[2.4rem] font-extrabold text-slate-900 mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Bring Compliance Into Paid Social Campaigns
          </h2>
          <p className="text-[1.05rem] text-slate-500 leading-relaxed">
            Create and manage paid social campaigns without separating advertising from your compliance workflow. Review campaign content, maintain approved versions, and move approved campaigns into supported advertising platforms.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
          {steps.map((item, idx) => (
            <div key={item} className="flex items-center gap-4">
              <div className="bg-slate-50 rounded-xl border border-slate-200 px-6 py-3.5 text-sm font-bold text-slate-800">
                {item}
              </div>
              {idx < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-slate-400 hidden sm:block" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#demo" className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors">
            Explore Ads Manager Integration <ArrowRight className="w-3.5 h-3.5" style={{ color: TEAL }} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   9. NEW SECTION: EMPLOYEE ADVOCACY
───────────────────────────────────────────── */
function EmployeeAdvocacySection() {
  const highlights = [
    "Approved Content Library",
    "AI Personalization",
    "Controlled Sharing",
    "Campaign Management",
    "Advocacy Analytics",
    "Employee Engagement"
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-5 border bg-blue-50 text-blue-600 border-blue-200">
            <Users className="w-3.5 h-3.5" /> EMPLOYEE ADVOCACY
          </div>
          <h2 className="text-[1.8rem] sm:text-[2.4rem] font-extrabold text-slate-900 mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Turn Employees Into Trusted Brand Advocates
          </h2>
          <p className="text-[1.05rem] text-slate-500 leading-relaxed">
            Give employees an easier way to share approved brand content while marketing teams maintain control over messaging, compliance, and performance.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto">
          {highlights.map(item => (
            <div key={item} className="bg-white rounded-xl p-4 border border-slate-200/80 flex items-center gap-3 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span className="text-xs font-bold text-slate-800">{item}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#demo" className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors">
            Explore Employee Advocacy <ArrowRight className="w-3.5 h-3.5" style={{ color: TEAL }} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   10. NEW SECTION: PROSPECT INTELLIGENCE
───────────────────────────────────────────── */
function ProspectIntelligenceSection() {
  const steps = [
    "Social Engagement",
    "Prospect Identification",
    "CRM Intelligence",
    "Sales Follow-Up"
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-5 border bg-red-50 text-red-600 border-red-200">
            <Target className="w-3.5 h-3.5" /> PROSPECT INTELLIGENCE
          </div>
          <h2 className="text-[1.8rem] sm:text-[2.4rem] font-extrabold text-slate-900 mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Turn Social Engagement Into Sales Intelligence
          </h2>
          <p className="text-[1.05rem] text-slate-500 leading-relaxed">
            Identify prospects engaging with social content and connect those interactions with CRM data to give sales teams stronger context and buying signals.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
          {steps.map((item, idx) => (
            <div key={item} className="flex items-center gap-4">
              <div className="bg-slate-50 rounded-xl border border-slate-200 px-6 py-3.5 text-sm font-bold text-slate-800">
                {item}
              </div>
              {idx < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-slate-400 hidden sm:block" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#demo" className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors">
            Explore Prospect Intelligence <ArrowRight className="w-3.5 h-3.5" style={{ color: TEAL }} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   11. INTEGRATIONS SECTION (Updated Content with Logos)
───────────────────────────────────────────── */
const INTEGRATIONS_LIST = [
  { name: "LinkedIn", cat: "Social Network", color: "#0A66C2", logo: "https://www.vectorlogo.zone/logos/linkedin/linkedin-icon.svg" },
  { name: "Facebook", cat: "Social Network", color: "#1877F2", logo: "https://cdn.simpleicons.org/facebook/1877F2" },
  { name: "Instagram", cat: "Social Network", color: "#E4405F", logo: "https://cdn.simpleicons.org/instagram/E4405F" },
  { name: "X", cat: "Social Network", color: "#000000", logo: "https://cdn.simpleicons.org/x/000000" },
  { name: "TikTok", cat: "Social Network", color: "#000000", logo: "https://cdn.simpleicons.org/tiktok/000000" },
  { name: "YouTube", cat: "Video Platform", color: "#FF0000", logo: "https://cdn.simpleicons.org/youtube/FF0000" },
  { name: "Reddit", cat: "Community", color: "#FF4500", logo: "https://cdn.simpleicons.org/reddit/FF4500" },
  { name: "Veeva PromoMats", cat: "MLR & Compliance", color: "#F47721", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLpyeI6CkQSisxZqpK1sUQ9pGXJpSmjwxwiDhQoMSDLQ&s=10" },
  { name: "HubSpot", cat: "CRM & Marketing", color: "#FF7A59", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "Slack", cat: "Collaboration", color: "#4A154B", logo: "https://www.vectorlogo.zone/logos/slack/slack-icon.svg" },
  { name: "Google Analytics", cat: "Web Analytics", color: "#E37400", logo: "https://cdn.simpleicons.org/googleanalytics/E37400" },
  { name: "LinkedIn Ads", cat: "Ad Manager", color: "#0A66C2", logo: "https://www.vectorlogo.zone/logos/linkedin/linkedin-icon.svg" },
  { name: "Meta Ads", cat: "Ad Manager", color: "#0668E1", logo: "https://cdn.simpleicons.org/meta/0668E1" },
];

function IntegrationLogoCard({ intg }: { intg: typeof INTEGRATIONS_LIST[0] }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-center gap-3.5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {intg.logo && !imgError ? (
        <img
          src={intg.logo}
          alt={intg.name}
          onError={() => setImgError(true)}
          className="w-10 h-10 rounded-xl flex-shrink-0 object-contain p-1 border border-slate-100 bg-slate-50/50 shadow-sm"
        />
      ) : (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-extrabold flex-shrink-0 shadow-sm"
          style={{ background: intg.color }}>
          {intg.name[0]}
        </div>
      )}
      <div className="min-w-0">
        <div className="text-[13px] font-bold text-slate-800 truncate">{intg.name}</div>
        <div className="text-[10.5px] text-slate-400 font-semibold">{intg.cat}</div>
      </div>
    </div>
  );
}

function IntegrationsSection() {
  return (
    <section id="integrations" className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-5 border bg-white"
            style={{ color: TEAL, borderColor: `${TEAL}30` }}>
            <Zap className="w-3.5 h-3.5" /> ENTERPRISE STACK INTEGRATIONS
          </div>
          <h2 className="text-[1.8rem] sm:text-[2.4rem] font-extrabold text-slate-900 mb-5 leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Connect MarketBeam With Your Existing Technology Stack
          </h2>
          <p className="text-[1.05rem] text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Connect social networks, compliance systems, advertising platforms, collaboration tools, analytics, and CRM workflows.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {INTEGRATIONS_LIST.map(intg => (
            <IntegrationLogoCard key={intg.name} intg={intg} />
          ))}
        </div>

        <div className="text-center">
          <a href="#demo" className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors">
            Explore Integrations <ArrowRight className="w-3.5 h-3.5" style={{ color: TEAL }} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   12. NEW SECTION: WHY MARKETBEAM
───────────────────────────────────────────── */
function WhyMarketBeamSection() {
  const traditional = [
    "Publishing-first",
    "Separate compliance processes",
    "Manual review handoffs",
    "Disconnected MLR workflows",
    "Basic social monitoring",
    "Separate advocacy workflows",
    "Limited regulatory context",
  ];

  const marketbeam = [
    "Compliance-first social management",
    "Integrated review workflows",
    "Governed publishing",
    "MLR workflow support",
    "Social monitoring & AE management",
    "Employee advocacy",
    "Paid ads compliance",
    "Audit-ready reporting",
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-100" id="why-marketbeam">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-5 border"
            style={{ color: TEAL, borderColor: `${TEAL}30`, background: `${TEAL}0d` }}>
            <Award className="w-3.5 h-3.5" /> WHY MARKETBEAM
          </div>
          <h2 className="text-[1.8rem] sm:text-[2.4rem] font-extrabold text-slate-900 mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Built Differently for Regulated Social Media
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Traditional Tools */}
          <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200/80">
            <h3 className="text-base font-extrabold text-slate-500 uppercase tracking-wider mb-6 pb-4 border-b border-slate-200">
              Traditional Social Media Tools
            </h3>
            <div className="space-y-3">
              {traditional.map(item => (
                <div key={item} className="flex items-center gap-2.5 text-xs font-semibold text-slate-500">
                  <div className="w-2 h-2 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MarketBeam */}
          <div className="bg-slate-900 rounded-2xl p-7 border border-teal-500/40 text-white shadow-xl">
            <h3 className="text-base font-extrabold text-teal-400 uppercase tracking-wider mb-6 pb-4 border-b border-slate-800">
              MarketBeam
            </h3>
            <div className="space-y-3">
              {marketbeam.map(item => (
                <div key={item} className="flex items-center gap-2.5 text-xs font-bold text-white">
                  <Check className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>{item}</span>
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
   13. CUSTOMER PROOF SECTION (With Video Customer Reviews & Case Studies)
───────────────────────────────────────────── */
const CASE_STUDIES = [
  {
    industry: "Life Sciences", company: "Global Biotech Leader", color: TEAL,
    challenge: "50-person MLR team manually reviewing every social post across 12 therapeutic areas — review cycles taking 3–4 weeks and delaying time-sensitive launches.",
    solution: "MarketBeam automated MLR routing, version control, and audit trails, giving all reviewers a single workspace with AI pre-screening that flags issues before human review.",
    results: ["67% faster MLR review cycles", "Zero compliance violations in 18 months", "Operational efficiency gains"],
    author: "VP, Digital Strategy & Innovation",
  },
  {
    industry: "Financial Services", company: "Top Investment Institution", color: "#3B82F6",
    challenge: "Decentralized social media activity across financial advisors creating supervision gaps, archiving failures, and growing regulatory exposure.",
    solution: "Deployed MarketBeam with compliant pre-approval workflows, real-time supervision dashboards, and content archiving across all channels.",
    results: ["Compliant advisor communications", "Unified team management", "Increased approved content volume"],
    author: "Chief Compliance Officer",
  },
  {
    industry: "Pharmaceuticals", company: "Enterprise Pharma Organization", color: "#8B5CF6",
    challenge: "Multiple global teams publishing content without centralized regulatory oversight, creating compliance risk and brand inconsistency.",
    solution: "Global MarketBeam rollout with market-specific approval workflows, approved content libraries, and a centralized compliance dashboard.",
    results: ["Global affiliates on one platform", "Reduction in unapproved content", "Unified compliance oversight"],
    author: "Global Head of Digital, Corporate Affairs",
  },
];

const VIDEO_REVIEWS = [
  {
    id: "video-1",
    title: "Accelerating MLR Approvals in Life Sciences",
    speaker: "VP, Digital Strategy & Innovation",
    company: "Global Biotech Leader",
    industry: "Life Sciences",
    duration: "2:15",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    quote: "MarketBeam transformed our MLR process from our biggest bottleneck into a genuine competitive advantage.",
  },
  {
    id: "video-2",
    title: "100% FINRA Compliance Across Advisor Networks",
    speaker: "Chief Compliance Officer",
    company: "Top Investment Institution",
    industry: "Financial Services",
    duration: "1:45",
    thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    quote: "We went from reactive compliance fire-fighting to proactive governance in under 90 days.",
  },
  {
    id: "video-3",
    title: "Governing Global Social Presence",
    speaker: "Global Head of Digital",
    company: "Enterprise Pharma Organization",
    industry: "Pharmaceuticals",
    duration: "3:10",
    thumbnail: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    quote: "For the first time, we have complete visibility and control over our global social presence in every market.",
  }
];

function CaseStudiesSection() {
  const [activeVideo, setActiveVideo] = useState<typeof VIDEO_REVIEWS[0] | null>(null);

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100" id="customer-proof">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-5 border bg-white"
            style={{ color: TEAL, borderColor: `${TEAL}30` }}>
            <Star className="w-3.5 h-3.5" /> CUSTOMER PROOF
          </div>
          <h2 className="text-[1.8rem] sm:text-[2.4rem] font-extrabold text-slate-900 mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Trusted by Teams Managing Social Media at Scale
          </h2>
          <p className="text-[1.05rem] text-slate-500 max-w-2xl mx-auto leading-relaxed">
            See how organizations use MarketBeam to improve social publishing, employee advocacy, compliance workflows, and digital engagement.
          </p>
        </div>

        {/* Video Customer Reviews Sub-section */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-6 justify-center">
            <Video className="w-4 h-4 text-teal-600" />
            <span>Video Customer Reviews</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {VIDEO_REVIEWS.map(video => (
              <div key={video.id}
                onClick={() => setActiveVideo(video)}
                className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between">
                {/* Video Thumbnail with Play Button Overlay */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                  
                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border border-white/20">
                    {video.duration}
                  </div>

                  {/* Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-teal-500/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-teal-400 transition-all duration-300">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Industry tag */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white/20 backdrop-blur-md text-white border border-white/20">
                      {video.industry}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2 group-hover:text-teal-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-[12px] italic text-slate-500 leading-relaxed mb-4">
                      "{video.quote}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-extrabold text-slate-800">{video.speaker}</div>
                      <div className="text-[10px] text-slate-400 font-semibold">{video.company}</div>
                    </div>
                    <span className="text-xs font-bold text-teal-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Watch <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Written Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          {CASE_STUDIES.map(cs => (
            <div key={cs.company}
              className="bg-white rounded-2xl border border-slate-200/80 p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg"
                    style={{ color: cs.color, background: `${cs.color}15` }}>
                    {cs.industry}
                  </span>
                  <span className="text-[12px] text-slate-400 font-semibold">{cs.company}</span>
                </div>

                <div className="mb-4">
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400 mb-1">Challenge</div>
                  <p className="text-[12.5px] text-slate-600 leading-relaxed">{cs.challenge}</p>
                </div>

                <div className="mb-4">
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400 mb-1">Solution</div>
                  <p className="text-[12.5px] text-slate-600 leading-relaxed">{cs.solution}</p>
                </div>

                <div className="mb-6 pt-3 border-t border-slate-100">
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400 mb-2">Results</div>
                  <div className="space-y-1.5">
                    {cs.results.map(r => (
                      <div key={r} className="flex items-center gap-2 text-[12px] font-bold text-slate-800">
                        <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-bold text-slate-500 pt-3 border-t border-slate-100">
                — {cs.author}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#demo" className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors">
            Explore Customer Stories <ArrowRight className="w-3.5 h-3.5" style={{ color: TEAL }} />
          </a>
        </div>
      </div>

      {/* Video Modal Popup */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
          onClick={() => setActiveVideo(null)}>
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
                <Video className="w-4 h-4" />
                <span>Customer Video Review</span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player Box */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img src={activeVideo.thumbnail} alt={activeVideo.title} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-xl animate-pulse">
                  <Play className="w-7 h-7 fill-white ml-1" />
                </div>
                <span className="text-xs font-bold text-white bg-slate-900/80 px-3 py-1 rounded-full border border-white/20">
                  Video Review Playing · {activeVideo.duration}
                </span>
              </div>
            </div>

            {/* Footer details */}
            <div className="p-6 bg-slate-900">
              <h3 className="text-lg font-bold text-white mb-2">{activeVideo.title}</h3>
              <p className="text-sm italic text-slate-300 leading-relaxed mb-4">"{activeVideo.quote}"</p>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
                <span className="font-bold text-white">{activeVideo.speaker}</span>
                <span>{activeVideo.company} ({activeVideo.industry})</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─────────────────────────────────────────────
   14. NEW SECTION: SECURITY & GOVERNANCE
───────────────────────────────────────────── */
function SecurityGovernanceSection() {
  const highlights = [
    "Role-based access",
    "Approval controls",
    "Audit trails",
    "Governed publishing",
    "Data protection",
    "Enterprise permissions",
    "Centralized administration"
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-5 border bg-white"
            style={{ color: TEAL, borderColor: `${TEAL}30` }}>
            <ShieldCheck className="w-3.5 h-3.5" /> SECURITY & COMPLIANCE
          </div>
          <h2 className="text-[1.8rem] sm:text-[2.4rem] font-extrabold text-slate-900 mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Enterprise Governance for Regulated Teams
          </h2>
          <p className="text-[1.05rem] text-slate-500 leading-relaxed">
            Control who can create, review, approve, and publish social content across teams, brands, and regions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 max-w-5xl mx-auto">
          {highlights.map(item => (
            <div key={item} className="bg-slate-50 rounded-xl p-4 border border-slate-200/70 flex items-center gap-3">
              <CheckSquare className="w-4 h-4 text-teal-600 flex-shrink-0" />
              <span className="text-xs font-bold text-slate-800">{item}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#demo" className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors">
            Explore Security & Compliance <ArrowRight className="w-3.5 h-3.5" style={{ color: TEAL }} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   15. AWARDS SECTION (Keep Current Verified Awards)
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
  ];

  const doubledLogos = [...logos, ...logos];

  return (
    <section className="py-14 bg-white border-b border-slate-100 overflow-hidden">
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-scroll {
          display: flex;
          width: max-content;
          animation: marqueeScroll 25s linear infinite;
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-8">
          Trusted by leading enterprise organizations
        </p>
      </div>

      {/* Infinite Horizontal Logo Marquee */}
      <div className="relative w-full overflow-hidden mb-12 py-2">
        {/* Left & Right gradient edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-scroll items-center gap-12 sm:gap-16">
          {doubledLogos.map((logo, idx) => (
            <a key={`${logo.name}-${idx}`} href={logo.link} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 transition-all duration-300 hover:opacity-100 opacity-75 hover:scale-105">
              <img src={logo.url} alt={logo.name} className="h-10 sm:h-12 object-contain" title={logo.name} />
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-8">
          Recognized for Innovation in Regulated Social Media
        </p>

        <div className="flex justify-center">
          <img src="https://marketbeam.io/wp-content/uploads/2026/05/Awards-new-2026.jpeg" alt="Awards & Certifications" className="max-w-full h-auto rounded-lg" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   16. NEW SECTION: RESOURCES (Updated to 3 Primary)
───────────────────────────────────────────── */
const PRIMARY_RESOURCES = [
  { icon: Shield, cat: "Compliance Guide", color: TEAL, title: "FDA & FINRA Social Media Guidance: What Regulated Marketers Need to Know", read: "12 min" },
  { icon: Video, cat: "Webinar", color: "#3B82F6", title: "AI & MLR Workflows in Regulated Social Media: Navigating Governance & Compliance", read: "45 min" },
  { icon: FileBarChart, cat: "Customer Story", color: "#8B5CF6", title: "How Enterprise Life Sciences Teams Scale Social Publishing Compliantly", read: "10 min" },
];

function ResourcesSection() {
  return (
    <section id="resources" className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-4 border bg-white"
            style={{ color: TEAL, borderColor: `${TEAL}30` }}>
            <BookOpen className="w-3.5 h-3.5" /> RESOURCES
          </div>
          <h2 className="text-[1.8rem] sm:text-[2.4rem] font-extrabold text-slate-900 mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Learn How Leading Teams Manage Regulated Social Media
          </h2>
          <p className="text-[1.05rem] text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Explore practical guidance on social media compliance, MLR workflows, employee advocacy, AI, monitoring, and regulated digital marketing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {PRIMARY_RESOURCES.map(r => {
            const Icon = r.icon;
            return (
              <a key={r.title} href="#demo"
                className="group rounded-2xl border border-slate-200/80 bg-white p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${r.color}15` }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: r.color }} />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: r.color }}>
                      {r.cat}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-800 leading-snug mb-4 group-hover:text-[#09A99E] transition-colors">
                    {r.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                  <span className="text-[11px] text-slate-400 font-semibold">{r.read} read</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#09A99E] group-hover:translate-x-1 transition-all" />
                </div>
              </a>
            );
          })}
        </div>

        <div className="text-center">
          <a href="#demo" className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors">
            Explore Resources <ArrowRight className="w-3.5 h-3.5" style={{ color: TEAL }} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   17. FAQ SECTION (Updated Accordion Questions)
───────────────────────────────────────────── */
const FAQS = [
  {
    q: "How does MarketBeam support MLR review workflows?",
    a: "MarketBeam provides fully configurable multi-step review workflows that route content through Medical, Legal, and Regulatory teams in sequence or parallel. Our automated AI precheck identifies potential disclosure, policy, and compliance risks prior to human review, while immutable audit trails log every edit, comment, and sign-off.",
  },
  {
    q: "How does MarketBeam integrate with Veeva PromoMats?",
    a: "MarketBeam offers a seamless integration with Veeva Vault PromoMats. Approved promotional materials move directly from Veeva into MarketBeam's governed social publishing queue, connecting creation, compliance precheck, MLR review, Veeva approval, publishing, monitoring, and audit history in one workflow.",
  },
  {
    q: "How does MarketBeam manage adverse events from social media?",
    a: "MarketBeam's social monitoring engine runs 24/7 AI detection to identify potential adverse events and regulatory risk signals in real-time. Flagged interactions are immediately routed to compliance or pharmacovigilance teams with governed response templates and complete audit logging.",
  },
  {
    q: "How does Employee Advocacy maintain governance and compliance?",
    a: "Employee advocacy operates with strict governance guardrails. Employees share content exclusively from a pre-approved, compliance-cleared library. Marketing and compliance teams retain full control over messaging, role permissions, and channel distribution while tracking reach and engagement.",
  },
  {
    q: "Which social networks does MarketBeam support?",
    a: "MarketBeam supports all major social networks and advertising platforms including LinkedIn, Facebook, Instagram, X (Twitter), TikTok, YouTube, Reddit, as well as governed paid campaigns via LinkedIn Ads and Meta Ads Manager.",
  },
  {
    q: "How is MarketBeam different from traditional social media management platforms?",
    a: "Traditional social tools are built publishing-first with manual or separate compliance processes. MarketBeam is architected compliance-first, unifying MLR review workflows, Veeva integrations, adverse event monitoring, employee advocacy, and audit-ready reporting into one governed platform.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.4rem] font-extrabold text-slate-900 mb-4 tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Frequently Asked Questions
          </h2>
          <p className="text-[1rem] text-slate-500">
            Answers to key questions about MarketBeam's compliance, integrations, and capabilities.
          </p>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i}
              className={cn(
                "bg-slate-50 rounded-2xl border overflow-hidden transition-all duration-200",
                open === i ? "border-[#09A99E]/40 shadow-md bg-white" : "border-slate-200/70 hover:border-slate-300"
              )}>
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}>
                <span className="text-[14.5px] font-bold text-slate-800 leading-snug">{faq.q}</span>
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform",
                  open === i ? "rotate-180" : ""
                )}
                  style={{ background: open === i ? `${TEAL}18` : "#e2e8f0" }}>
                  <ChevronDown className="w-3.5 h-3.5" style={{ color: open === i ? TEAL : "#64748b" }} />
                </div>
              </button>
              {open === i && (
                <div className="px-6 pb-6 pt-1 border-t border-slate-100">
                  <p className="text-[13.5px] text-slate-600 leading-relaxed">{faq.a}</p>
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
   18. FINAL CTA SECTION (Updated Copy)
───────────────────────────────────────────── */
function CTASection() {
  return (
    <section id="demo" className="py-28 relative overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${NAVY} 0%, #0a1628 100%)` }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-25"
          style={{ background: `radial-gradient(ellipse, ${TEAL}, transparent)` }} />
      </div>

      <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full mb-8 border border-white/15"
          style={{ color: TEAL, background: `${TEAL}18` }}>
          <Zap className="w-3.5 h-3.5" /> GET STARTED
        </div>

        <h2 className="text-[2.2rem] lg:text-[2.8rem] xl:text-[3.2rem] font-extrabold text-white mb-6 leading-[1.1] tracking-tight"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Ready to Manage Social Media Without Compromising Compliance?
        </h2>

        <p className="text-[1.1rem] text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
          See how MarketBeam can connect content creation, approvals, publishing, monitoring, employee advocacy, analytics, and compliance workflows in one platform.
        </p>

        <div className="flex justify-center mb-10">
          <a href="#"
            className="group inline-flex items-center justify-center gap-2.5 text-[15px] font-extrabold text-white px-9 py-4 rounded-xl shadow-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(9,169,158,0.5)]"
            style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_DARK} 100%)` }}>
            Book A Demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER (Untouched Header/Footer Design)
───────────────────────────────────────────── */
function Footer() {
  const cols = [
    {
      heading: "Platform",
      links: ["Social Publishing", "Employee Advocacy", "Social Analytics", "Social Monitoring", "Prospect Intelligence", "Paid Ads"],
    },
    {
      heading: "Industries",
      links: ["Life Sciences", "Financial Services", "Enterprise Teams"],
    },
    {
      heading: "Resources",
      links: ["Compliance Guide", "Webinars", "Customer Stories", "Knowledge Base"],
    },
    {
      heading: "Company",
      links: ["About MarketBeam", "Contact Us", "Security & Trust"],
    },
  ];

  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 pt-12 sm:pt-14 lg:pt-16 pb-8 sm:pb-10">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-10 mb-14">
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
          </div>

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

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11.5px] text-slate-400 font-medium">
            ©2026 MarketBeam, Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Security"].map(link => (
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
   APP MAIN ENTRY
───────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}>
      <Nav />
      <main>
        <HeroSection />
        <TrustedBySection />
        <StatsSection />
        <IndustriesSection />
        <PlatformSection />
        <VeevaWorkflowSection />
        <AISection />
        <SocialMonitoringSection />
        <PaidAdsSection />
        <EmployeeAdvocacySection />
        <ProspectIntelligenceSection />
        <IntegrationsSection />
        <WhyMarketBeamSection />
        <CaseStudiesSection />
        <SecurityGovernanceSection />
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
