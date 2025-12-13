import React, { useEffect, useState } from 'react'
import { fetchJson } from '../utils/api'
import ProjectCard from '../components/ProjectCard'

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      title: 'APNA-RIDE - Professional Ride Sharing Platform',
      description:
        'A comprehensive ride-sharing platform connecting drivers and passengers with real-time tracking. Features include user authentication, ride booking, real-time location tracking, fare calculation, and payment integration. The admin dashboard provides analytics, user management, and ride monitoring capabilities. Built with modern web technologies for a seamless user experience.',
      tech: ['React.js', 'Spring Boot', 'JWT Authentication', 'RESTful APIs', 'MySQL', 'AWS', 'Docker', 'Leaflet Maps'],
      githubUrl: 'https://github.com/ShaikMohammedSameer3903/APNA-RIDE.git',
      liveUrl: '',
      imageUrl: '/assets/image/apnaride.jpg',
      period: 'March 2024 - Present',
    },
    {
      title: 'Online Shopping Application',
      description:
        'Built a full e-commerce platform using React.js and Spring Boot. Implemented authentication, product catalog, cart, payments, and Admin Dashboard. Setup CI/CD pipelines using Jenkins, Docker, and AWS EC2. Designed a responsive UI with reusable components.',
      tech: ['React.js', 'Spring Boot', 'Jenkins', 'Docker', 'AWS EC2'],
      githubUrl: '',
      liveUrl: '',
      imageUrl: '/assets/image/shopping.jpg',
      period: 'February 2025 - March 2025',
    },
    {
      title: 'BITFLOW - A Food Delivery Platform',
      description:
        'Food delivery platform project. See the GitHub repository for implementation details, features, and setup steps.',
      tech: ['Web Application'],
      githubUrl: 'https://github.com/ShaikMohammedSameer3903/BITFLOW-A-Food-Delivery-Platform.git',
      liveUrl: '',
      imageUrl: '',
      period: '',
    },
    {
      title: 'Crop Master - Agriculture Management System',
      description:
        'Agriculture management system to streamline farm operations. Includes user authentication, farmland & crop management, resource tracking (machinery/chemicals/water), weather insights, disease reporting, task scheduling, and analytics. Designed to be mobile responsive for on-the-go farm management.',
      tech: ['React.js', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'MySQL', 'REST APIs'],
      githubUrl: 'https://github.com/ShaikMohammedSameer3903/FARMER-CROPMASTER1.git',
      liveUrl: '',
      imageUrl: '',
      period: '',
    },
  ])

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const data = await fetchJson('/api/public/projects')
      if (data && data.projects && data.projects.length > 0) {
        setProjects(data.projects)
      }
    } catch (e) {
      // Silently use fallback data
    }
  }

  return (
    <section id="projects" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title" data-aos="fade-up">
          Projects
        </h2>
        <div className="grid grid-cols-12 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

