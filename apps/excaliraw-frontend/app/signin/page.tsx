"use client";

import { useState, useRef } from "react";
import { HTTP_BACKEND } from "@/config";
import { useRouter } from "next/navigation";
import {
  Pencil,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MousePointer2
} from "lucide-react";

export default function Signin() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${HTTP_BACKEND}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && (data?.jwt || data?.token)) {
        const token = data.jwt || data.token;
        localStorage.setItem("token", token);
        router.push("/rooms");
      } else {
        setErrorMsg(data?.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Signin error:", err);
      setErrorMsg("Unable to connect to authentication service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex items-center justify-center p-4 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-600/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Main Container Card */}
      <div className="w-full max-w-4xl bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10 backdrop-blur-xl">
        
        {/* Left Side: Brand Visual & Feature Highlights (Hidden on small mobile) */}
        <div className="hidden md:flex flex-col justify-between p-8 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border-r border-slate-800/80 relative overflow-hidden">
          {/* Top Brand Link */}
          <div>
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center space-x-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer group mb-8"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Pencil className="w-5 h-5 text-indigo-400 -rotate-12" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Excaliraw</span>
            </div>

            <h2 className="mt-8 text-2xl font-bold text-white tracking-tight">
              Welcome back to your workspace.
            </h2>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Log in to access your infinite whiteboards, active collaboration rooms, and visual diagrams.
            </p>
          </div>

          {/* Mini Mock Diagram Preview Card */}
          <div className="my-6 rounded-2xl bg-slate-950/80 border border-slate-800 p-4 relative overflow-hidden bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ROOM: ARCH-SYSTEM-1</span>
            </div>
            
            <div className="flex items-center justify-between border-2 border-indigo-500/60 rounded-xl p-3 bg-slate-900/80">
              <span className="text-xs font-bold text-white">System Diagram</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium">
                Live Sync
              </span>
            </div>

            <div className="absolute bottom-2 right-3 flex items-center space-x-1">
              <MousePointer2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/30" />
              <span className="text-[9px] bg-cyan-500 text-slate-950 px-1 py-0.5 rounded font-semibold">
                Alex
              </span>
            </div>
          </div>

          {/* Feature Bullet Points */}
          <div className="space-y-2.5 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant multi-user room sync</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>PNG & SVG high-res export</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Unlimited infinite canvas</span>
            </div>
          </div>
        </div>

        {/* Right Side: Sign In Form */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          {/* Mobile Back Button */}
          <div className="flex md:hidden items-center justify-between mb-6">
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                E
              </div>
              <span className="font-bold text-white text-sm">Excaliraw</span>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Sign In</h1>
            <p className="mt-1.5 text-sm text-slate-400">Enter your account details to continue.</p>
          </div>

          {/* Error Message Alert */}
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-center space-x-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSignin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  ref={emailRef}
                  required
                  placeholder="you@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  ref={passwordRef}
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center space-x-2 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle to Sign Up */}
          <div className="mt-8 text-center text-xs text-slate-400 border-t border-slate-800/80 pt-5">
            <span>Don't have an account? </span>
            <button
              onClick={() => router.push("/signup")}
              className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
            >
              Create an account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
