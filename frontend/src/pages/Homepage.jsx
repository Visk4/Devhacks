import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, AlertTriangle } from 'lucide-react';

import WelcomeCard from '../components/Homepage/WelcomeCard';
import ActionCardsGrid from '../components/Homepage/ActionCardsGrid';
import DashboardActivity from '../components/Homepage/DashboardActivity';
import ArenaChallengeAndProgress from '../components/Homepage/ArenaChallengeAndProgress';

// Ensure you have your base URL configured, fallback to localhost
const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:8080/api";

const Homepage = () => {
  const [profileData, setProfileData] = useState(null);
  const [contests, setContests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("accessToken");
        const headers = { Authorization: `Bearer ${token}` };

        // 1. Fetch user profile data
        const profileRes = await axios.get(`${baseURL}/profile`, { headers });
        setProfileData(profileRes.data);

        // 2. Fetch all contests (Ongoing, Upcoming, Ended)
        try {
          const contestsRes = await axios.get(`${baseURL}/contests`, { headers });
          setContests(contestsRes.data);
        } catch (contestErr) {
          console.warn("Failed to fetch contests, proceeding with profile data only:", contestErr);
          // Don't break the whole page if just contests fail
        }

      } catch (err) {
        console.error("Error fetching homepage data:", err);
        setError("Failed to load dashboard. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#05070a] flex flex-col items-center justify-center text-cyan-400 font-sans">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="text-slate-400 font-medium tracking-wide">Loading Arena Dashboard...</p>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-[#05070a] flex items-center justify-center font-sans">
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-5 rounded-xl max-w-md text-center">
          <AlertTriangle className="w-10 h-10 mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-1">Connection Error</h3>
          <p className="text-sm">{error || "Could not retrieve profile data."}</p>
        </div>
      </div>
    );
  }

  return (
    // Main wrapper sets the base dark color and prevents the large blur shapes from causing scrolling
    <div className="min-h-screen bg-[#05070a] font-sans relative overflow-hidden flex flex-col">
      
      {/* 1. Top-Left Purple Gradient Glow */}
      <div className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[150px] pointer-events-none z-0"></div>
      
      {/* 2. Bottom-Right Indigo Gradient Glow */}
      <div className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Main Content Container (z-10 to sit above the glow but below popups/nav) */}
      <main className="relative z-10 w-full max-w-[1500px] mx-auto px-4 lg:px-8 py-8 flex-1">
        
        {/* Pass the fetched data down to the child components */}
        <WelcomeCard profileData={profileData} />
        
        <ActionCardsGrid />
        
        {/* Pass the real submissions and contests to DashboardActivity */}
        <DashboardActivity 
          recentSubmissions={profileData.recentSubmissions} 
          contests={contests} 
        />
        
        {/* You may also need to update ArenaChallengeAndProgress to accept `contests` instead of `upcomingContests` */}
        <ArenaChallengeAndProgress 
          contests={contests} 
          profileData={profileData} 
        />
        
      </main>
      
    </div>
  );
};

export default Homepage;