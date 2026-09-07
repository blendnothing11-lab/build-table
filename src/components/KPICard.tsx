import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  icon?: ReactNode;
  variant?: 'blue' | 'green' | 'default';
  delay?: number;
}

export function KPICard({ title, value, change, icon, variant = 'blue', delay = 0 }: KPICardProps) {
  const isPositive = change && change > 0;
  
  let bgClass = 'bg-neutral-900/60 border border-neutral-800/50';
  if (variant === 'blue') {
    bgClass = 'bg-blue-900/40 border border-blue-800/40 text-blue-100';
  } else if (variant === 'green') {
    bgClass = 'bg-emerald-950 border border-emerald-900 text-emerald-100';
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`h-full rounded-xl p-4 flex flex-col justify-between ${bgClass}`}
    >
      <div className={`flex items-center justify-between mb-2 ${variant === 'blue' ? 'text-blue-300' : variant === 'green' ? 'text-emerald-400' : 'text-neutral-400'}`}>
        <span className="text-sm font-medium tracking-wide uppercase">{title}</span>
        {icon && <span className="opacity-70">{icon}</span>}
      </div>
      
      <div className="flex flex-col gap-1 mt-auto">
        <span className="text-2xl font-light tracking-tight text-white">{value}</span>
        
        {change !== undefined && (
          <div className={`flex items-center text-sm ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isPositive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
            <span>{Math.abs(change)}%</span>
            <span className="text-neutral-500 ml-2">vs 24h</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
