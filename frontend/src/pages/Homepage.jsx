import React from 'react'
import Navbar from '../components/Homepage/Navbar'
import WelcomeCard from '../components/Homepage/WelcomeCard'
import ActionCardsGrid from '../components/Homepage/ActionCardsGrid'
import DashboardActivity from '../components/Homepage/DashboardActivity'
import ArenaChallengeAndProgress from '../components/Homepage/ArenaChallengeAndProgress'
import Footer from '../components/Landingpage/Footer'

const Homepage = () => {
  return (
    // Main wrapper sets the base dark color and prevents the large blur shapes from causing scrolling
    <div className="min-h-screen bg-[#05070a] font-sans relative overflow-hidden flex flex-col">
      
      {/* 1. Top-Left Purple Gradient Glow */}
      <div className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[150px] pointer-events-none z-0"></div>
      
      {/* 2. Bottom-Right Indigo Gradient Glow */}
      <div className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Navbar wrapper (Higher z-index so it sits cleanly above the background) */}
      
      {/* Main Content Container (z-10 to sit above the glow but below popups/nav) */}
      <main className="relative z-10 w-full max-w-[1500px] mx-auto px-4 lg:px-8 py-8 flex-1">
        <WelcomeCard />
        <ActionCardsGrid/>
        <DashboardActivity/>
        <ArenaChallengeAndProgress/>
        {/* Future grid for the 4 game mode cards will go right below this */}
      </main>
      
    </div>
  )
}

export default Homepage