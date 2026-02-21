import { Code2, Send, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-[#050816] via-[#0b1020] to-[#061a1f] text-white overflow-hidden">
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:40px_40px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-10">
        
        <div className="grid md:grid-cols-4 gap-12">
          
          {/* Logo + Description */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500">
                <Code2 size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-widest font-display">
                <span className="text-white">CODE</span>
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  ARENA
                </span>
              </h1>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The world's first esports platform for competitive programming.
              Train, battle, and win.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 text-gray-400">
              <Twitter className="hover:text-white transition cursor-pointer" size={18} />
              <Github className="hover:text-white transition cursor-pointer" size={18} />
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide">
              PLATFORM
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-white transition cursor-pointer">Game Modes</li>
              <li className="hover:text-white transition cursor-pointer">Leaderboards</li>
              <li className="hover:text-white transition cursor-pointer">Tournaments</li>
              <li className="hover:text-white transition cursor-pointer">Skill Tree</li>
              <li className="hover:text-white transition cursor-pointer">IDE Features</li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide">
              COMMUNITY
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-white transition cursor-pointer">Discord Server</li>
              <li className="hover:text-white transition cursor-pointer">Forum</li>
              <li className="hover:text-white transition cursor-pointer">Blog</li>
              <li className="hover:text-white transition cursor-pointer">Campus Ambassadors</li>
              <li className="hover:text-white transition cursor-pointer">Merch Store</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide">
              STAY UPDATED
            </h3>

            <p className="text-gray-400 text-sm mb-6">
              Subscribe to our newsletter for tournament alerts.
            </p>

            <div className="flex items-center bg-white/[0.05] border border-white/10 rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 outline-none"
              />
              <button className="bg-cyan-400 hover:bg-cyan-300 transition px-4 py-3">
                <Send size={16} className="text-black" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2024 CodeArena Inc. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white transition cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white transition cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-white transition cursor-pointer">
              Code of Conduct
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}