export function Footer() {
  return (
    <footer className="py-12 bg-burgundy">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="font-heading text-xl mb-2 text-beige">Wine Terroir Simulator</h4>
            <p className="text-sm !text-beige/70">
              Exploring the art and science of winemaking through terroir.
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <a href="#simulator" className="!text-beige/80 hover:!text-beige transition-colors no-underline">Simulator</a>
            <a href="#learn" className="!text-beige/80 hover:!text-beige transition-colors no-underline">Learn</a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-beige/20 text-center text-sm space-y-1">
          <p className="!text-beige/80">Created by Jeffrey Burke · <a href="mailto:jab9209@rit.edu" className="!text-beige/80 underline hover:!text-beige transition-colors">jab9209@rit.edu</a></p>
          <p className="!text-beige/80">Wines of The World 1 · HSPT.161.02</p>
          <p className="!text-beige/60 text-xs mt-3">© {new Date().getFullYear()} Wine Terroir Simulator. For educational purposes.</p>
        </div>
      </div>
    </footer>
  )
}
