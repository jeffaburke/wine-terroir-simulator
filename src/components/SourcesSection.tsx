const sources = [
  {
    source: 'Wikipedia',
    title: 'Willamette Valley',
    note: 'Verified annual rainfall ranges of 910mm to 2000mm depending on elevation.',
  },
  {
    source: 'Britannica',
    title: 'Oregon - Climate',
    note: 'Confirmed valley floor rainfall averages 900-1000mm.',
  },
  {
    source: 'For The Love Of Port',
    title: 'Weather in the Douro',
    note: 'Detailed breakdown of rainfall gradients from Baixo Corgo (900mm) to Douro Superior (400mm).',
  },
  {
    source: 'Primary Industries and Regions SA',
    title: 'The Barossa Valley',
    note: 'Confirmed average annual rainfall of 530mm-635mm.',
  },
  {
    source: 'Weather and Climate',
    title: 'Average Rainfall for Napa',
    note: 'Verified average precipitation of ~585mm.',
  },
  {
    source: 'Climates to Travel',
    title: 'Lyon Climate',
    note: 'Proxy data for Northern Rhône rainfall (~824mm).',
  },
  {
    source: 'Regions of France',
    title: 'Rhône-Alpes Weather',
    note: 'Confirmed continental/Mediterranean climate mix.',
  },
  {
    source: 'Berry Bros & Rudd',
    title: "Bordeaux's Climate",
    note: 'Verified annual rainfall average of 931mm.',
  },
  {
    source: 'Argento Wine',
    title: 'Mendoza Wine Regions',
    note: 'Verified vineyard altitudes for Uco Valley (900-1400m) and Central Region (600-1100m).',
  },
]

export function SourcesSection() {
  return (
    <section className="py-12 bg-beige-dark">
      <div className="max-w-4xl mx-auto px-6">
        <h3 className="text-center mb-8">Sources Used For Data</h3>
        <div className="space-y-3">
          {sources.map((item, idx) => (
            <div key={idx} className="text-sm text-burgundy/70">
              <span className="font-medium text-burgundy">{item.source}.</span>{' '}
              "{item.title}." {item.note}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

