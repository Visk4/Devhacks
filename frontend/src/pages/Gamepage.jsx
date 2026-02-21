import React from 'react';
import GameHero from '../components/Gamepage/GameHero';
import GameModes from '../components/Gamepage/GameModes';
import HelpButton from '../components/Gamepage/HelpButton';
import Footer from '../components/Landingpage/Footer';

const GamePage = () => {
  return (
    <div className="min-h-screen bg-[#0b0614] pb-24">
      <GameHero />
      <GameModes /> {/* <--- Added here */}
      <HelpButton />
      <Footer />
    </div>
  );
};

export default GamePage;