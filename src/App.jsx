import Hero from './components/Hero';
import StatCards from './components/StatCards';
import Sections from './components/Sections';

function App() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero with Spline cover */}
      <Hero />

      {/* Quick stats */}
      <div className="relative z-20 -mt-6 md:-mt-10">
        <StatCards />
      </div>

      {/* Data sections */}
      <Sections />

      {/* Footer */}
      <footer className="py-8 text-center text-white/50 border-t border-white/10 mt-8">
        <p>Traffic data dashboard — futuristic, fast, and focused.</p>
      </footer>
    </div>
  );
}

export default App;
