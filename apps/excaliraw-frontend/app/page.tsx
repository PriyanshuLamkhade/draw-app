"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Pencil,
  Square,
  Circle,
  ArrowRight,
  Share2,
  Users,
  Zap,
  Lock,
  Download,
  Palette,
  Sparkles,
  MousePointer2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eraser,
  Type,
  Minus,
  Maximize2,
  RotateCcw,
  ShieldCheck,
  Globe,
  Layers,
  Layout,
  Plus
} from "lucide-react";

export default function Home() {
  const router = useRouter();

  // Mini Interactive Canvas state inside page
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeColor, setActiveColor] = useState("#6366f1");
  const [activeTool, setActiveTool] = useState<"pencil" | "eraser">("pencil");
  const [lineWidth, setLineWidth] = useState(3);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Initialize and handle drawing on the interactive preview canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set high DPI canvas resolution
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Initial background & welcome drawing demo on the interactive canvas
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Draw initial demo diagram on canvas
    drawDemoContent(ctx, rect.width, rect.height);
  }, []);

  const drawDemoContent = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);

    // Grid dots background
    ctx.fillStyle = "#334155";
    for (let x = 15; x < width; x += 25) {
      for (let y = 15; y < height; y += 25) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Demo Box 1 - Client
    ctx.strokeStyle = "#818cf8";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(40, height / 2 - 35, 110, 70);
    ctx.fillStyle = "#e0e7ff";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("Frontend App", 52, height / 2 + 4);

    // Arrow to Server
    ctx.beginPath();
    ctx.strokeStyle = "#94a3b8";
    ctx.moveTo(150, height / 2);
    ctx.lineTo(230, height / 2);
    ctx.lineTo(222, height / 2 - 6);
    ctx.moveTo(230, height / 2);
    ctx.lineTo(222, height / 2 + 6);
    ctx.stroke();

    // Text on arrow
    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px sans-serif";
    ctx.fillText("WebSocket", 158, height / 2 - 10);

    // Demo Box 2 - Canvas Server
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(230, height / 2 - 35, 120, 70);
    ctx.fillStyle = "#e0f2fe";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("WS Engine", 252, height / 2 + 4);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (activeTool === "eraser") {
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = lineWidth * 4;
    } else {
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = lineWidth;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    drawDemoContent(ctx, rect.width, rect.height);
  };

  const faqs = [
    {
      question: "What is Excaliraw?",
      answer:
        "Excaliraw is a lightweight, real-time collaborative virtual whiteboard. It allows you to sketch hand-drawn diagrams, build system architectures, and brainstorm live with team members anywhere in the world."
    },
    {
      question: "Do collaborators need an account to join a room?",
      answer:
        "No! You can create a room link and share it with anyone. Collaborators can join immediately to view and edit without forcing a registration process."
    },
    {
      question: "Is Excaliraw free to use?",
      answer:
        "Yes! Excaliraw is completely free and open for personal and team projects with unlimited canvas space and real-time room sync."
    },
    {
      question: "Can I export my drawings?",
      answer:
        "Absolutely. You can export your canvas drawings as high-resolution PNG or crisp vector SVG images ready for embedding into documentations, GitHub, or slide decks."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-[600px] right-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Floating Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push("/")}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Pencil className="w-5 h-5 text-indigo-400 -rotate-12" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-200">
              Excaliraw
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/50 font-semibold">
              v1.0
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#interactive-demo" className="hover:text-white transition-colors">
              Live Playground
            </a>
            <a href="#use-cases" className="hover:text-white transition-colors">
              Use Cases
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push("/signin")}
              className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-xl transition-all cursor-pointer hover:bg-slate-900"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 px-5 py-2.5 rounded-xl shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-indigo-300 font-medium mb-8 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Real-time Infinite Whiteboard for Teams</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          Where rough sketches turn into{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-300">
            brilliant ideas.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Brainstorm concepts, map architectures, and wireframe interfaces together in real time on a clean, lightning-fast canvas.
        </p>

        {/* Hero CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => router.push("/signup")}
            className="w-full sm:w-auto text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>Start Drawing Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => router.push("/signin")}
            className="w-full sm:w-auto text-base font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 px-8 py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>Sign In to Canvas</span>
          </button>
        </div>

        {/* Hero Highlights */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Instant Room Links</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Sub-10ms Room Sync</span>
          </div>
        </div>

        {/* Hero Canvas Window Preview Mockup */}
        <div className="mt-14 relative max-w-5xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl shadow-indigo-950/40 overflow-hidden group">
          {/* Mock Browser Header Bar */}
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            </div>
            <div className="bg-slate-950 px-4 py-1 rounded-md border border-slate-800/80 text-xs text-slate-400 font-mono flex items-center space-x-2">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>excaliraw.com/room/arch-review-99</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1.5">
                <span className="w-6 h-6 rounded-full bg-indigo-500 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">
                  AL
                </span>
                <span className="w-6 h-6 rounded-full bg-cyan-500 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">
                  SR
                </span>
              </div>
              <button
                onClick={() => router.push("/signup")}
                className="text-xs bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded-md hover:bg-indigo-600/30 transition-all flex items-center space-x-1 cursor-pointer"
              >
                <Share2 className="w-3 h-3" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Floating Canvas Toolbar Mock */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 bg-slate-900/95 border border-slate-700/80 rounded-xl px-3 py-1.5 shadow-xl flex items-center space-x-2 text-slate-300">
            <div className="p-1.5 rounded-lg bg-indigo-600 text-white cursor-pointer">
              <MousePointer2 className="w-4 h-4" />
            </div>
            <div className="p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer text-slate-400">
              <Square className="w-4 h-4" />
            </div>
            <div className="p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer text-slate-400">
              <Circle className="w-4 h-4" />
            </div>
            <div className="p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer text-slate-400">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer text-slate-400">
              <Pencil className="w-4 h-4" />
            </div>
            <div className="p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer text-slate-400">
              <Type className="w-4 h-4" />
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="w-4 h-4 rounded-full bg-indigo-500 border border-slate-700 cursor-pointer" />
            <div className="w-4 h-4 rounded-full bg-cyan-400 border border-slate-700 cursor-pointer" />
          </div>

          {/* Mock Infinite Canvas Body */}
          <div className="h-[380px] sm:h-[440px] bg-slate-950 relative overflow-hidden bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] flex items-center justify-center p-6 select-none">
            {/* Simulated Live User Cursors */}
            <div className="absolute top-28 left-[22%] z-30 flex items-center space-x-1.5 animate-bounce">
              <MousePointer2 className="w-4 h-4 text-cyan-400 fill-cyan-400/30" />
              <span className="bg-cyan-500 text-slate-950 font-semibold text-[10px] px-1.5 py-0.5 rounded shadow">
                Alex
              </span>
            </div>

            <div className="absolute bottom-24 right-[25%] z-30 flex items-center space-x-1.5">
              <MousePointer2 className="w-4 h-4 text-indigo-400 fill-indigo-400/30" />
              <span className="bg-indigo-500 text-white font-semibold text-[10px] px-1.5 py-0.5 rounded shadow">
                Sarah (Drawing...)
              </span>
            </div>

            {/* Mock Vector Diagrams */}
            <div className="w-full max-w-2xl grid grid-cols-3 gap-6 items-center">
              {/* Diagram Node 1 */}
              <div className="border-2 border-dashed border-indigo-500/80 rounded-xl p-4 bg-slate-900/60 text-left relative group-hover:border-indigo-400 transition-all">
                <div className="text-xs font-mono text-indigo-400 mb-1">CLIENT LAYER</div>
                <div className="text-sm font-bold text-white">Next.js App</div>
                <div className="mt-2 text-[11px] text-slate-400">Canvas Engine & UI</div>
              </div>

              {/* Connecting Hand-Drawn Arrow */}
              <div className="flex flex-col items-center justify-center text-slate-500">
                <div className="text-[10px] font-mono text-cyan-400 mb-1">WS Sync</div>
                <div className="w-full h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-400 relative">
                  <div className="absolute right-0 -top-1 w-2 h-2 border-r-2 border-t-2 border-cyan-400 rotate-45" />
                </div>
              </div>

              {/* Diagram Node 2 */}
              <div className="border-2 border-indigo-400/80 rounded-xl p-4 bg-indigo-950/30 text-left relative shadow-lg shadow-indigo-950">
                <div className="text-xs font-mono text-cyan-400 mb-1">BACKEND ENGINE</div>
                <div className="text-sm font-bold text-white">WebSocket Relay</div>
                <div className="mt-2 text-[11px] text-slate-400">Low-latency broadcasts</div>
              </div>
            </div>

            {/* Floating Sticky Note */}
            <div className="absolute bottom-8 left-8 bg-amber-200 text-slate-900 rounded-lg p-3 w-44 shadow-xl rotate-[-3deg] text-xs font-medium border border-amber-300">
              📌 Remember to add shape snapping in next sprint!
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-4 right-4 bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-1 text-xs text-slate-400 flex items-center space-x-3">
              <span>Zoom: 100%</span>
              <div className="h-3 w-px bg-slate-800" />
              <span>Grid: On</span>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="border-y border-slate-800/80 bg-slate-900/40 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">100%</div>
            <div className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">Vector Precision</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 tracking-tight">&lt; 10ms</div>
            <div className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">Sync Latency</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 tracking-tight">∞</div>
            <div className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">Infinite Canvas Space</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Free</div>
            <div className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">For Teams & Individuals</div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Built For Productivity</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Everything you need to whiteboard like a pro
          </p>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Streamlined features designed for fast visualization without unnecessary complexity.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all hover:bg-slate-900/90 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">Real-Time Multiplayer</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Collaborate live with team members. Track live cursor positions and see drawings sync instantaneously.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all hover:bg-slate-900/90 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Maximize2 className="w-6 h-6" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">Infinite Vector Canvas</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Never run out of space. Pan and zoom infinitely without losing crisp vector detail on any display.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all hover:bg-slate-900/90 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <Pencil className="w-6 h-6" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">Hand-Drawn Aesthetic</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Embrace organic, clean rough-sketch styles that make diagrams feel human and easy to digest.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all hover:bg-slate-900/90 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">Instant Room Links</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Share your room URL with anyone. Collaborators can jump right into the action without sign-up blocks.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all hover:bg-slate-900/90 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">PNG & SVG Export</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Export your finished diagrams into high-resolution images ready for docs, presentations, or GitHub specs.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all hover:bg-slate-900/90 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">Privacy First</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Your drawings belong to you. Client-rendered shapes and encrypted room connections keep work safe.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Mini-Canvas Section */}
      <section id="interactive-demo" className="py-16 bg-slate-900/40 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Interactive Preview</span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white">Test the feel right here</h2>
            <p className="mt-2 text-sm text-slate-400">
              Select a color or tool below and sketch directly on this mini canvas before getting started!
            </p>
          </div>

          <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
            {/* Canvas Toolbar Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTool("pencil")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all cursor-pointer ${activeTool === "pencil"
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Pencil</span>
                </button>
                <button
                  onClick={() => setActiveTool("eraser")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all cursor-pointer ${activeTool === "eraser"
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                >
                  <Eraser className="w-3.5 h-3.5" />
                  <span>Eraser</span>
                </button>
                <button
                  onClick={clearCanvas}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Color Swatches */}
              <div className="flex items-center space-x-2">
                {["#6366f1", "#38bdf8", "#10b981", "#f59e0b", "#ef4444", "#f43f5e"].map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setActiveColor(color);
                      setActiveTool("pencil");
                    }}
                    className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${activeColor === color && activeTool === "pencil" ? "scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-900" : "hover:scale-110"
                      }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* HTML5 Sketch Canvas */}
            <div className="mt-4 rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 relative">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-[260px] sm:h-[300px] cursor-crosshair touch-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Versatile Applications</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Designed for how creators & engineers work
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:bg-slate-900/80 transition-all">
            <div className="text-indigo-400 font-mono text-xs uppercase mb-2">Engineering</div>
            <h3 className="text-lg font-bold text-white">System Architecture</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Draft microservices, database schemas, and API flows with clear visual arrows and shapes.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:bg-slate-900/80 transition-all">
            <div className="text-cyan-400 font-mono text-xs uppercase mb-2">Design</div>
            <h3 className="text-lg font-bold text-white">Rapid Wireframing</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Sketch low-fidelity user interfaces and screen layouts in seconds without heavy UI software.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:bg-slate-900/80 transition-all">
            <div className="text-indigo-400 font-mono text-xs uppercase mb-2">Teams</div>
            <h3 className="text-lg font-bold text-white">Brainstorming & Retros</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Gather your team on an open board with sticky notes and live cursors for active participation.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:bg-slate-900/80 transition-all">
            <div className="text-cyan-400 font-mono text-xs uppercase mb-2">Education</div>
            <h3 className="text-lg font-bold text-white">Visual Mindmapping</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Organize notes, connect complex concepts, and build visual study guides effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-900/30 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="mt-2 text-slate-400 text-sm">Have questions? We have answers.</p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between text-base font-semibold text-white hover:text-indigo-300 transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                {activeFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-indigo-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                )}
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-cyan-900/60 border border-indigo-500/30 p-8 sm:p-12 text-center overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-indigo-500/5 blur-3xl pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to start sketching your ideas?
          </h2>
          <p className="mt-4 text-slate-300 text-base max-w-xl mx-auto">
            Join thousands of developers, designers, and teams collaborating on Excaliraw today.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push("/signup")}
              className="w-full sm:w-auto text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => router.push("/signin")}
              className="w-full sm:w-auto text-base font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 px-8 py-3.5 rounded-xl transition-all cursor-pointer"
            >
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Pencil className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-base">Excaliraw</span>
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <button onClick={() => router.push("/signin")} className="hover:text-white transition-colors cursor-pointer">
              Sign In
            </button>
            <button onClick={() => router.push("/signup")} className="hover:text-white transition-colors cursor-pointer">
              Sign Up
            </button>
          </div>

          <div className="text-xs">
            © {new Date().getFullYear()} Excaliraw. Built for real-time collaboration.
          </div>
        </div>
      </footer>
    </div>
  );
}
