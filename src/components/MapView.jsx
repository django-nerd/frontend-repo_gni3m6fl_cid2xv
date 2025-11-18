import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function FitBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length) {
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [bounds, map]);
  return null;
}

export default function MapView({ accidents = [], roadworks = [] }) {
  const markers = useMemo(() => {
    const a = accidents
      .filter(x => typeof x.lat === 'number' && typeof x.lng === 'number')
      .map(x => ({ ...x, type: 'accident', color: '#fbbf24' }));
    const r = roadworks
      .filter(x => typeof x.lat === 'number' && typeof x.lng === 'number')
      .map(x => ({ ...x, type: 'roadwork', color: '#38bdf8' }));
    return [...a, ...r];
  }, [accidents, roadworks]);

  const bounds = useMemo(() => {
    if (!markers.length) return null;
    return markers.map(m => [m.lat, m.lng]);
  }, [markers]);

  return (
    <div className="w-full h-[70vh] lg:h-[78vh] rounded-xl overflow-hidden border border-white/10">
      <MapContainer
        center={[40, -100]}
        zoom={4}
        scrollWheelZoom
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {bounds && <FitBounds bounds={bounds} />}
        {markers.map((m, idx) => (
          <CircleMarker
            key={idx}
            center={[m.lat, m.lng]}
            radius={8}
            pathOptions={{ color: m.color, fillColor: m.color, fillOpacity: 0.8 }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-medium">{m.type === 'accident' ? 'Accident' : 'Road Work'}</p>
                {m.location && <p className="text-xs opacity-80">{m.location}</p>}
                {m.description && <p className="text-xs mt-1">{m.description}</p>}
                {m.status && <p className="text-xs mt-1">Status: {m.status}</p>}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
