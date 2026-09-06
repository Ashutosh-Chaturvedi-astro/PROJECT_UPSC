import { useState, useRef } from 'react'

// Importance score → label and colour
const IMPORTANCE_META = {
  5: { label: 'Very High', color: 'bg-red-100 text-red-700 border-red-200' },
  4: { label: 'High',      color: 'bg-orange-100 text-orange-700 border-orange-200' },
  3: { label: 'Moderate',  color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  2: { label: 'Low',       color: 'bg-blue-100 text-blue-700 border-blue-200' },
  1: { label: 'Very Low',  color: 'bg-gray-100 text-gray-500 border-gray-200' },
}

function TopicCard({ topic }) {
  const importance = IMPORTANCE_META[topic.importance] || IMPORTANCE_META[3]

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">

      {/* Header row */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <h2 className="text-base font-semibold text-slate-800 leading-snug flex-1">{topic.title}</h2>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border whitespace-nowrap ${importance.color}`}>
          ★ {importance.label}
        </span>
      </div>

      {/* Tags row — GS Papers */}
      <div className="flex flex-wrap gap-1.5">
        {topic.gsPapers?.map((gs) => (
          <span key={gs} className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full font-medium">
            {gs}
          </span>
        ))}
        {topic.subjects?.map((sub) => (
          <span key={sub} className="text-xs bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full">
            {sub}
          </span>
        ))}
      </div>

      {/* Prelims / Mains / Essay badges */}
      <div className="flex gap-2 flex-wrap">
        {topic.prelims && (
          <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded font-medium">Prelims</span>
        )}
        {topic.mains && (
          <span className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded font-medium">Mains</span>
        )}
        {topic.essay && (
          <span className="text-xs bg-pink-50 text-pink-700 border border-pink-200 px-2 py-0.5 rounded font-medium">Essay</span>
        )}
      </div>

      {/* Why important */}
      {topic.reason && (
        <p className="text-xs text-slate-500 italic border-l-2 border-indigo-300 pl-3">{topic.reason}</p>
      )}

      {/* Sections */}
      <div className="space-y-3">
        {topic.sections?.map((section, i) => (
          <div key={i}>
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">{section.heading}</h3>
            <ul className="space-y-1">
              {section.points?.map((point, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* One-line summary */}
      {topic.oneLineSummary && (
        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Summary: </span>
            {topic.oneLineSummary}
          </p>
        </div>
      )}
    </div>
  )
}

function UploadSection() {
  const [file, setFile]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState(null)
  const inputRef              = useRef(null)

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0]
    if (!selected) return
    if (selected.type !== 'application/pdf') {
      setError('Only PDF files are accepted.')
      return
    }
    setFile(selected)
    setError(null)
    setResult(null)
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a PDF file first.')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      // Key must match upload.single("newspaper") on the backend
      formData.append('newspaper', file)

      const API_URL = import.meta.env.VITE_API_URL || 'https://upsc-newspaper-analyzer.onrender.com'
      const response = await fetch(`${API_URL}/api/analyze/pdf`, {
        method: 'POST',
        body: formData,
        // Do NOT set Content-Type manually — browser sets it with the boundary
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        throw new Error(json.message || 'Something went wrong on the server.')
      }

      setResult(json)
    } catch (err) {
      setError(err.message || 'Failed to connect to the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center mt-16 px-4" id="upload-section">

      {/* Upload box */}
      <div className="max-w-md w-full p-6 bg-white rounded-lg border border-gray-500/30 shadow-[0px_1px_15px_0px] shadow-black/10 text-sm">

        <label
          htmlFor="fileInput"
          className={`border-2 border-dotted p-8 mt-2 flex flex-col items-center gap-4 cursor-pointer transition
            ${file ? 'border-indigo-400 bg-indigo-50/40' : 'border-gray-400 hover:border-blue-500'}`}
        >
          <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.085 2.583H7.75a2.583 2.583 0 0 0-2.583 2.584v20.666a2.583 2.583 0 0 0 2.583 2.584h15.5a2.583 2.583 0 0 0 2.584-2.584v-15.5m-7.75-7.75 7.75 7.75m-7.75-7.75v7.75h7.75M15.5 23.25V15.5m-3.875 3.875h7.75" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          {file ? (
            <div className="text-center">
              <p className="text-indigo-600 font-medium text-sm truncate max-w-xs">{file.name}</p>
              <p className="text-gray-400 text-xs mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          ) : (
            <>
              <p className="text-gray-500">Drag files here to upload</p>
              <p className="text-gray-400">Or <span className="text-blue-500 underline">click here</span> to select a file</p>
            </>
          )}

          <input
            id="fileInput"
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Error message */}
        {error && (
          <p className="mt-3 text-xs text-red-500 text-center">{error}</p>
        )}

        {/* Upload button */}
        <div className="mt-6 flex items-center justify-center">
          <button
            type="button"
            onClick={handleUpload}
            disabled={loading || !file}
            className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all text-white rounded
              disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Analyzing...
              </>
            ) : 'Upload & Analyze'}
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="w-full max-w-3xl mt-10 mb-16 space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-700">
              Today's UPSC Topics
            </h2>
            <span className="text-xs bg-indigo-100 text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-full font-medium">
              {result.totalTopics} topics found
            </span>
          </div>

          {result.data?.topics?.map((topic, i) => (
            <TopicCard key={i} topic={topic} />
          ))}
        </div>
      )}

    </div>
  )
}

export default UploadSection