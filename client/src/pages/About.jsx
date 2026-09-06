import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function About() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          .about-page * { font-family: 'Poppins', sans-serif; }
        `}</style>

        <div className="about-page max-w-3xl mx-auto px-6 py-20">

          {/* Header */}
          <div className="mb-12 text-center">
            <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-600 text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
              About
            </span>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">UPSC News Analyzer</h1>
            <p className="text-slate-500 text-base leading-relaxed">
              An AI-powered tool that reads your daily newspaper and extracts everything relevant for UPSC preparation — so you don't have to do it manually.
            </p>
          </div>

          {/* What is it */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-slate-700 mb-3">What is this?</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              UPSC News Analyzer lets you upload a PDF of any major Indian newspaper (like The Hindu or Indian Express).
              Our AI scans through the articles, identifies UPSC-relevant content, and organizes it by GS Paper, subject, and exam category —
              giving you a structured study resource in seconds.
            </p>
          </div>

          {/* How to use */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-slate-700 mb-5">How to Use</h2>
            <div className="space-y-5">
              {[
                {
                  step: '01',
                  title: 'Upload a Newspaper PDF',
                  desc: 'Click "Get Started" or scroll to the upload section on the home page. Drag & drop or browse your newspaper PDF.',
                  color: 'bg-violet-100 text-violet-600',
                },
                {
                  step: '02',
                  title: 'Let AI Analyze',
                  desc: 'Our AI reads through the entire newspaper and filters articles relevant to UPSC Prelims and Mains.',
                  color: 'bg-green-100 text-green-600',
                },
                {
                  step: '03',
                  title: 'Review Structured Insights',
                  desc: 'Get categorized outputs — GS Paper mapping, key topics, Prelims facts, Mains angles, keywords, and relevance scores.',
                  color: 'bg-orange-100 text-orange-600',
                },
              ].map(({ step, title, desc, color }) => (
                <div key={step} className="flex items-start gap-5 p-5 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-sm transition-all">
                  <div className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center text-xs font-bold ${color}`}>
                    {step}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 mb-1">{title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-14">
            <a
              href="/"
              className="inline-block px-8 py-3 bg-indigo-500 hover:bg-indigo-600 transition text-white text-sm font-medium rounded-full"
            >
              Try it Now →
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default About
