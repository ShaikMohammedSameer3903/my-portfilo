import React, { useState, useEffect } from 'react'
import { adminFetch, fetchJson } from '../utils/api'

const EditProjects = () => {
  const [projects, setProjects] = useState([])
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tech: '',
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
  })
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const data = await adminFetch('/api/admin/projects')
      if (data.projects) {
        setProjects(data.projects)
      }
    } catch (e) {
      setMessage({ type: 'error', text: e.message })
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const tech = newProject.tech.split(',').map((t) => t.trim()).filter(Boolean)
      await adminFetch('/api/admin/projects', {
        method: 'POST',
        body: JSON.stringify({
          ...newProject,
          tech,
        }),
      })
      setNewProject({
        title: '',
        description: '',
        tech: '',
        githubUrl: '',
        liveUrl: '',
        imageUrl: '',
      })
      await loadProjects()
      await fetchJson('/api/public/projects')
      setMessage({ type: 'success', text: 'Project added successfully!' })
    } catch (e) {
      setMessage({ type: 'error', text: e.message })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return

    try {
      await adminFetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
      await loadProjects()
      await fetchJson('/api/public/projects')
      setMessage({ type: 'success', text: 'Project deleted successfully!' })
    } catch (e) {
      setMessage({ type: 'error', text: e.message })
    }
  }

  const handleEdit = async (project) => {
    const title = prompt('Title:', project.title)
    if (title === null) return
    const description = prompt('Description:', project.description)
    if (description === null) return
    const tech = prompt('Tech (comma separated):', (project.tech || []).join(', '))
    if (tech === null) return
    const githubUrl = prompt('GitHub URL:', project.githubUrl || '')
    if (githubUrl === null) return
    const liveUrl = prompt('Live URL:', project.liveUrl || '')
    if (liveUrl === null) return
    const imageUrl = prompt('Image URL:', project.imageUrl || '')
    if (imageUrl === null) return

    try {
      await adminFetch(`/api/admin/projects/${project.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          description,
          tech: tech.split(',').map((t) => t.trim()).filter(Boolean),
          githubUrl,
          liveUrl,
          imageUrl,
        }),
      })
      await loadProjects()
      await fetchJson('/api/public/projects')
      setMessage({ type: 'success', text: 'Project updated successfully!' })
    } catch (e) {
      setMessage({ type: 'error', text: e.message })
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gradient mb-6">Edit Projects</h2>
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

      <form onSubmit={handleAdd} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            required
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-light focus:outline-none focus:border-primary"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProject.imageUrl}
            onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-light focus:outline-none focus:border-primary"
          />
        </div>
        <textarea
          placeholder="Description"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          rows="3"
          required
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-light focus:outline-none focus:border-primary resize-none"
        />
        <input
          type="text"
          placeholder="Tech (comma separated)"
          value={newProject.tech}
          onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
          required
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-light focus:outline-none focus:border-primary"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="url"
            placeholder="GitHub URL"
            value={newProject.githubUrl}
            onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-light focus:outline-none focus:border-primary"
          />
          <input
            type="url"
            placeholder="Live URL"
            value={newProject.liveUrl}
            onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-light focus:outline-none focus:border-primary"
          />
        </div>
        <button type="submit" disabled={loading} className="modern-btn disabled:opacity-50">
          Add Project
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/20">
              <th className="px-4 py-3 text-light font-semibold">Title</th>
              <th className="px-4 py-3 text-light font-semibold">Tech</th>
              <th className="px-4 py-3 text-light font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-white/10 hover:bg-white/5">
                <td className="px-4 py-3 text-light">{project.title}</td>
                <td className="px-4 py-3 text-light/70">
                  {(project.tech || []).join(', ')}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded hover:bg-yellow-500/30 transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EditProjects

