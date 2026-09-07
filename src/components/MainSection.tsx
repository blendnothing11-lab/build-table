import { useMemo } from 'react';
import { motion } from 'motion/react';
import { generateNiftyData } from '../data';

// Helper for imbalance cohort-style heatmap coloring
const getImbalanceHeatmapColor = (value: number, maxAbs: number) => {
  const intensity = Math.min(Math.abs(value) / (maxAbs || 1), 1);
  if (value > 0) {
    if (intensity < 0.2) return 'rgba(6, 78, 59, 0.4)'; // emerald-900 transparent
    if (intensity < 0.5) return 'rgba(4, 120, 87, 0.6)'; // emerald-700 transparent
    if (intensity < 0.8) return 'rgba(16, 185, 129, 0.8)'; // emerald-500
    return 'rgba(52, 211, 153, 1)'; // emerald-400
  } else {
    if (intensity < 0.2) return 'rgba(136, 19, 55, 0.4)'; // rose-900 transparent
    if (intensity < 0.5) return 'rgba(159, 18, 57, 0.6)'; // rose-700 transparent
    if (intensity < 0.8) return 'rgba(225, 29, 72, 0.8)'; // rose-500
    return 'rgba(251, 113, 133, 1)'; // rose-400
  }
};

export function MainSection() {
  const data = useMemo(() => generateNiftyData(), []);
  
  const maxImbalance = Math.max(...data.map(d => Math.abs(d.imbalance)));
  const maxOFI = Math.max(...data.map(d => Math.abs(d.ofi)));
  const maxTopImbalance = Math.max(...data.flatMap(d => d.topImbalances.map(t => Math.abs(t.value))));
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="flex-1 flex flex-col bg-neutral-900/60 border border-neutral-800/50 rounded-xl p-6 relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-light text-white tracking-tight">NIFTY FUT</h2>
            <span className="px-2 py-0.5 text-xs rounded-md bg-neutral-800 text-neutral-400">Nifty 50 Futures</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-light tracking-tighter text-white">
              22,450.00
            </span>
            <span className="text-emerald-400 text-sm font-medium flex items-center">
              +0.85%
            </span>
          </div>
        </div>
        
        <div className="flex gap-2 bg-neutral-950/50 p-1 rounded-lg border border-neutral-800/50">
          <button className="px-3 py-1 text-xs font-medium rounded-md bg-neutral-800 text-white transition-colors">
            15m OFI
          </button>
          <button className="px-3 py-1 text-xs font-medium rounded-md text-neutral-500 hover:text-neutral-300 transition-colors">
            Order Book
          </button>
        </div>
      </div>
      
      <div className="flex-1 min-h-0 relative z-10 w-full overflow-auto rounded-lg border border-neutral-800/50 bg-neutral-950/30 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
        <table className="w-full text-[11px] text-left whitespace-nowrap border-collapse">
          <thead className="text-neutral-400 bg-neutral-950/95 sticky top-0 z-20 shadow-md shadow-neutral-900/50 backdrop-blur-md">
            <tr>
              <th className="px-4 py-3 font-medium border-b border-neutral-800 w-16">Time</th>
              <th className="px-2 py-3 font-medium text-right border-b border-neutral-800 text-emerald-500/80">Bid Q (Zone)</th>
              <th className="px-2 py-3 font-medium text-right border-b border-neutral-800 text-emerald-500/80">Best Bid</th>
              <th className="px-2 py-3 font-medium text-left border-b border-neutral-800 text-rose-500/80">Best Ask</th>
              <th className="px-2 py-3 font-medium text-left border-b border-neutral-800 text-rose-500/80">Ask Q (Zone)</th>
              <th className="px-6 py-3 font-medium text-center border-b border-neutral-800 w-40">Imbalance Pendulum</th>
              <th className="px-6 py-3 font-medium text-center border-b border-neutral-800 w-40">OFI Pendulum</th>
              <th className="px-3 py-3 font-medium text-right border-b border-neutral-800 w-20">OI Chg</th>
              <th className="px-3 py-3 font-medium text-center border-b border-neutral-800 w-28">Action</th>
              <th className="px-4 py-3 font-medium text-center border-b border-l border-neutral-800" colSpan={5}>
                Top 5 Imbalances (15m)
              </th>
            </tr>
          </thead>
          <tbody className="font-variant-numeric font-mono">
            {data.map((row) => {
              return (
                <tr key={row.time} className="border-b border-neutral-800/20 hover:bg-neutral-800/40 transition-colors group">
                  <td className="px-4 py-2.5 text-neutral-300 font-medium">{row.time}</td>
                  
                  <td className="px-2 py-2.5 text-right text-emerald-400/70 font-medium bg-emerald-950/5">
                    {row.bestBidQ.toLocaleString()}
                  </td>
                  <td className="px-2 py-2.5 text-right text-emerald-400/90 font-medium bg-emerald-950/20">
                    {row.bestBidPrice.toFixed(2)}
                  </td>
                  <td className="px-2 py-2.5 text-left text-rose-400/90 font-medium bg-rose-950/20">
                    {row.bestAskPrice.toFixed(2)}
                  </td>
                  <td className="px-2 py-2.5 text-left text-rose-400/70 font-medium bg-rose-950/5">
                    {row.bestAskQ.toLocaleString()}
                  </td>
                  
                  {/* Imbalance Pendulum */}
                  <td className="px-6 py-2.5 border-l border-neutral-800/30">
                    <div className="flex items-center w-full h-4 relative">
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neutral-700/50 z-0" />
                      <div className="w-1/2 flex justify-end pr-1 z-10">
                        {row.imbalance < 0 && (
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(Math.abs(row.imbalance) / maxImbalance) * 100}%` }}
                            className="h-full bg-rose-500/70 rounded-l-sm min-w-[2px]"
                          />
                        )}
                      </div>
                      <div className="w-1/2 flex justify-start pl-1 z-10">
                        {row.imbalance > 0 && (
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(row.imbalance / maxImbalance) * 100}%` }}
                            className="h-full bg-emerald-500/70 rounded-r-sm min-w-[2px]"
                          />
                        )}
                      </div>
                      <span className={`absolute ${row.imbalance > 0 ? 'right-0 text-emerald-400' : 'left-0 text-rose-400'} text-[9px] opacity-0 group-hover:opacity-100 transition-opacity`}>
                        {Math.abs(row.imbalance).toLocaleString(undefined, { notation: 'compact' })}
                      </span>
                    </div>
                  </td>
                  
                  {/* OFI Pendulum */}
                  <td className="px-6 py-2.5 border-l border-neutral-800/30">
                    <div className="flex items-center w-full h-4 relative">
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neutral-700/50 z-0" />
                      <div className="w-1/2 flex justify-end pr-1 z-10">
                        {row.ofi < 0 && (
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(Math.abs(row.ofi) / maxOFI) * 100}%` }}
                            className="h-full bg-rose-400/80 rounded-l-sm min-w-[2px]"
                          />
                        )}
                      </div>
                      <div className="w-1/2 flex justify-start pl-1 z-10">
                        {row.ofi > 0 && (
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(row.ofi / maxOFI) * 100}%` }}
                            className="h-full bg-emerald-400/80 rounded-r-sm min-w-[2px]"
                          />
                        )}
                      </div>
                      <span className={`absolute ${row.ofi > 0 ? 'right-0 text-emerald-300' : 'left-0 text-rose-300'} text-[9px] opacity-0 group-hover:opacity-100 transition-opacity`}>
                        {Math.abs(row.ofi).toLocaleString(undefined, { notation: 'compact' })}
                      </span>
                    </div>
                  </td>

                  {/* OI Change & Interpretation */}
                  <td className={`px-3 py-2.5 text-right font-medium border-l border-neutral-800/30 ${row.oiChange > 0 ? 'text-blue-400' : 'text-orange-400'}`}>
                    {row.oiChange > 0 ? '+' : ''}{(row.oiChange / 1000).toFixed(1)}k
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <span className={`inline-block px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                      row.oiInterpretation === 'Long Buildup' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' :
                      row.oiInterpretation === 'Short Buildup' ? 'bg-rose-950 text-rose-400 border border-rose-800/50' :
                      row.oiInterpretation === 'Short Covering' ? 'bg-lime-950 text-lime-400 border border-lime-800/50' :
                      row.oiInterpretation === 'Long Unwinding' ? 'bg-orange-950 text-orange-400 border border-orange-800/50' :
                      'bg-neutral-800 text-neutral-400'
                    }`}>
                      {row.oiInterpretation}
                    </span>
                  </td>
                  
                  {/* Top Imbalances Heatmap */}
                  {row.topImbalances.map((tick, i) => (
                    <td key={i} className={`p-1 align-middle ${i === 0 ? 'border-l border-neutral-800/50 pl-4' : ''} ${i === 4 ? 'pr-4' : ''}`}>
                      <div 
                        className="w-16 h-12 rounded-[3px] flex flex-col items-center justify-center text-white/90 mx-auto transition-colors duration-300 border border-black/20 p-1 shadow-sm"
                        style={{ backgroundColor: getImbalanceHeatmapColor(tick.value, maxTopImbalance) }}
                      >
                        <span className="text-[10px] font-bold leading-none mb-0.5">
                          {Math.abs(tick.value) > 999 ? (Math.abs(tick.value)/1000).toFixed(1) + 'k' : Math.abs(tick.value)}
                        </span>
                        <span className="text-[9px] text-white/90 font-medium leading-none mb-0.5">
                          {tick.price.toFixed(1)}
                        </span>
                        <span className="text-[8px] text-white/60 leading-none">
                          {tick.time}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
