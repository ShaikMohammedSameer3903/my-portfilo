import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AppContent from './components/AppContent'
import { isAuthenticated } from './utils/api'

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const authenticated = await isAuthenticated();
    setAuth(authenticated);
  };

  // Initialize AOS
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 1000, once: false, easing: 'ease-in-out' });
    }
  }, []);

  // Handle hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="min-h-screen flex flex-col">
        <Navbar auth={auth} setAuth={setAuth} />
        <main className="flex-grow pt-20">
          <AppContent setAuth={setAuth} />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

