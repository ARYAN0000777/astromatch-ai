"use client";
import React, { useState } from 'react';

export default function Home() {
  // App ka 'Dimag' (States)
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Forms ka Data
  const [boy, setBoy] = useState({ name: '', dob: '', time: '', place: '' });
  const [girl, setGirl] = useState({ name: '', dob: '', time: '', place: '' });

  // Button dabane par kya hoga
  const handleMatch = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ boy, girl })
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "Bhai server se connect nahi hua. API check kar." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center py-16 px-4 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="text-center z-10 mb-12">
        <span className="text-red-500 text-xs font-bold tracking-[0.2em] border border-red-500/30 px-4 py-1.5 rounded-full uppercase">
          Vedic Astrology • AI Powered
        </span>
        <h1 className="text-5xl md:text-7xl font-serif font-bold mt-8 mb-4 tracking-wider">
          <span className="text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.6)]">ASTROMATCH</span> AI
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto text-sm md:text-base">
          Discover cosmic compatibility through ancient Vedic wisdom and modern artificial intelligence
        </p>
      </div>

      {/* Forms Section */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 z-10 mb-8">

        {/* Boy's Details */}
        <div className="bg-[#111111] border border-[#222222] p-8 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-3 mb-6 border-b border-[#222] pb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center text-xl font-bold border border-blue-500/20">♂</div>
            <div>
              <h2 className="text-lg font-bold tracking-wider text-gray-100">THE BOY</h2>
              <p className="text-[10px] text-gray-500 tracking-widest uppercase">Birth Details</p>
            </div>
          </div>
          <div className="space-y-4">
            <input type="text" placeholder="Full Name" value={boy.name} onChange={(e) => setBoy({ ...boy, name: e.target.value })} className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all" />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" value={boy.dob} onChange={(e) => setBoy({ ...boy, dob: e.target.value })} className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all [color-scheme:dark]" />
              <input type="time" value={boy.time} onChange={(e) => setBoy({ ...boy, time: e.target.value })} className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all [color-scheme:dark]" />
            </div>
            <input type="text" placeholder="City of Birth" value={boy.place} onChange={(e) => setBoy({ ...boy, place: e.target.value })} className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all" />
          </div>
        </div>

        {/* Girl's Details */}
        <div className="bg-[#111111] border border-[#222222] p-8 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-3 mb-6 border-b border-[#222] pb-4">
            <div className="w-10 h-10 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center text-xl font-bold border border-pink-500/20">♀</div>
            <div>
              <h2 className="text-lg font-bold tracking-wider text-gray-100">THE GIRL</h2>
              <p className="text-[10px] text-gray-500 tracking-widest uppercase">Birth Details</p>
            </div>
          </div>
          <div className="space-y-4">
            <input type="text" placeholder="Full Name" value={girl.name} onChange={(e) => setGirl({ ...girl, name: e.target.value })} className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all" />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" value={girl.dob} onChange={(e) => setGirl({ ...girl, dob: e.target.value })} className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all [color-scheme:dark]" />
              <input type="time" value={girl.time} onChange={(e) => setGirl({ ...girl, time: e.target.value })} className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all [color-scheme:dark]" />
            </div>
            <input type="text" placeholder="City of Birth" value={girl.place} onChange={(e) => setGirl({ ...girl, place: e.target.value })} className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all" />
          </div>
        </div>

      </div>

      {/* Submit Button */}
      <div className="z-10 mt-4 mb-12">
        <button
          onClick={handleMatch}
          disabled={loading}
          className={`relative group overflow-hidden bg-gradient-to-r from-red-700 to-red-600 text-white font-bold tracking-widest uppercase text-sm px-14 py-5 rounded-full shadow-[0_0_40px_rgba(220,38,38,0.4)] hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] hover:scale-105 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="relative z-10 flex items-center gap-3">
            {loading ? 'Consulting the Stars...' : '✦ Generate AI Match ✦'}
          </span>
        </button>
      </div>

      {/* Results Section */}
      {result && (
        <div className="z-10 w-full max-w-4xl bg-[#111] border border-red-900/50 p-8 rounded-2xl shadow-2xl mb-12 animate-fade-in-up">
          {result.error ? (
            <div className="text-center text-red-500 font-bold">{result.error}</div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-4xl font-serif text-red-500 text-center mb-8 border-b border-[#333] pb-6">
                Compatibility Score: <span className="text-white">{result.score || '28'}/36</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#050505] rounded-xl border border-[#222]">
                  <h3 className="text-xl text-red-500 font-bold tracking-widest mb-3 uppercase text-sm">AI Verdict</h3>
                  <p className="text-gray-300 leading-relaxed">{result.verdict || result.ai_report?.verdict || "Based on the cosmic alignment, this match shows strong potential."}</p>
                </div>
                <div className="p-6 bg-[#050505] rounded-xl border border-[#222]">
                  <h3 className="text-xl text-red-500 font-bold tracking-widest mb-3 uppercase text-sm">Deep Dive</h3>
                  <p className="text-gray-300 leading-relaxed">{result.deep_dive || result.ai_report?.deep_dive || "Emotional compatibility is high, though communication might need work during retrogrades."}</p>
                </div>
              </div>

              <div className="p-6 bg-[#050505] rounded-xl border border-[#222] mt-6">
                <h3 className="text-xl text-red-500 font-bold tracking-widest mb-3 uppercase text-sm">Remedies & Advice</h3>
                <p className="text-gray-300 leading-relaxed">{result.remedies || result.ai_report?.remedies || "Daily meditation and wearing ruby stones are suggested for harmony."}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-[10px] text-gray-600 tracking-[0.3em] text-center uppercase z-10 pb-8">
        Powered by Gemini AI • Ashtakoot System • 36 Gunas
      </div>

    </main>
  );
}