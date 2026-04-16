"use client";
import React, { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Form States
  const [boy, setBoy] = useState({ name: '', dob: '', time: '', place: '' });
  const [girl, setGirl] = useState({ name: '', dob: '', time: '', place: '' });

  const handleMatch = async () => {
    if (!boy.name || !girl.name || !boy.dob || !girl.dob || !boy.time || !girl.time) {
      alert("Bhai, saari details toh bhar de pehle!");
      return;
    }

    setLoading(true);
    setResult(null);

    // Backend (API) ko jo exact format chahiye, wo ye hai:
    const payload = {
      boyDetails: {
        name: boy.name,
        dob: boy.dob,
        tob: boy.time, // Frontend ka 'time' Backend ke liye 'tob' hai
        pob: boy.place
      },
      girlDetails: {
        name: girl.name,
        dob: girl.dob,
        tob: girl.time, // Frontend ka 'time' Backend ke liye 'tob' hai
        pob: girl.place
      }
    };

    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.details || data.error || "Match generation failed");
      }

      setResult(data);
    } catch (error: any) {
      console.error("Error:", error);
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center py-16 px-4 relative overflow-hidden">

      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="text-center z-10 mb-12 animate-in fade-in slide-in-from-top duration-1000">
        <span className="text-red-500 text-[10px] font-bold tracking-[0.3em] border border-red-500/30 px-4 py-1.5 rounded-full uppercase">
          Vedic Astrology • AI Powered
        </span>
        <h1 className="text-5xl md:text-7xl font-serif font-bold mt-8 mb-4 tracking-wider">
          <span className="text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.6)]">ASTROMATCH</span> AI
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto text-sm md:text-base italic">
          "Matching souls through the lens of stars and silicon"
        </p>
      </div>

      {/* Forms Section */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 z-10 mb-8">

        {/* Boy's Details */}
        <div className="bg-[#111111]/80 backdrop-blur-sm border border-[#222222] p-8 rounded-2xl shadow-2xl hover:border-red-900/40 transition-all duration-500">
          <div className="flex items-center gap-3 mb-6 border-b border-[#222] pb-4">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center text-xl font-bold border border-red-500/20">♂</div>
            <div>
              <h2 className="text-lg font-bold tracking-wider text-gray-100 uppercase">The Boy</h2>
              <p className="text-[10px] text-gray-500 tracking-widest uppercase font-mono">Input Credentials</p>
            </div>
          </div>
          <div className="space-y-4">
            <input type="text" placeholder="Full Name" value={boy.name} onChange={(e) => setBoy({ ...boy, name: e.target.value })} className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all" />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" value={boy.dob} onChange={(e) => setBoy({ ...boy, dob: e.target.value })} className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white [color-scheme:dark]" />
              <input type="time" value={boy.time} onChange={(e) => setBoy({ ...boy, time: e.target.value })} className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white [color-scheme:dark]" />
            </div>
            <input type="text" placeholder="Birth City" value={boy.place} onChange={(e) => setBoy({ ...boy, place: e.target.value })} className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white focus:outline-none focus:border-red-600" />
          </div>
        </div>

        {/* Girl's Details */}
        <div className="bg-[#111111]/80 backdrop-blur-sm border border-[#222222] p-8 rounded-2xl shadow-2xl hover:border-red-900/40 transition-all duration-500">
          <div className="flex items-center gap-3 mb-6 border-b border-[#222] pb-4">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center text-xl font-bold border border-red-500/20">♀</div>
            <div>
              <h2 className="text-lg font-bold tracking-wider text-gray-100 uppercase">The Girl</h2>
              <p className="text-[10px] text-gray-500 tracking-widest uppercase font-mono">Input Credentials</p>
            </div>
          </div>
          <div className="space-y-4">
            <input type="text" placeholder="Full Name" value={girl.name} onChange={(e) => setGirl({ ...girl, name: e.target.value })} className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all" />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" value={girl.dob} onChange={(e) => setGirl({ ...girl, dob: e.target.value })} className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white [color-scheme:dark]" />
              <input type="time" value={girl.time} onChange={(e) => setGirl({ ...girl, time: e.target.value })} className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white [color-scheme:dark]" />
            </div>
            <input type="text" placeholder="Birth City" value={girl.place} onChange={(e) => setGirl({ ...girl, place: e.target.value })} className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white focus:outline-none focus:border-red-600" />
          </div>
        </div>

      </div>

      {/* Button Section */}
      <div className="z-10 mt-4 mb-12">
        <button
          onClick={handleMatch}
          disabled={loading}
          className={`relative group overflow-hidden bg-gradient-to-r from-red-700 to-red-600 text-white font-bold tracking-[0.2em] uppercase text-xs px-16 py-6 rounded-full shadow-[0_0_40px_rgba(220,38,38,0.3)] hover:shadow-[0_0_60px_rgba(220,38,38,0.5)] transition-all duration-500 ${loading ? 'opacity-50' : 'hover:scale-105 active:scale-95'}`}
        >
          <span className="relative z-10 flex items-center gap-3">
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Analyzing Stars...
              </span>
            ) : '✦ Generate AI Match ✦'}
          </span>
        </button>
      </div>

      {/* Result Display */}
      {result && (
        <div className="z-10 w-full max-w-4xl animate-in fade-in zoom-in duration-700">
          {result.error ? (
            <div className="bg-red-900/20 border border-red-900/50 p-6 rounded-2xl text-center text-red-400 font-mono text-sm">
              Error: {result.error}
            </div>
          ) : (
            <div className="bg-[#111]/90 backdrop-blur-md border border-red-900/30 p-10 rounded-3xl shadow-[0_0_100px_rgba(0,0,0,1)]">
              <div className="text-center mb-10">
                <p className="text-gray-500 text-[10px] tracking-[0.5em] uppercase mb-2">Compatibility Report</p>
                <h2 className="text-5xl font-serif font-bold text-white">
                  Score: <span className="text-red-600">{result.score || '28'}/36</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-[#050505] rounded-2xl border border-[#222] hover:border-red-900/30 transition-all">
                  <h3 className="text-red-500 font-bold tracking-widest mb-3 uppercase text-[10px]">The Verdict</h3>
                  <p className="text-gray-300 text-sm leading-relaxed italic">"{result.verdict || result.ai_report?.verdict}"</p>
                </div>
                <div className="p-6 bg-[#050505] rounded-2xl border border-[#222] hover:border-red-900/30 transition-all">
                  <h3 className="text-red-500 font-bold tracking-widest mb-3 uppercase text-[10px]">Cosmic Deep Dive</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{result.deep_dive || result.ai_report?.deep_dive}</p>
                </div>
              </div>

              <div className="p-6 bg-[#050505] rounded-2xl border border-[#222] hover:border-red-900/30 transition-all">
                <h3 className="text-red-500 font-bold tracking-widest mb-3 uppercase text-[10px]">Vedic Remedies</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{result.remedies || result.ai_report?.remedies}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 text-[9px] text-gray-700 tracking-[0.4em] text-center uppercase z-10 pb-10">
        System Status: Online • Powered by Google Gemini Pro • Built by Aryan
      </footer>

    </main>
  );
}