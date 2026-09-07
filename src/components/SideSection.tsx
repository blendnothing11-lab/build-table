import { useMemo } from 'react';
import { motion } from 'motion/react';
import { generateOrderBook } from '../data';

export function SideSection() {
  const currentPrice = 22450.5;
  const asks = useMemo(() => generateOrderBook('sell', currentPrice + 0.5).reverse(), [currentPrice]);
  const bids = useMemo(() => generateOrderBook('buy', currentPrice - 0.5), [currentPrice]);
  
  const maxTotal = Math.max(
    ...asks.map(o => o.total),
    ...bids.map(o => o.total)
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex-1 flex flex-col bg-neutral-900/60 border border-neutral-800/50 rounded-xl p-4 overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-neutral-300 uppercase tracking-wider">Order Book</h3>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <div className="w-2 h-2 rounded-full bg-rose-500"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 text-xs font-medium text-neutral-500 mb-2 px-1 uppercase tracking-wider">
        <span className="text-left">Price</span>
        <span className="text-right">Size</span>
        <span className="text-right">Total</span>
      </div>
      
      <div className="flex-1 overflow-hidden flex flex-col min-h-0 text-sm font-variant-numeric font-mono">
        {/* Asks (Sells) */}
        <div className="flex-1 overflow-hidden flex flex-col justify-end">
          {asks.map((order, i) => (
            <div key={`ask-${i}`} className="grid grid-cols-3 py-1 px-1 relative group cursor-pointer hover:bg-neutral-800/50 transition-colors">
              <div 
                className="absolute inset-y-0 right-0 bg-rose-500/10 z-0"
                style={{ width: `${(order.total / maxTotal) * 100}%` }}
              />
              <span className="text-rose-400 z-10 text-left">{order.price.toFixed(2)}</span>
              <span className="text-neutral-300 z-10 text-right">{order.amount.toFixed(4)}</span>
              <span className="text-neutral-500 z-10 text-right">{order.total.toFixed(4)}</span>
            </div>
          ))}
        </div>
        
        {/* Current Price spread */}
        <div className="py-3 px-1 my-1 flex items-center justify-between border-y border-neutral-800/50 bg-neutral-900/40">
          <span className="text-lg text-emerald-400 font-light">{currentPrice.toFixed(2)}</span>
          <span className="text-xs text-neutral-500">Spread: 1.00</span>
        </div>
        
        {/* Bids (Buys) */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {bids.map((order, i) => (
            <div key={`bid-${i}`} className="grid grid-cols-3 py-1 px-1 relative group cursor-pointer hover:bg-neutral-800/50 transition-colors">
              <div 
                className="absolute inset-y-0 right-0 bg-emerald-500/10 z-0"
                style={{ width: `${(order.total / maxTotal) * 100}%` }}
              />
              <span className="text-emerald-400 z-10 text-left">{order.price.toFixed(2)}</span>
              <span className="text-neutral-300 z-10 text-right">{order.amount.toFixed(4)}</span>
              <span className="text-neutral-500 z-10 text-right">{order.total.toFixed(4)}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
