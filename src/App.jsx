import Hero from './components/Hero';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Dashboard />
      <footer className="py-8 text-center text-white/50 border-t border-white/10 mt-8">
        <p>Traffic data dashboard — futuristic, fast, and focused.</p>
      </footer>
    </div>
  );
}

export default App;
