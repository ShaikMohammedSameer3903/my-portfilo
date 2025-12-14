import React, { useEffect, useState } from 'react'
import { fetchJson, apiUrl } from '../utils/api'

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    email: 'shaiksameer3909sam@gmail.com',
    phone: '+91 9030259526',
    location: 'Vijayawada, Andhra Pradesh, India',
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const data = await fetchJson('/api/public/profile')
      if (data && data.profile) {
        setContactInfo({
          email: data.profile.contactEmail || contactInfo.email,
          phone: data.profile.contactPhone || contactInfo.phone,
          location: data.profile.contactLocation || contactInfo.location,
        })
      }
    } catch (e) {
      // Silently use fallback data
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const { name, email, subject, message, website } = formData

      if (!name || !email || !message) {
        throw new Error('Please fill in name, email, and message.')
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address.')
      }

      const response = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, website }),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok && data.ok !== false) {
        setStatus({ type: 'success', message: 'Message sent successfully!' })
        setFormData({ name: '', email: '', subject: '', message: '', website: '' })
      } else {
        throw new Error(data.error || 'Failed to send message')
      }
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title" data-aos="fade-up">
          Get In Touch
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="glass-card" data-aos="fade-up">
            <h4 className="text-2xl font-bold text-gradient mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 hover:translate-x-2">
                <i className="fas fa-envelope text-2xl text-primary mr-4"></i>
                <a href={`mailto:${contactInfo.email}`} className="text-light hover:text-accent transition-colors">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 hover:translate-x-2">
                <i className="fas fa-phone text-2xl text-primary mr-4"></i>
                <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="text-light hover:text-accent transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 hover:translate-x-2">
                <i className="fas fa-map-marker-alt text-2xl text-primary mr-4"></i>
                <span className="text-light">{contactInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card" data-aos="fade-up" data-aos-delay="100">
            <h4 className="text-2xl font-bold text-gradient mb-6">Send Me a Message</h4>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-light placeholder-light/60 focus:outline-none focus:border-primary focus:bg-white/15 transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-light placeholder-light/60 focus:outline-none focus:border-primary focus:bg-white/15 transition-all"
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-light placeholder-light/60 focus:outline-none focus:border-primary focus:bg-white/15 transition-all"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Your Message"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-light placeholder-light/60 focus:outline-none focus:border-primary focus:bg-white/15 transition-all resize-none"
                ></textarea>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex="-1"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="modern-btn w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
            {status.message && (
              <div
                className={`mt-4 p-3 rounded-lg ${
                  status.type === 'success'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}
              >
                {status.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

