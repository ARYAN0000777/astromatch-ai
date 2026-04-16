"use client";
import React, { useState } from 'react';

export default function Home() {
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
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 z-10 mb-12">
        
        {/* Boy's Details */}
        <div className="bg-[#111111] border border-[#222222] p-8 rounded-2xl shadow-2xl hover:border-red-900/50 transition-colors duration-500">
          <div className="flex items-center gap-3 mb-6 border-b border-[#222] pb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center text-xl font-bold border border-blue-500/20">♂</div>
            <div>
              <h2 className="text-lg font-bold tracking-wider text-gray-100">THE BOY</h2>
              <p className="text-[10px] text-gray-500 tracking-widest uppercase">Birth Details</p>
            </div>
          </div>
          <div className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all" />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all [color-scheme:dark]" />
              <input type="time" className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all [color-scheme:dark]" />
            </div>
            <input type="text" placeholder="City of Birth (e.g., Delhi, India)" className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all" />
          </div>
        </div>

        {/* Girl's Details */}
        <div className="bg-[#111111] border border-[#222222] p-8 rounded-2xl shadow-2xl hover:border-red-900/50 transition-colors duration-500">
          <div className="flex items-center gap-3 mb-6 border-b border-[#222] pb-4">
            <div className="w-10 h-10 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center text-xl font-bold border border-pink-500/20">♀</div>
            <div>
              <h2 className="text-lg font-bold tracking-wider text-gray-100">THE GIRL</h2>
              <p className="text-[10px] text-gray-500 tracking-widest uppercase">Birth Details</p>
            </div>
          </div>
          <div className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all" />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all [color-scheme:dark]" />
              <input type="time" className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all [color-scheme:dark]" />
            </div>
            <input type="text" placeholder="City of Birth (e.g., Mumbai, India)" className="w-full bg-[#050505] border border-[#333] rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all" />
          </div>
        </div>

      </div>

      {/* Submit Button */}
      <div className="z-10 mt-4">
        <button className="relative group overflow-hidden bg-gradient-to-r from-red-700 to-red-600 text-white font-bold tracking-widest uppercase text-sm px-14 py-5 rounded-full shadow-[0_0_40px_rgba(220,38,38,0.4)] hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] hover:scale-105 transition-all duration-300">
          <span className="relative z-10 flex items-center gap-3">
            ✦ Generate AI Match ✦
          </span>
        </button>
      </div>

      {/* Footer */}
      <div className="mt-20 text-[10px] text-gray-600 tracking-[0.3em] text-center uppercase z-10">
        Powered by Gemini AI • Ashtakoot System • 36 Gunas
      </div>

    </main>
  );
}