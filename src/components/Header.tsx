import { CONFIG, buildWhatsAppGeneralLink } from '../config'
import { WhatsAppIcon } from './WhatsAppIcon'

export function Header() {
  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="font-heading font-900 text-xl leading-tight tracking-wide">
            {CONFIG.storeName}
          </div>
          <div className="text-green-400 text-xs font-semibold tracking-widest uppercase -mt-0.5">
            {CONFIG.tagline}
          </div>
        </div>

        {/* Feature pills – hidden on small screens */}
        <nav className="hidden md:flex items-center gap-6 text-xs text-gray-300 font-body">
          <div className="flex items-center gap-1.5">
            <span className="text-base">📦</span>
            <span className="leading-tight">150+ MODELE<br />DISPONIBILE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base">🏷️</span>
            <span className="leading-tight">PREȚURI DE<br />LICHIDARE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base">🚚</span>
            <span className="leading-tight">LIVRARE RAPIDĂ<br />ÎN ROMÂNIA</span>
          </div>
        </nav>

        {/* CTA */}
        <a
          href={buildWhatsAppGeneralLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-2 bg-green-600 hover:bg-green-500 
                     text-white font-heading font-700 text-sm tracking-wide uppercase
                     px-4 py-2 rounded transition-colors duration-150"
        >
          <WhatsAppIcon size={16} />
          <span className="hidden sm:inline">CONTACTEAZĂ-MĂ PE WHATSAPP</span>
          <span className="sm:hidden">WHATSAPP</span>
        </a>
      </div>
    </header>
  )
}
