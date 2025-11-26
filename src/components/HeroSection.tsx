export function HeroSection() {
  const scrollToSimulator = () => {
    document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-beige">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient orb */}
        <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-burgundy/8 via-burgundy/4 to-transparent blur-3xl" />
        
        {/* Secondary orb */}
        <div className="absolute -bottom-1/3 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-burgundy/6 via-gray/20 to-transparent blur-3xl" />
        
        {/* Subtle accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] rotate-12 bg-gradient-to-r from-transparent via-burgundy/3 to-transparent blur-2xl" />
        
        {/* Decorative wine ring */}
        <svg
          className="absolute top-20 right-[10%] w-32 h-32 md:w-48 md:h-48 text-burgundy/10 animate-[spin_60s_linear_infinite]"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.2" />
        </svg>

        {/* Another decorative element */}
        <svg
          className="absolute bottom-32 left-[15%] w-24 h-24 md:w-36 md:h-36 text-burgundy/8"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M50 10 L90 50 L50 90 L10 50 Z"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path
            d="M50 25 L75 50 L50 75 L25 50 Z"
            stroke="currentColor"
            strokeWidth="0.3"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          className="text-burgundy opacity-0 animate-[fadeSlideUp_1s_ease-out_0.2s_forwards]"
        >
          Wine Terroir Simulator
        </h1>
        
        <p
          className="mt-6 text-xl md:text-2xl text-burgundy/70 font-light max-w-2xl mx-auto opacity-0 animate-[fadeSlideUp_1s_ease-out_0.4s_forwards]"
        >
          Explore how climate shapes the world's wines.
        </p>
        
        <div className="mt-10 opacity-0 animate-[fadeSlideUp_1s_ease-out_0.6s_forwards]">
          <button 
            onClick={scrollToSimulator}
            className="btn btn-primary text-base px-8 py-4 hover:scale-105 hover:shadow-xl hover:shadow-burgundy/20"
          >
            Start Exploring Terroir
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-[fadeSlideUp_1s_ease-out_1s_forwards]">
        <button 
          onClick={scrollToSimulator}
          className="w-6 h-10 border-2 border-burgundy/30 rounded-full flex justify-center pt-2 hover:border-burgundy/50 transition-colors"
        >
          <div className="w-1 h-2 bg-burgundy/50 rounded-full animate-[bounce_2s_infinite]" />
        </button>
      </div>
    </section>
  )
}
