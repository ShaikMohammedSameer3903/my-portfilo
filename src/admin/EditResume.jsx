import React, { useState, useEffect } from 'react'
import { adminFetch, fetchJson } from '../utils/api'

const EditResume = () => {
  const [version, setVersion] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadResume()
  }, [])

  const loadResume = async () => {
    try {
      const data = await fetchJson('/api/public/resume')
      setVersion(data.version || '')
    } catch (e) {
      // Use empty version
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const newVersion = version || new Date().toISOString()
      await adminFetch('/api/admin/resume', {
        method: 'PUT',
        body: JSON.stringify({ version: newVersion }),
      })
      await loadResume()
      setMessage({
        type: 'success',
        text: 'Resume version updated! Replace the PDF file at frontend/public/assets/resumea1.pdf and redeploy.',
      })
    } catch (e) {
      setMessage({ type: 'error', text: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gradient mb-6">Edit Resume</h2>
      {message.text && (
        <div
          className={`p-3 rounded-lg mb-4 ${
            message.type === 'success'
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white/5 p-4 rounded-lg mb-4">
        <p className="text-light/80 text-sm">
                  Replace your resume PDF at <strong>frontend/public/assets/resumea1.pdf</strong> and
          redeploy/build (Vite copies it into <strong>frontend/dist/assets/</strong> during build). This dashboard updates the resume version so browsers download the latest
          file. If <strong>resumea1.pdf</strong> is missing, the site will fall back to <strong>frontend/public/assets/resumea.pdf</strong>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-light mb-2">Resume Version</label>
          <input
            type="text"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            placeholder="e.g. 2025-12-13"
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-light focus:outline-none focus:border-primary"
          />
        </div>
        <button type="submit" disabled={loading} className="modern-btn disabled:opacity-50">
          {loading ? 'Updating...' : 'Update Resume Version'}
        </button>
      </form>
    </div>
  )
}

export default EditResume

