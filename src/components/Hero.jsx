import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] lg:h-[75vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline 
          scene="https://prod.spline.design/6tUXqVcUA0xgJugv/scene.splinecode" 
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      {/* Gradient overlay for readability, but don't block interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80" />

      <div className="relative z-10 h-full flex items-end md:items-center">
        <div className="container mx-auto px-6 pb-8 md:pb-0">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-[0_6px_30px_rgba(16,185,129,0.35)]">
              Traffic Intelligence Dashboard
            </h1>
            <p className="mt-3 md:mt-5 text-sm md:text-lg text-emerald-200/85">
              Live insights for transit status, incidents, and road works — built for clarity and speed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;