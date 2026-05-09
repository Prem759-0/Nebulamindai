import { useState, useEffect, useRef } from "react";
import {
  Zap, Shield, Brain, BarChart3, Globe, Layers,
  ChevronDown, Star, ArrowRight, Check, Sparkles,
  Play, Users, TrendingUp, Database, Cpu, Lock
} from "lucide-react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#03030a;--bg2:#07071a;--v:#7c3aed;--c:#0891b2;--g:#10b981;--a:#f59e0b;
  --pk:#ec4899;--tx:#f1f5f9;--mu:#64748b;--gl:rgba(255,255,255,0.04);
  --bd:rgba(255,255,255,0.08);
}
body{background:var(--bg);color:var(--tx);font-family:'Outfit',sans-serif;overflow-x:hidden}
.sy{font-family:'Syne',sans-serif}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--v);border-radius:3px}

.nav{position:fixed;top:0;left:0;right:0;z-index:999;padding:18px 48px;display:flex;
  align-items:center;justify-content:space-between;
  backdrop-filter:blur(24px);background:rgba(3,3,10,0.85);
  border-bottom:1px solid var(--bd);transition:all .3s}
.nav-logo{font-family:'Syne',sans-serif;font-weight:800;font-size:20px;
  background:linear-gradient(135deg,#a78bfa,#67e8f9);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-0.5px}
.nav-links{display:flex;gap:36px;list-style:none}
.nav-links a{color:var(--mu);text-decoration:none;font-size:14px;font-weight:500;transition:color .2s}
.nav-links a:hover{color:var(--tx)}
.nav-cta{background:linear-gradient(135deg,var(--v),#a855f7);padding:10px 22px;
  border-radius:100px;font-size:14px;font-weight:600;color:#fff;border:none;cursor:pointer;
  transition:all .3s;box-shadow:0 0 24px rgba(124,58,237,.35)}
.nav-cta:hover{transform:translateY(-1px);box-shadow:0 0 40px rgba(124,58,237,.55)}

.hero{position:relative;min-height:100vh;display:flex;align-items:center;
  justify-content:center;text-align:center;overflow:hidden;padding:140px 20px 80px}
canvas.bg{position:absolute;inset:0;width:100%;height:100%}
.glow1{position:absolute;top:15%;left:50%;transform:translateX(-50%);
  width:700px;height:500px;
  background:radial-gradient(ellipse,rgba(124,58,237,.22) 0%,transparent 68%);pointer-events:none}
.glow2{position:absolute;top:45%;left:25%;width:350px;height:350px;
  background:radial-gradient(ellipse,rgba(8,145,178,.14) 0%,transparent 68%);pointer-events:none}
.glow3{position:absolute;top:30%;right:20%;width:250px;height:250px;
  background:radial-gradient(ellipse,rgba(236,72,153,.1) 0%,transparent 68%);pointer-events:none}
.hero-inner{position:relative;z-index:1;max-width:820px}
.badge{display:inline-flex;align-items:center;gap:8px;padding:8px 18px;
  background:rgba(124,58,237,.12);border:1px solid rgba(124,58,237,.35);
  border-radius:100px;font-size:13px;color:#a78bfa;margin-bottom:36px}
.badge-dot{width:7px;height:7px;background:#a78bfa;border-radius:50%;
  animation:pulse 2s infinite}
.htitle{font-family:'Syne',sans-serif;font-size:clamp(44px,8vw,90px);
  font-weight:800;line-height:1.04;margin-bottom:6px}
.hgrad{background:linear-gradient(135deg,#ede9fe 25%,#a78bfa 58%,#67e8f9 90%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent}
.htyped{color:#67e8f9}
.hcursor{color:#67e8f9;animation:blink 1s infinite}
.hdesc{font-size:18px;color:var(--mu);line-height:1.75;margin:26px auto 44px;max-width:580px}
.actions{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
.btn-p{background:linear-gradient(135deg,var(--v),#a855f7);padding:16px 34px;
  border-radius:100px;font-size:15px;font-weight:600;color:#fff;border:none;cursor:pointer;
  display:inline-flex;align-items:center;gap:9px;transition:all .3s;
  box-shadow:0 0 32px rgba(124,58,237,.45)}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 0 56px rgba(124,58,237,.65)}
.btn-s{background:transparent;padding:16px 34px;border-radius:100px;font-size:15px;
  font-weight:600;color:var(--tx);border:1px solid var(--bd);cursor:pointer;
  display:inline-flex;align-items:center;gap:9px;transition:all .3s}
.btn-s:hover{border-color:rgba(255,255,255,.22);background:var(--gl);transform:translateY(-2px)}
.scroll-hint{position:absolute;bottom:36px;left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:7px;
  color:var(--mu);font-size:12px;animation:floaty 3s ease-in-out infinite}

.mq{overflow:hidden;border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);
  padding:18px 0;background:rgba(255,255,255,.01)}
.mq-track{display:flex;gap:52px;animation:marquee 28s linear infinite;width:max-content}
.mq-item{display:flex;align-items:center;gap:12px;color:var(--mu);
  font-size:13px;font-weight:500;white-space:nowrap}
.mq-dot{width:4px;height:4px;border-radius:50%;background:var(--v)}

.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;
  max-width:1100px;margin:0 auto;padding:0 40px}
.stat{background:var(--gl);border:1px solid var(--bd);padding:40px 28px;text-align:center;
  position:relative;overflow:hidden}
.stat::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,var(--ac,var(--v)),transparent)}
.stat-n{font-family:'Syne',sans-serif;font-size:50px;font-weight:800;line-height:1;margin-bottom:8px}
.stat-l{color:var(--mu);font-size:14px}

.sec{padding:100px 40px;max-width:1200px;margin:0 auto}
.sec-lbl{color:var(--v);font-size:12px;font-weight:600;text-transform:uppercase;
  letter-spacing:3.5px;margin-bottom:16px}
.sec-title{font-family:'Syne',sans-serif;font-size:clamp(30px,4vw,52px);
  font-weight:800;line-height:1.12;margin-bottom:18px}
.sec-desc{color:var(--mu);font-size:17px;line-height:1.72;max-width:560px}

.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:64px}
.feat{background:var(--gl);border:1px solid var(--bd);padding:40px 32px;
  transition:all .4s;position:relative;overflow:hidden;cursor:default}
.feat::after{content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,var(--fc,transparent) 0%,transparent 60%);
  opacity:0;transition:opacity .4s}
.feat:hover{border-color:rgba(255,255,255,.15);transform:translateY(-5px)}
.feat:hover::after{opacity:.06}
.feat-icon{width:52px;height:52px;border-radius:14px;display:flex;
  align-items:center;justify-content:center;margin-bottom:24px}
.feat-t{font-family:'Syne',sans-serif;font-size:20px;font-weight:700;margin-bottom:12px}
.feat-d{color:var(--mu);font-size:15px;line-height:1.68}

.demo-win{background:rgba(5,5,20,.95);border:1px solid var(--bd);border-radius:16px;
  overflow:hidden;margin-top:56px}
.demo-bar{background:rgba(255,255,255,.04);padding:13px 20px;display:flex;
  align-items:center;gap:8px;border-bottom:1px solid var(--bd)}
.demo-dot{width:12px;height:12px;border-radius:50%}
.demo-url{color:var(--mu);font-size:13px;margin-left:8px;font-family:monospace}
.demo-body{padding:32px;display:grid;grid-template-columns:1fr 1fr;gap:16px}
.dm{background:var(--gl);border:1px solid var(--bd);border-radius:12px;padding:22px}
.dm-lbl{color:var(--mu);font-size:11px;text-transform:uppercase;letter-spacing:1.5px;
  margin-bottom:10px}
.dm-val{font-family:'Syne',sans-serif;font-size:34px;font-weight:700;line-height:1}
.dm-bar{height:6px;background:rgba(255,255,255,.07);border-radius:3px;margin-top:14px;overflow:hidden}
.dm-fill{height:100%;border-radius:3px;animation:fillbar 2.2s 0.8s both}
@keyframes fillbar{from{width:0}}

.price-tog{display:flex;align-items:center;gap:12px;justify-content:center;margin-bottom:56px}
.tog{padding:8px 22px;border-radius:100px;border:1px solid var(--bd);background:transparent;
  color:var(--mu);cursor:pointer;font-size:14px;font-weight:500;transition:all .2s;font-family:'Outfit',sans-serif}
.tog.on{background:var(--v);color:#fff;border-color:var(--v)}
.save{background:rgba(16,185,129,.13);color:#34d399;border:1px solid rgba(16,185,129,.28);
  border-radius:100px;padding:4px 12px;font-size:12px;font-weight:500}
.price-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px}
.plan{background:var(--gl);border:1px solid var(--bd);padding:40px 32px;
  position:relative;transition:all .4s}
.plan.pop{background:rgba(8,145,178,.06);border-color:rgba(8,145,178,.3);transform:scale(1.025)}
.plan:hover{transform:translateY(-5px)}
.plan.pop:hover{transform:scale(1.025) translateY(-5px)}
.pop-tag{position:absolute;top:-13px;left:50%;transform:translateX(-50%);
  background:linear-gradient(135deg,#0891b2,#06b6d4);color:#fff;
  padding:5px 18px;border-radius:100px;font-size:12px;font-weight:600;white-space:nowrap}
.plan-n{font-family:'Syne',sans-serif;font-size:22px;font-weight:700;margin-bottom:6px}
.plan-p{font-family:'Syne',sans-serif;font-size:54px;font-weight:800;line-height:1;margin:18px 0 4px}
.plan-per{color:var(--mu);font-size:14px;margin-bottom:10px}
.plan-tok{color:var(--mu);font-size:14px;padding-bottom:28px;margin-bottom:28px;
  border-bottom:1px solid var(--bd)}
.plan-f{display:flex;align-items:flex-start;gap:10px;font-size:14px;margin-bottom:12px;color:var(--mu)}
.plan-btn{width:100%;padding:14px;border-radius:12px;font-size:15px;font-weight:600;
  cursor:pointer;margin-top:28px;border:none;transition:all .3s;font-family:'Outfit',sans-serif}

.testi-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;margin-top:64px}
.testi{background:var(--gl);border:1px solid var(--bd);padding:36px;transition:all .3s}
.testi:hover{border-color:rgba(255,255,255,.14);transform:translateY(-3px)}
.testi-stars{display:flex;gap:4px;margin-bottom:18px}
.testi-txt{font-size:15px;line-height:1.72;color:#cbd5e1;margin-bottom:24px;font-style:italic}
.testi-auth{display:flex;align-items:center;gap:12px}
.testi-av{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;
  justify-content:center;font-weight:700;font-size:14px;flex-shrink:0}
.testi-name{font-weight:600;font-size:15px}
.testi-role{color:var(--mu);font-size:13px}

.faq-list{margin-top:64px;display:flex;flex-direction:column;gap:2px}
.faq-q{background:var(--gl);border:1px solid var(--bd);overflow:hidden}
.faq-hd{padding:22px 32px;display:flex;justify-content:space-between;
  align-items:center;cursor:pointer;font-weight:500;font-size:16px;transition:background .2s;gap:16px}
.faq-hd:hover{background:rgba(255,255,255,.03)}
.faq-bd{padding:0 32px;max-height:0;overflow:hidden;transition:all .4s;
  color:var(--mu);font-size:15px;line-height:1.72}
.faq-bd.open{padding:0 32px 24px;max-height:220px}
.chev{transition:transform .35s;flex-shrink:0}
.chev.open{transform:rotate(180deg)}

.cta-sec{padding:130px 40px;text-align:center;position:relative;overflow:hidden}
.cta-bg{position:absolute;inset:0;
  background:radial-gradient(ellipse at center,rgba(124,58,237,.18) 0%,transparent 70%)}
.cta-title{font-family:'Syne',sans-serif;
  font-size:clamp(34px,5vw,68px);font-weight:800;line-height:1.08;margin-bottom:22px}
.cta-grad{background:linear-gradient(135deg,#a78bfa,#67e8f9);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent}
.cta-desc{color:var(--mu);font-size:18px;margin-bottom:44px;max-width:490px;
  margin-left:auto;margin-right:auto;line-height:1.7}

.footer{padding:36px 48px;border-top:1px solid var(--bd);
  display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap}
.footer-copy{color:var(--mu);font-size:14px}
.footer-links{display:flex;gap:28px}
.footer-links a{color:var(--mu);font-size:14px;text-decoration:none;transition:color .2s}
.footer-links a:hover{color:var(--tx)}

.reveal{opacity:0;transform:translateY(28px);
  transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1)}
.revealed{opacity:1;transform:translateY(0)}
.d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}
.d4{transition-delay:.4s}.d5{transition-delay:.5s}.d6{transition-delay:.6s}

@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes floaty{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-10px)}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes glow{0%,100%{box-shadow:0 0 28px rgba(124,58,237,.4)}50%{box-shadow:0 0 60px rgba(124,58,237,.7)}}

@media(max-width:768px){
  .nav{padding:14px 20px}.nav-links{display:none}
  .stats-row,.feat-grid,.price-grid,.testi-grid,.demo-body{grid-template-columns:1fr}
  .plan.pop{transform:none}.sec{padding:72px 20px}
  .footer{padding:28px 20px;flex-direction:column;text-align:center}
}
`;

const FEATURES = [
  { Icon: Brain, title: "Neural Synthesis", desc: "Multi-modal AI that processes text, images, audio, and code simultaneously with sub-millisecond latency across distributed clusters.", color: "#7c3aed" },
  { Icon: Zap, title: "Lightning Inference", desc: "Proprietary inference engine delivers 10× faster responses than industry standard without sacrificing quality or accuracy.", color: "#0891b2" },
  { Icon: Shield, title: "Enterprise Security", desc: "SOC 2 Type II certified with end-to-end encryption, zero-trust architecture, and on-premise deployment options for full control.", color: "#10b981" },
  { Icon: Globe, title: "Multilingual Core", desc: "Native support for 97 languages with deep cultural nuance understanding and real-time, context-aware translation at scale.", color: "#f59e0b" },
  { Icon: BarChart3, title: "Predictive Analytics", desc: "Transform raw data into actionable intelligence with automated pattern recognition, anomaly detection, and forecasting models.", color: "#ec4899" },
  { Icon: Layers, title: "Modular Architecture", desc: "Plug-and-play AI modules that integrate seamlessly with your existing stack via REST API, GraphQL, or native language SDKs.", color: "#6366f1" },
];

const TESTIMONIALS = [
  { name: "Sophia Chen", role: "CTO at Vertex Labs", text: "NebulaMind cut our data processing time by 87%. The neural synthesis feature is genuinely unlike anything else on the market. The ROI was immediate.", avatar: "SC", i: 0 },
  { name: "Marcus Webb", role: "AI Lead at Nexus Corp", text: "We evaluated 12 AI platforms. NebulaMind's accuracy and latency combination was unmatched. Our team was fully onboarded within a week.", avatar: "MW", i: 1 },
  { name: "Priya Sharma", role: "Head of Product at Luminary", text: "The multilingual capabilities opened entirely new markets for us overnight. Support responds within the hour — extraordinary customer care.", avatar: "PS", i: 2 },
  { name: "James Okafor", role: "Founder at DataForge", text: "From prototype to production in 3 days. The SDK is brilliantly designed, documentation is the best I've seen in the entire AI tooling space.", avatar: "JO", i: 3 },
];

const FAQS = [
  { q: "How does NebulaMind differ from other AI platforms?", a: "NebulaMind combines proprietary multi-modal neural architecture with a purpose-built inference engine. Unlike general-purpose models, our system is optimized for enterprise workloads with guaranteed SLAs, on-premise deployment, and domain-specific fine-tuning capabilities." },
  { q: "What's included in the free trial?", a: "The 14-day free trial includes full access to all Core plan features: 1M tokens/month, all AI modules, REST API access, and dedicated onboarding support. No credit card required." },
  { q: "Can I train custom models on my data?", a: "Yes. Pro and Enterprise plans include fine-tuning capabilities. You can upload proprietary datasets, configure training parameters, and deploy custom models within your isolated cloud environment." },
  { q: "How is pricing calculated?", a: "Pricing is based on combined token consumption (input + output). All plans include a generous monthly allocation. Overage is billed at a per-token rate, and Enterprise plans offer unlimited usage with flat-rate billing." },
  { q: "Is my data used to train your models?", a: "Never. Your data is completely isolated and never used for training. We maintain strict data separation with cryptographic guarantees. Enterprise customers can opt for dedicated compute with zero data egress." },
];

const PLANS = [
  { name: "Starter", m: 49, y: 39, tokens: "500K tokens/mo", features: ["All core AI modules", "REST API access", "5 team seats", "99.9% uptime SLA", "Email support"], accent: "#7c3aed" },
  { name: "Pro", m: 149, y: 119, tokens: "5M tokens/mo", features: ["Everything in Starter", "Custom fine-tuning", "25 team seats", "Priority inference", "Dedicated Slack support", "Advanced analytics dashboard"], accent: "#0891b2", pop: true },
  { name: "Enterprise", m: null, y: null, tokens: "Unlimited", features: ["Everything in Pro", "Unlimited tokens", "Unlimited seats", "On-premise deployment", "Custom SLA up to 99.99%", "24/7 dedicated engineering", "Custom integrations"], accent: "#10b981" },
];

const BADGES = ["OpenAI Compatible", "AWS Ready", "ISO 27001", "SOC 2 Type II", "GDPR Compliant", "HIPAA Ready", "EU AI Act", "FedRAMP", "Azure Certified", "GCP Partner"];
const AVS = ["#7c3aed","#0891b2","#10b981","#f59e0b"];

export default function NebulaMindAI() {
  const [typed, setTyped] = useState("");
  const [faq, setFaq] = useState(null);
  const [billing, setBilling] = useState("y");
  const [counts, setCounts] = useState({ u: 0, a: 0, up: 0, m: 0 });
  const [started, setStarted] = useState(false);
  const canvasRef = useRef(null);
  const statsRef = useRef(null);

  // Typewriter
  useEffect(() => {
    const phrases = ["Superintelligent.", "Autonomous.", "Limitless.", "Revolutionary."];
    let pi = 0, ci = 0, del = false;
    let tid;
    const tick = () => {
      const cur = phrases[pi];
      if (!del) {
        setTyped(cur.slice(0, ci + 1));
        ci++;
        if (ci === cur.length) { del = true; tid = setTimeout(tick, 2200); return; }
      } else {
        setTyped(cur.slice(0, ci - 1));
        ci--;
        if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
      }
      tid = setTimeout(tick, del ? 45 : 78);
    };
    tid = setTimeout(tick, 600);
    return () => clearTimeout(tid);
  }, []);

  // Canvas starfield
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const fit = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    fit();
    window.addEventListener("resize", fit);

    const S = Array.from({ length: 220 }, () => ({
      x: Math.random() * 9999, y: Math.random() * 9999,
      r: Math.random() * 1.4 + 0.2, v: Math.random() * 0.28 + 0.08,
      o: Math.random() * 0.65 + 0.25,
    }));
    const P = Array.from({ length: 55 }, () => ({
      x: Math.random() * 9999, y: Math.random() * 9999,
      r: Math.random() * 2.8 + 0.8,
      vx: (Math.random() - .5) * 0.25, vy: (Math.random() - .5) * 0.25,
      col: ["#7c3aed","#0891b2","#ec4899","#10b981"][Math.floor(Math.random()*4)],
      o: Math.random() * 0.45 + 0.1,
    }));

    let id;
    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      ctx.shadowBlur = 0;
      S.forEach(s => {
        s.y = (s.y + s.v) % h;
        s.x = s.x % w;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${s.o})`; ctx.fill();
      });
      P.forEach(p => {
        p.x = ((p.x + p.vx) % w + w) % w;
        p.y = ((p.y + p.vy) % h + h) % h;
        ctx.shadowBlur = 10; ctx.shadowColor = p.col;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = p.col + Math.round(p.o * 255).toString(16).padStart(2,"0"); ctx.fill();
      });
      ctx.shadowBlur = 0;
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", fit); cancelAnimationFrame(id); };
  }, []);

  // Counters
  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        setStarted(true);
        const targets = { u: 50000, a: 99, up: 99.9, m: 150 };
        Object.entries(targets).forEach(([k, target]) => {
          let cur = 0;
          const step = target / 55;
          const iv = setInterval(() => {
            cur = Math.min(cur + step, target);
            setCounts(prev => ({ ...prev, [k]: cur >= target ? target : Math.floor(cur) }));
            if (cur >= target) clearInterval(iv);
          }, 18);
        });
      }
    }, { threshold: 0.5 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [started]);

  // Scroll reveals
  useEffect(() => {
    const run = () => {
      const els = document.querySelectorAll(".reveal");
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("revealed"); });
      }, { threshold: 0.08 });
      els.forEach(el => obs.observe(el));
      return obs;
    };
    const t = setTimeout(() => { const obs = run(); return () => obs.disconnect(); }, 120);
    return () => clearTimeout(t);
  }, []);

  const DEMOS = [
    { lbl: "Requests Today", val: "2.4M", col: "#7c3aed", pct: "78%" },
    { lbl: "Avg Latency", val: "42ms", col: "#0891b2", pct: "90%" },
    { lbl: "Accuracy Score", val: "99.2%", col: "#10b981", pct: "99%" },
    { lbl: "Cost Savings", val: "$18.4K", col: "#f59e0b", pct: "64%" },
  ];

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">⬡ NebulaMind</div>
        <ul className="nav-links">
          {["Features","Product","Pricing","Docs","Blog"].map(l => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
        <button className="nav-cta">Start Free Trial →</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <canvas ref={canvasRef} className="bg" />
        <div className="glow1" /><div className="glow2" /><div className="glow3" />
        <div className="hero-inner">
          <div className="badge">
            <span className="badge-dot" />
            <Sparkles size={13} />
            Multimodal v3.0 — 200K context · 10× faster inference
          </div>
          <h1 className="htitle sy">
            <span className="hgrad">AI That's Truly</span><br />
            <span className="htyped">{typed}</span>
            <span className="hcursor">|</span>
          </h1>
          <p className="hdesc">
            NebulaMind is the enterprise AI platform that learns your domain,
            speaks your language, and scales with your ambition —
            from insight to action at the speed of thought.
          </p>
          <div className="actions">
            <button className="btn-p" style={{ animation: "glow 3.5s ease-in-out infinite" }}>
              Start Free Trial <ArrowRight size={16} />
            </button>
            <button className="btn-s">
              <Play size={15} fill="currentColor" /> Watch Demo
            </button>
          </div>
        </div>
        <div className="scroll-hint">
          <span>Scroll to explore</span>
          <ChevronDown size={15} />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="mq">
        <div className="mq-track">
          {[...BADGES, ...BADGES].map((b, i) => (
            <div className="mq-item" key={i}><span className="mq-dot" />{b}</div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div ref={statsRef} className="stats-row" style={{ padding: "60px 40px" }}>
        {[
          { n: counts.u.toLocaleString(), s: "+", l: "Active Enterprises", ac: "#7c3aed" },
          { n: counts.a, s: "%", l: "Accuracy Rate", ac: "#0891b2" },
          { n: counts.up.toFixed(1), s: "%", l: "Uptime SLA", ac: "#10b981" },
          { n: counts.m, s: "+", l: "AI Models Available", ac: "#f59e0b" },
        ].map((s, i) => (
          <div key={i} className="stat reveal" style={{ "--ac": s.ac }}>
            <div className="stat-n" style={{ color: s.ac }}>{s.n}{s.s}</div>
            <div className="stat-l">{s.l}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section className="sec">
        <div className="reveal">
          <div className="sec-lbl">Capabilities</div>
          <h2 className="sec-title sy">Built for the<br />next frontier of AI</h2>
          <p className="sec-desc">Every feature in NebulaMind is engineered for performance, reliability, and enterprise-grade scale.</p>
        </div>
        <div className="feat-grid">
          {FEATURES.map(({ Icon, title, desc, color }, i) => (
            <div key={i} className={`feat reveal d${(i % 3) + 1}`} style={{ "--fc": color }}>
              <div className="feat-icon" style={{ background: color + "22" }}>
                <Icon size={24} color={color} />
              </div>
              <h3 className="feat-t sy">{title}</h3>
              <p className="feat-d">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="reveal">
          <div className="sec-lbl">Platform Preview</div>
          <h2 className="sec-title sy">Intelligence you<br />can actually see</h2>
        </div>
        <div className="demo-win reveal d2">
          <div className="demo-bar">
            <div className="demo-dot" style={{ background: "#ff5f57" }} />
            <div className="demo-dot" style={{ background: "#febc2e" }} />
            <div className="demo-dot" style={{ background: "#28c840" }} />
            <span className="demo-url">dashboard.nebulamind.ai — Live Analytics</span>
          </div>
          <div className="demo-body">
            {DEMOS.map((d, i) => (
              <div key={i} className="dm">
                <div className="dm-lbl">{d.lbl}</div>
                <div className="dm-val" style={{ color: d.col }}>{d.val}</div>
                <div className="dm-bar">
                  <div className="dm-fill" style={{ width: d.pct, background: `linear-gradient(90deg,${d.col},${d.col}99)` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="sec">
        <div className="reveal" style={{ textAlign: "center" }}>
          <div className="sec-lbl">Pricing</div>
          <h2 className="sec-title sy">Transparent pricing,<br />unlimited potential</h2>
        </div>
        <div className="price-tog">
          <button className={`tog ${billing === "m" ? "on" : ""}`} onClick={() => setBilling("m")}>Monthly</button>
          <button className={`tog ${billing === "y" ? "on" : ""}`} onClick={() => setBilling("y")}>Yearly</button>
          <span className="save">Save 20%</span>
        </div>
        <div className="price-grid">
          {PLANS.map((p, i) => (
            <div key={i} className={`plan reveal d${i + 1} ${p.pop ? "pop" : ""}`}>
              {p.pop && <span className="pop-tag">⚡ Most Popular</span>}
              <div className="plan-n sy">{p.name}</div>
              <div style={{ color: "var(--mu)", fontSize: 13 }}>{p.tokens}</div>
              <div className="plan-p" style={{ color: p.accent }}>
                {p.m ? `$${billing === "y" ? p.y : p.m}` : "Custom"}
              </div>
              <div className="plan-per">{p.m ? "per seat / month" : "Contact sales"}</div>
              <div className="plan-tok" />
              {p.features.map((f, j) => (
                <div key={j} className="plan-f">
                  <Check size={15} color={p.accent} style={{ flexShrink: 0, marginTop: 1 }} />
                  {f}
                </div>
              ))}
              <button className="plan-btn" style={
                p.pop
                  ? { background: `linear-gradient(135deg,${p.accent},#06b6d4)`, color: "#fff" }
                  : { background: "var(--gl)", color: "var(--tx)", border: "1px solid var(--bd)" }
              }>
                {p.m ? "Get Started" : "Contact Sales"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="sec">
        <div className="reveal" style={{ textAlign: "center" }}>
          <div className="sec-lbl">Social Proof</div>
          <h2 className="sec-title sy">Trusted by teams<br />redefining their industries</h2>
        </div>
        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`testi reveal d${(i % 2) + 1}`}>
              <div className="testi-stars">
                {Array(5).fill(0).map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
              </div>
              <p className="testi-txt">"{t.text}"</p>
              <div className="testi-auth">
                <div className="testi-av" style={{
                  background: `linear-gradient(135deg,${AVS[i]},${["#a855f7","#06b6d4","#34d399","#fbbf24"][i]})`
                }}>{t.avatar}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="sec">
        <div className="reveal" style={{ textAlign: "center" }}>
          <div className="sec-lbl">FAQ</div>
          <h2 className="sec-title sy">Everything you<br />need to know</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div key={i} className="faq-q reveal">
              <div className="faq-hd" onClick={() => setFaq(faq === i ? null : i)}>
                <span>{f.q}</span>
                <ChevronDown size={18} className={`chev ${faq === i ? "open" : ""}`}
                  style={{ color: "var(--mu)" }} />
              </div>
              <div className={`faq-bd ${faq === i ? "open" : ""}`}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-sec">
        <div className="cta-bg" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 className="cta-title sy reveal">
            The future of intelligence<br />
            <span className="cta-grad">starts here.</span>
          </h2>
          <p className="cta-desc reveal d1">
            Join 50,000+ enterprises already using NebulaMind to build what's next.
            No credit card required.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
            className="reveal d2">
            <button className="btn-p" style={{ animation: "glow 3.5s ease-in-out infinite" }}>
              Start Free — 14 Days <ArrowRight size={16} />
            </button>
            <button className="btn-s">Schedule a Demo</button>
          </div>
          <p className="reveal d3" style={{ color: "var(--mu)", fontSize: 13, marginTop: 20 }}>
            No credit card · Cancel anytime · Full feature access
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="nav-logo">⬡ NebulaMind</div>
        <div className="footer-copy">© 2025 NebulaMind AI, Inc. All rights reserved.</div>
        <div className="footer-links">
          {["Privacy","Terms","Security","Status"].map(l => (
            <a key={l} href="#">{l}</a>
          ))}
        </div>
      </footer>
    </>
  );
}
