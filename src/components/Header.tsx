import { Bell, Search, User, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-16 shrink-0 flex items-center justify-between px-6 bg-neutral-900/40 border-b border-neutral-800/50 rounded-xl"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
          <Activity size={18} />
        </div>
        <h1 className="text-xl font-medium tracking-tight text-white">Nexus<span className="text-neutral-500 font-light">Trade</span></h1>
      </div>
      
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
            <Search size={16} />
          </div>
          <input 
            type="text" 
            placeholder="Search markets, pairs, or symbols..." 
            className="w-full bg-neutral-950/50 border border-neutral-800 text-sm rounded-full py-2 pl-10 pr-4 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-neutral-700 transition-colors"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-neutral-400 hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-neutral-900"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-700 border border-neutral-600 flex items-center justify-center cursor-pointer">
          <User size={16} className="text-neutral-300" />
        </div>
      </div>
    </motion.header>
  );
}
