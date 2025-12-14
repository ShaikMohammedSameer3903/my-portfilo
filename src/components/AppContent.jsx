import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Projects from '../pages/Projects'
import Skills from '../pages/Skills'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
import Dashboard from '../admin/Dashboard'
import ResumeSection from './ResumeSection'

const AppContent = ({ setAuth }) => {
  const location = useLocation()

  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <Skills />
            <Projects />
            <Contact />
            <ResumeSection />
          </>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/admin/dashboard" element={<Dashboard setAuth={setAuth} />} />
      </Routes>
    </>
  )
}

export default AppContent

