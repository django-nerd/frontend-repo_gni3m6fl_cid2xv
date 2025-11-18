import { Bus, TrafficCone, AlertTriangle } from 'lucide-react';

const Card = ({ icon: Icon, label, value, change, color }) => (
  <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color} bg-opacity-10 border border-white/10`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-white/60">{label}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
        </div>
      </div>
      {change && (
        <span className="text-emerald-300 text-xs bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-400/20">{change}</span>
      )}
    </div>
  </div>
);

function StatCards({ stats }) {
  const { transitOnTime = 0, activeAccidents = 0, roadworks = 0 } = stats || {};
  return (
    <section className="-mt-8 md:-mt-10 relative z-20">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card icon={Bus} label="Transit On-Time" value={`${transitOnTime}%`} change="+2%" color="bg-emerald-400" />
        <Card icon={AlertTriangle} label="Active Accidents" value={activeAccidents} color="bg-amber-400" />
        <Card icon={TrafficCone} label="Road Works" value={roadworks} color="bg-sky-400" />
      </div>
    </section>
  );
}

export default StatCards;