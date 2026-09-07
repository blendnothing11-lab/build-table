import { Header } from './components/Header';
import { MainSection } from './components/MainSection';
import { SideSection } from './components/SideSection';
import { KPICard } from './components/KPICard';
import { BarChart3, TrendingUp, Coins, Activity, Zap } from 'lucide-react';

export default function App() {
  return (
    <div className="h-screen w-full bg-neutral-950 text-white p-3 flex flex-col gap-3 font-sans overflow-hidden">
      <Header />
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-3 min-h-0">
        
        {/* Left/Main Column - spans 3 cols on large screens */}
        <div className="lg:col-span-3 flex flex-col gap-3 min-h-0">
          <MainSection />
          
          {/* Bottom KPI Row for Main Section */}
          <div className="h-28 grid grid-cols-2 md:grid-cols-4 gap-3 shrink-0">
            <KPICard 
              title="24h Volume" 
              value="14.2M" 
              change={12.5} 
              icon={<BarChart3 size={18} />} 
              variant="blue"
              delay={0.3}
            />
            <KPICard 
              title="Open Interest" 
              value="12.4M" 
              change={2.1} 
              icon={<Coins size={18} />} 
              variant="blue"
              delay={0.4}
            />
            <KPICard 
              title="Traded Value" 
              value="₹32.4K Cr" 
              change={-5.2} 
              icon={<Activity size={18} />} 
              variant="blue"
              delay={0.5}
            />
            <KPICard 
              title="Day High" 
              value="22,540.00" 
              change={0.42} 
              icon={<TrendingUp size={18} />} 
              variant="blue"
              delay={0.6}
            />
          </div>
        </div>
        
        {/* Right/Side Column - spans 1 col */}
        <div className="lg:col-span-1 flex flex-col gap-3 min-h-0">
          <SideSection />
          
          {/* Bottom KPI Card for Side Section */}
          <div className="h-28 shrink-0">
            <KPICard 
              title="Quick Trade" 
              value="Trade NIFTY" 
              variant="green"
              icon={<Zap size={18} />} 
              delay={0.7}
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}
