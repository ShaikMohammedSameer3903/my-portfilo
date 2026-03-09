import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminFetch, setToken } from '../utils/api'
import EditProfile from './EditProfile'
import EditSkills from './EditSkills'
import EditProjects from './EditProjects'
import EditResume from './EditResume'

const Dashboard = ({ setAuth }) => {
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      await adminFetch('/api/admin/me')
      setLoading(false)
    } catch (e) {
      setToken('')
      setAuth(false)
      navigate('/login')
    }
  }

  const handleLogout = () => {
    setToken('')
    setAuth(false)
    navigate('/')
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'user' },
    { id: 'skills', label: 'Skills', icon: 'code' },
    { id: 'projects', label: 'Projects', icon: 'project-diagram' },
    { id: 'resume', label: 'Resume', icon: 'file-pdf' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-light text-xl">
          <i className="fas fa-spinner fa-spin mr-2"></i>Loading...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gradient">Admin Dashboard</h1>
          <button onClick={handleLogout} className="modern-btn-outline">
            <i className="fas fa-sign-out-alt mr-2"></i>Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-white/20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
                activeTab === tab.id
                  ? 'text-accent border-accent'
                  : 'text-light/70 border-transparent hover:text-accent hover:border-accent/50'
              }`}
            >
              <i className={`fas fa-${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="glass-card">
          {activeTab === 'profile' && <EditProfile />}
          {activeTab === 'skills' && <EditSkills />}
          {activeTab === 'projects' && <EditProjects />}
          {activeTab === 'resume' && <EditResume />}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

