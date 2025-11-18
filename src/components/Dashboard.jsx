import { useEffect, useState } from 'react';
import StatCards from './StatCards';
import Sections from './Sections';
import MapView from './MapView';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Dashboard() {
  const [transit, setTransit] = useState([]);
  const [accidents, setAccidents] = useState([]);
  const [roadworks, setRoadworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function fetchAll() {
      try {
        const [t, a, r] = await Promise.all([
          fetch(`${API_BASE}/api/transit`).then(res => res.json()),
          fetch(`${API_BASE}/api/accidents`).then(res => res.json()),
          fetch(`${API_BASE}/api/roadworks`).then(res => res.json()),
        ]);
        if (!active) return;
        setTransit(Array.isArray(t) ? t : []);
        setAccidents(Array.isArray(a) ? a : []);
        setRoadworks(Array.isArray(r) ? r : []);
      } catch (e) {
        console.error(e);
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchAll();
    const id = setInterval(fetchAll, 30000);
    return () => { active = false; clearInterval(id); };
  }, []);

  const stats = {
    transitOnTime: Math.round(
      Math.max(0, Math.min(100, 100 - (transit.filter(x => Number(x?.delay_minutes) > 0).length / Math.max(1, transit.length)) * 100))
    ),
    activeAccidents: accidents.length,
    roadworks: roadworks.length,
  };

  return (
    <section className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-6 self-start">
          <StatCards stats={stats} />
          <Sections transit={transit} accidents={accidents} roadworks={roadworks} loading={loading} />
        </div>
        {/* Map */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-3">
            <MapView accidents={accidents} roadworks={roadworks} />
          </div>
        </div>
      </div>
    </section>
  );
}
