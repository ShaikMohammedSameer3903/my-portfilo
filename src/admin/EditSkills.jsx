import React, { useState, useEffect } from 'react'
import { adminFetch, fetchJson } from '../utils/api'

const EditSkills = () => {
  const [skills, setSkills] = useState([])
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Web' })
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadSkills()
  }, [])

  const loadSkills = async () => {
    try {
      const data = await adminFetch('/api/admin/skills')
      if (data.skills) {
        setSkills(data.skills)
      }
    } catch (e) {
      setMessage({ type: 'error', text: e.message })
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!newSkill.name.trim()) return

    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      await adminFetch('/api/admin/skills', {
        method: 'POST',
        body: JSON.stringify(newSkill),
      })
      setNewSkill({ name: '', category: 'Web' })
      await loadSkills()
      await fetchJson('/api/public/skills')
      setMessage({ type: 'success', text: 'Skill added successfully!' })
    } catch (e) {
      setMessage({ type: 'error', text: e.message })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return

    try {
      await adminFetch(`/api/admin/skills/${id}`, { method: 'DELETE' })
      await loadSkills()
      await fetchJson('/api/public/skills')
      setMessage({ type: 'success', text: 'Skill deleted successfully!' })
    } catch (e) {
      setMessage({ type: 'error', text: e.message })
    }
  }

  const handleEdit = async (skill) => {
    const name = prompt('Skill name:', skill.name)
    if (name === null) return
    const category = prompt('Category (Programming/Web/Other):', skill.category || 'Web')
    if (category === null) return

    try {
      await adminFetch(`/api/admin/skills/${skill.id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, category }),
      })
      await loadSkills()
      await fetchJson('/api/public/skills')
      setMessage({ type: 'success', text: 'Skill updated successfully!' })
    } catch (e) {
      setMessage({ type: 'error', text: e.message })
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gradient mb-6">Edit Skills</h2>
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

      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Skill Name"
          value={newSkill.name}
          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          required
          className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-light focus:outline-none focus:border-primary"
        />
        <select
          value={newSkill.category}
          onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
          className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-light focus:outline-none focus:border-primary"
        >
          <option value="Programming">Programming</option>
          <option value="Web">Web</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" disabled={loading} className="modern-btn disabled:opacity-50">
          Add Skill
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/20">
              <th className="px-4 py-3 text-light font-semibold">Skill</th>
              <th className="px-4 py-3 text-light font-semibold">Category</th>
              <th className="px-4 py-3 text-light font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id} className="border-b border-white/10 hover:bg-white/5">
                <td className="px-4 py-3 text-light">{skill.name}</td>
                <td className="px-4 py-3 text-light/70">{skill.category}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded hover:bg-yellow-500/30 transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
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

export default EditSkills

