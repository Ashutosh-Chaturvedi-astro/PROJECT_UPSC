import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Contact() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-24 px-6">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          .contact-page * { font-family: 'Poppins', sans-serif; }
        `}</style>

        <div className="contact-page text-center max-w-md">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.667 4.667h18.666A2.333 2.333 0 0 1 25.666 7v14a2.333 2.333 0 0 1-2.333 2.333H4.667A2.333 2.333 0 0 1 2.333 21V7a2.333 2.333 0 0 1 2.334-2.333Z" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="m25.666 7-11.667 8.167L2.333 7" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-3">Get in Touch</h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            Have a question, suggestion, or found a bug? Feel free to reach out via GitHub or email.
          </p>
          <div className="flex flex-col gap-3">
     
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Contact
