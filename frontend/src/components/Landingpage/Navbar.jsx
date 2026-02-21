import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 bg-[#0b1020]/80 backdrop-blur-lg border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 shadow-lg shadow-cyan-500/20">
            <Code2 className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-widest">
            <span className="text-white font-display">CODE</span>
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-display">
              ARENA
            </span>
          </h1>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          {["Features", "Modes", "Leaderboard", "Community"].map((item) => (
            <a
              key={item}
              href="#"
              className="relative hover:text-white transition duration-300 group font-display"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button className="text-gray-300 hover:text-white transition duration-300 font-display">
            Log In
          </button>

          <button className="relative px-5 py-2 font-semibold uppercase text-black font-display text-sm
                   bg-[#e6e6e6]
                   clip-signup
                   hover:bg-white
                   transition-all duration-300
                   shadow-md hover:shadow-lg">
            SIGN UP
        </button>
        </div>
      </div>
    </motion.nav>
  );
}