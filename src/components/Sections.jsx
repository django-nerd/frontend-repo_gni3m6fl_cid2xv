import { useEffect, useState } from 'react';
import { MapPin, Clock3, TrainFront, AlertTriangle, TrafficCone } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function Section({ title, icon: Icon, children, action }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-emerald-300" />
          <h3 className="text-white font-semibold">{title}</h3>
        </div>
        {action}
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

function List({ items, type }) {
  if (!items?.length) {
    return <p className="text-white/60 text-sm">No data available.</p>;
  }
  return (
    <ul className="divide-y divide-white/5">
      {items.map((item, idx) => (
        <li key={idx} className="py-3 flex items-start justify-between gap-4">
          <div>
            {type === 'transit' && (
              <div>
                <p className="text-white font-medium flex items-center gap-2">
                  <TrainFront className="w-4 h-4 text-emerald-300" />{item.line}
                </p>
                <p className="text-white/70 text-sm">Status: {item.status} {item.delay_minutes ? `• ${item.delay_minutes} min` : ''}</p>
              </div>
            )}
            {type === 'accident' && (
              <div>
                <p className="text-white font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-300" />{item.severity}
                </p>
                <p className="text-white/70 text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {item.location}
                </p>
              </div>
            )}
            {type === 'roadwork' && (
              <div>
                <p className="text-white font-medium flex items-center gap-2">
                  <TrafficCone className="w-4 h-4 text-sky-300" />{item.impact}
                </p>
                <p className="text-white/70 text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {item.location}
                </p>
              </div>
            )}
          </div>
          <div className="text-right text-xs text-white/60">
            <p className="inline-flex items-center gap-1"><Clock3 className="w-3 h-3" /> Live</p>
            <p className="uppercase">{item.status}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Sections() {
  const [transit, setTransit] = useState([]);
  const [accidents, setAccidents] = useState([]);
  const [roadworks, setRoadworks] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [t, a, r] = await Promise.all([
          fetch(`${API_BASE}/api/transit`).then(res => res.json()),
          fetch(`${API_BASE}/api/accidents`).then(res => res.json()),
          fetch(`${API_BASE}/api/roadworks`).then(res => res.json()),
        ]);
        setTransit(Array.isArray(t) ? t : []);
        setAccidents(Array.isArray(a) ? a : []);
        setRoadworks(Array.isArray(r) ? r : []);
      } catch (e) {
        console.error(e);
      }
    }
    fetchAll();
  }, []);

  const stats = {
    transitOnTime: Math.max(0, Math.min(100, 100 - (transit.filter(x => x.delay_minutes > 0).length / Math.max(1, transit.length)) * 100)),
    activeAccidents: accidents.length,
    roadworks: roadworks.length
  };

  return (
    <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 py-8">
      <div className="lg:col-span-2 space-y-6">
        <Section title="Transit" icon={TrainFront}>
          <List items={transit} type="transit" />
        </Section>
        <Section title="Accidents" icon={AlertTriangle}>
          <List items={accidents} type="accident" />
        </Section>
      </div>
      <div className="space-y-6">
        <Section title="Road Works" icon={TrafficCone}>
          <List items={roadworks} type="roadwork" />
        </Section>
      </div>
    </div>
  );
}
