import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchJson, setToken } from '../utils/api'

const Login = ({ setAuth }) => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { email, password } = formData
      const data = await fetchJson('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      setToken(data.token)
      setAuth(true)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="glass-card max-w-md w-full">
        <h2 className="text-3xl font-bold text-gradient mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-light mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="username"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-light placeholder-light/60 focus:outline-none focus:border-primary focus:bg-white/15 transition-all"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-light mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-light placeholder-light/60 focus:outline-none focus:border-primary focus:bg-white/15 transition-all"
            />
          </div>
          {error && (
            <div className="p-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full modern-btn disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>Logging in...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt mr-2"></i>Login
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

