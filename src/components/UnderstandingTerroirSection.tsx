const blocks = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
    title: 'Temperature',
    description:
      'Heat speeds up ripening and so the fruit becomes sweet and loses acid. Cool air keeps the acid high. High acidity wines smell lighter and they taste sharp and elegant.',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
    title: 'Rainfall',
    description:
      'Vines need some water to stay healthy. Too much rain weakens the flavor also causing fungus. A lack of rain stresses the vine concentrating sugar in the grapes.',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 20l4-4m0 0l4-8 4 4 4-8M8 16l-4-4" />
        <circle cx="12" cy="4" r="2" />
      </svg>
    ),
    title: 'Altitude',
    description:
      'High elevations are cold but the sun hits harder there. The temperature drops at night and these shifts improve the color and taste. The grapes ripen fully but stay fresh.',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 22h20M6 18v4M10 14v8M14 10v12M18 6v16" />
        <circle cx="6" cy="14" r="2" />
        <circle cx="10" cy="10" r="2" />
        <circle cx="14" cy="6" r="2" />
        <circle cx="18" cy="2" r="2" />
      </svg>
    ),
    title: 'Soil Type',
    description:
      'Gravel and limestone drain water quickly due to this the roots must grow deep to survive making the flavor more intense. Clay holds onto water helping vines during droughts. Sand drains easily and holds heat. It produces wines with pale color and soft tannins. Volcanic soil adds a taste like wet stone.',
  },
]

export function UnderstandingTerroirSection() {
  return (
    <section id="learn" className="py-16 md:py-24 bg-beige">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2>Understanding Terroir</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            The unique combination of climate, soil, and geography that gives each wine its sense of place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {blocks.map((block) => (
            <div
              key={block.title}
              className="group p-6 bg-white/60 border border-gray/30 hover:border-burgundy/30 transition-all duration-300 hover:shadow-lg hover:shadow-burgundy/5"
            >
              <div className="text-burgundy/70 group-hover:text-burgundy transition-colors mb-4">
                {block.icon}
              </div>
              <h4 className="text-lg mb-3">{block.title}</h4>
              <p className="text-sm text-burgundy/70 leading-relaxed">
                {block.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
