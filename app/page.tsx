import Link from "next/link";
import { ChevronRight, Zap, Target, Trophy, CheckCircle2, Shield, Flame, Activity } from "lucide-react";
import { auth } from "@/auth";

export default async function LandingPage() {
  const session = await auth();
  const isLoggedIn = !!session;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      {/* Decorative Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="fixed inset-0 bg-radial-at-t from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-3xl font-black tracking-tighter flex items-center gap-2 group">
              <div className="size-8 rounded-lg bg-zinc-50 text-zinc-950 flex items-center justify-center transition-transform group-hover:rotate-12">R</div>
              RHODIUM
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">Features</Link>
              <Link href="#pricing" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">Pricing</Link>
              <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">Community</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Link 
                href="/dashboard"
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 text-sm font-bold rounded-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(251,191,36,0.2)] flex items-center gap-2"
              >
                Dashboard
                <ChevronRight className="size-4" />
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">
                  Log in
                </Link>
                <Link 
                  href="/auth/signup"
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 text-sm font-bold rounded-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section - MONO Inspo */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-[10px] font-black uppercase tracking-widest mb-8 animate-fade-in">
            <Zap className="size-3" />
            Ascend Your Habits
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none mb-8 relative">
            <span className="block text-zinc-500/20 absolute -top-1 -left-1 md:-top-2 md:-left-2 select-none pointer-events-none">RHODIUM</span>
            RHODIUM
          </h1>
          
          <p className="max-w-2xl text-xl text-zinc-400 mb-12 leading-relaxed">
            The gamified habitat for high-performers. Turn your daily tasks into experience points, level up your discipline, and ascend the ranks.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {isLoggedIn ? (
              <Link 
                href="/dashboard"
                className="px-8 py-4 bg-zinc-50 text-zinc-950 text-lg font-black rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.15)] group"
              >
                Go to Dashboard
                <ChevronRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <Link 
                href="/auth/signup"
                className="px-8 py-4 bg-zinc-50 text-zinc-950 text-lg font-black rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.15)] group"
              >
                Start Your Ascension
                <ChevronRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            <Link 
              href="/ranks"
              className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-zinc-50 text-lg font-bold rounded-xl transition-all hover:bg-zinc-800 flex items-center gap-2"
            >
              See the ranks
            </Link>
          </div>

          {/* Hero Image / Mockup - Inspired by LATE */}
          <div className="mt-20 w-full max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 z-10" />
            <div className="aspect-video bg-zinc-900 rounded-lg border border-zinc-800 flex flex-col overflow-hidden">
              <div className="h-10 border-b border-zinc-800 bg-zinc-900/80 flex items-center px-4 gap-2">
                <div className="size-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                <div className="size-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
                <div className="size-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                <div className="ml-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">rhodium-v1.0.0.app</div>
              </div>
              
              <div className="flex-1 p-6 overflow-hidden">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[8px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">Active</span>
                      <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">/</span>
                      <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Rhodium</span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight">Dashboard</h3>
                  </div>
                  <div className="flex items-center gap-3 bg-zinc-950 p-1 pr-4 rounded-xl border border-zinc-800">
                    <div className="size-8 rounded-lg bg-amber-500 flex items-center justify-center text-zinc-950">
                      <Zap className="size-4 fill-current" />
                    </div>
                    <div className="text-left">
                      <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block leading-none mb-0.5">Experience</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-black font-mono leading-none">12,450</span>
                        <span className="text-[8px] font-bold text-amber-500 uppercase">XP</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 h-full">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black flex items-center gap-2">
                        <Activity className="size-3 text-indigo-500" />
                        Daily Habits
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: "Deep Work Protocol", diff: "Hard", streak: 12, completed: true, xp: 70 },
                        { name: "Cold Shower", diff: "Medium", streak: 3, completed: false, xp: 25 },
                      ].map((h, i) => (
                        <div key={i} className={`p-3 rounded-2xl border ${h.completed ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-zinc-800 bg-zinc-900/50'} flex items-center justify-between`}>
                          <div className="flex items-center gap-3">
                            <div className={`size-8 rounded-lg flex items-center justify-center ${h.completed ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                              {h.completed ? <CheckCircle2 className="size-4" /> : <Zap className="size-4" />}
                            </div>
                            <div>
                              <div className={`text-[10px] font-bold ${h.completed ? 'text-zinc-500 line-through' : 'text-zinc-100'}`}>{h.name}</div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full border border-zinc-800 text-zinc-500">{h.diff}</span>
                                {h.streak > 0 && <span className="text-[7px] font-black text-orange-500 uppercase flex items-center gap-0.5"><Flame className="size-2 fill-current" /> {h.streak}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                             <span className="text-[6px] font-black text-zinc-600 uppercase tracking-widest block">Yield</span>
                             <span className={`text-[10px] font-black font-mono ${h.completed ? 'text-emerald-500' : 'text-zinc-500'}`}>+{h.xp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black flex items-center gap-2">
                        <Target className="size-3 text-rose-500" />
                        Active Tasks
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: "Review Q1 Strategy", diff: "Hard", completed: false, xp: 50 },
                        { name: "Send Investor Update", diff: "Medium", completed: false, xp: 25 },
                      ].map((t, i) => (
                        <div key={i} className="p-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-zinc-800 text-zinc-500 flex items-center justify-center">
                              <Shield className="size-4" />
                            </div>
                            <div>
                              <div className="text-[10px] font-bold text-zinc-100">{t.name}</div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full border border-zinc-800 text-zinc-500">{t.diff}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                             <span className="text-[6px] font-black text-zinc-600 uppercase tracking-widest block">Reward</span>
                             <span className="text-[10px] font-black font-mono text-zinc-500">+{t.xp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-amber-400 mb-4">Core System</h2>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">Everything you need to master yourself.</h3>
            </div>
            <p className="max-w-md text-zinc-400 font-medium">
              We&apos;ve stripped away the noise and left only the essential mechanics for psychological momentum and habit formation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="size-6" />,
                title: "Precision Tracking",
                desc: "Micro-habits and macro-goals, all tracked with surgical precision to ensure no progress is lost."
              },
              {
                icon: <Zap className="size-6" />,
                title: "XP Economy",
                desc: "Every positive action earns XP. Watch your progress bar fill up in real-time as you complete your day."
              },
              {
                icon: <Trophy className="size-6" />,
                title: "The Hierarchy",
                desc: "Compete against yourself and others to climb the ranks. From Iron to Rhodium, every level means more prestige."
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-2xl border border-zinc-900 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-amber-500/30 transition-all duration-500">
                <div className="size-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-zinc-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Inspired by screenshotprice */}
      <section id="pricing" className="py-32 px-6 bg-zinc-900/20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-amber-400 mb-4">Investment</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter">Choose Your Path</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-zinc-800 rounded-2xl opacity-50 group-hover:opacity-100 transition duration-500" />
              <div className="relative p-8 md:p-12 rounded-2xl bg-zinc-950 flex flex-col h-full border border-zinc-900">
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-zinc-400 mb-2">Initiate</h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black">$0</span>
                    <span className="text-zinc-500 font-medium">/forever</span>
                  </div>
                </div>
                
                <p className="text-zinc-400 mb-8 font-medium">Essential tools for those just beginning their journey to self-mastery.</p>
                
                <ul className="space-y-4 mb-12 flex-1">
                  {[
                    "Unlimited Habit Tracking",
                    "Unlimited Task Management",
                    "Ascension Rank System",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle2 className="size-4 text-zinc-600" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/auth/signup"
                  className="w-full py-4 px-6 rounded-xl border border-zinc-800 bg-zinc-900/50 text-center font-bold hover:bg-zinc-800 transition-all active:scale-95"
                >
                  Start Training
                </Link>
              </div>
            </div>

            {/* Paid Plan */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-amber-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition duration-500" />
              <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500/50 to-amber-900/50 rounded-2xl opacity-100" />
              <div className="relative p-8 md:p-12 rounded-2xl bg-zinc-950 flex flex-col h-full border border-amber-500/20">
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] font-black uppercase tracking-widest">
                  Ascended
                </div>
                
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-amber-400 mb-2">Rhodium Titan</h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black">Soon</span>
                  </div>
                </div>
                
                <p className="text-zinc-400 mb-8 font-medium italic">Protocol expansion in progress. New dimensions of discipline are being forged.</p>
                
                <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-2xl mb-12 bg-zinc-900/20 p-8">
                  <div className="size-12 rounded-full border-2 border-amber-500/20 border-t-amber-500/80 animate-spin mb-4" />
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">Decrypting Features...</span>
                </div>

                <span 
                  className="w-full py-4 px-6 rounded-xl bg-zinc-800 text-zinc-500 border border-zinc-700 text-center font-bold cursor-not-allowed opacity-50 pointer-events-none block"
                >
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <Link href="/" className="text-3xl font-black tracking-tighter flex items-center gap-2 mb-6 group">
                <div className="size-8 rounded-lg bg-zinc-50 text-zinc-950 flex items-center justify-center transition-transform group-hover:rotate-12">R</div>
                RHODIUM
              </Link>
              <p className="text-zinc-500 max-w-xs text-sm">
                Built for those who demand more from themselves. Rhodium is the final layer of your discipline.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-12">
              <div>
                <h5 className="font-bold mb-4 uppercase text-[10px] tracking-[0.2em] text-zinc-500">Product</h5>
                <ul className="space-y-3 text-sm text-zinc-400">
                  <li><Link href="#features" className="hover:text-zinc-50 transition-colors">Features</Link></li>
                  <li><Link href="#pricing" className="hover:text-zinc-50 transition-colors">Pricing</Link></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-4 uppercase text-[10px] tracking-[0.2em] text-zinc-500">Community</h5>
                <ul className="space-y-3 text-sm text-zinc-400">
                  <li><Link href="#" className="hover:text-zinc-50 transition-colors">YouTube</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            <div>© 2026 RHODIUM SYSTEMS INC.</div>
            <div className="flex items-center gap-4">
              <span>STAY FOCUSED</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
