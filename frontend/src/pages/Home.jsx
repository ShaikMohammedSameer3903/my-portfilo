import React, { useEffect, useState } from 'react'
import { fetchJson } from '../utils/api'

const Home = () => {
  const [profile, setProfile] = useState({
    name: 'Shaik Mohammed Sameer',
    headline: 'B.Tech CSE | KL University',
  })
  const [typingText, setTypingText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  const roles = [
    'Full Stack Developer',
    'React.js Developer',
    'Java Developer',
    'Problem Solver',
    'Team Leader',
  ]

  useEffect(() => {
    loadProfile()
  }, [])

  useEffect(() => {
    const typeWriter = () => {
      if (currentIndex < roles.length) {
        const currentRole = roles[currentIndex]
        let charIndex = 0
        setTypingText('')

        const typingInterval = setInterval(() => {
          if (charIndex < currentRole.length) {
            setTypingText(currentRole.substring(0, charIndex + 1))
            charIndex++
          } else {
            clearInterval(typingInterval)
            setTimeout(() => {
              setCurrentIndex((prev) => (prev + 1) % roles.length)
            }, 2000)
          }
        }, 100)

        return () => clearInterval(typingInterval)
      }
    }

    const timer = setTimeout(typeWriter, 100)
    return () => clearTimeout(timer)
  }, [currentIndex])

  const loadProfile = async () => {
    try {
      const data = await fetchJson('/api/public/profile')
      if (data && data.profile) {
        setProfile(data.profile)
      }
    } catch (e) {
      // Silently use fallback data - no console logs
    }
  }

  useEffect(() => {
    // Initialize particles.js
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js'
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: { value: window.innerWidth < 768 ? 40 : 80, density: { enable: true, value_area: 800 } },
            color: { value: ['#2ecc71', '#3498db', '#f1c40f'] },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#2ecc71', opacity: 0.2, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out' },
          },
          interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } },
          },
          retina_detect: true,
        })
      }
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden py-20 scroll-mt-20">
      <div id="particles-js" className="absolute inset-0 -z-10"></div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left max-w-2xl" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-gradient uppercase tracking-wide">
              {profile.name}
            </h1>
            <p className="text-xl md:text-2xl text-light/90 mb-6 font-medium">
              {profile.headline}
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-accent mb-8 min-h-[70px] flex items-center justify-center lg:justify-start">
              {typingText}
              <span className="animate-pulse ml-2">|</span>
            </h3>

            <div className="flex justify-center lg:justify-start gap-6 mb-8" data-aos="fade-up" data-aos-delay="200">
              <a
                href="https://linkedin.com/in/shaik-mohammed-sameer-6802bb2a0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-light hover:text-secondary transition-all duration-300 hover:scale-125"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://github.com/ShaikMohammedSameer3903"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-light hover:text-secondary transition-all duration-300 hover:scale-125"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4" data-aos="fade-up" data-aos-delay="400">
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="modern-btn group"
              >
                <i className="fas fa-paper-plane mr-2 group-hover:translate-x-1 transition-transform"></i>Contact Me
              </a>
              <a 
                href="#projects" 
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="modern-btn-outline group"
              >
                <i className="fas fa-code mr-2 group-hover:rotate-12 transition-transform"></i>View Projects
              </a>
              <a
                href="#resume"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#resume')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="resume-btn group"
              >
                <i className="fas fa-file-pdf mr-2 group-hover:scale-110 transition-transform"></i>View Resume
              </a>
            </div>
          </div>

          <div data-aos="zoom-in" data-aos-delay="200" className="flex-shrink-0">
            <img
              src="/assets/image/sameer.jpg"
              alt="Profile"
              className="w-64 md:w-80 h-64 md:h-80 rounded-full border-8 border-primary shadow-2xl animate-float object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home

