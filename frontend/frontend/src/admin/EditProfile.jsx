import React, { useState, useEffect } from 'react'
import { adminFetch, fetchJson } from '../utils/api'

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    headline: '',
    about: '',
    linkedin: '',
    github: '',
    contactEmail: '',
    contactPhone: '',
    contactLocation: '',
  })
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const data = await adminFetch('/api/admin/profile')
      if (data.profile) {
        setProfile(data.profile)
      }
    } catch (e) {
      setMessage({ type: 'error', text: e.message })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const data = await adminFetch('/api/admin/profile', {
        method: 'PUT',
        body: JSON.stringify(profile),
      })
      setProfile(data.profile)
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      
      // Reload public profile to update the site
      await fetchJson('/api/public/profile')
    } catch (e) {
      setMessage({ type: 'error', text: e.message })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gradient mb-6">Edit Profile</h2>
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-light mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-light focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-light mb-2">Headline</label>
            <input
              type="text"
              name="headline"
              value={profile.headline}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-light focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <div>
          <label className="block text-light mb-2">About (Footer)</label>
          <textarea
            name="about"
            value={profile.about}
            onChange={handleChange}
            rows="4"
            required
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-light focus:outline-none focus:border-primary resize-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-light mb-2">LinkedIn URL</label>
            <input
              type="url"
              name="linkedin"
              value={profile.linkedin}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-light focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-light mb-2">GitHub URL</label>
            <input
              type="url"
              name="github"
              value={profile.github}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-light focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-light mb-2">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={profile.contactEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-light focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-light mb-2">Contact Phone</label>
            <input
              type="text"
              name="contactPhone"
              value={profile.contactPhone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-light focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-light mb-2">Location</label>
            <input
              type="text"
              name="contactLocation"
              value={profile.contactLocation}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-light focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="modern-btn disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  )
}

export default EditProfile

