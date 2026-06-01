import { CONFIG, buildWhatsAppGeneralLink } from "../config";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Contact */}
          <div className="space-y-1">
            <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-2">
              Contact
            </p>
            <div className="flex items-center gap-2 text-gray-300">
              <WhatsAppIcon
                size={14}
                className="text-green-400 flex-shrink-0"
              />
              <span>WhatsApp</span>
            </div>
            <a
              href={buildWhatsAppGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 font-medium transition-colors"
            >
              {CONFIG.whatsappNumber
                .replace(/^40/, "0")
                .replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")}
            </a>
          </div>

          {/* Delivery */}
          <div className="space-y-1">
            <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-2">
              Livrare
            </p>
            <p className="text-gray-300">Livrare rapidă în toată țara</p>
            <p className="text-gray-500 text-xs">
              prin curier Fan Courier / DPD
            </p>
          </div>

          {/* Wholesale prices */}
          <div className="space-y-1">
            <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-2">
              Prețuri Angro
            </p>
            <p className="text-gray-300">Direct de la producător</p>
            <p className="text-gray-500 text-xs">fără intermediari</p>
          </div>

          {/* Response */}
          <div className="space-y-1">
            <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-2">
              Răspundem Rapid
            </p>
            <p className="text-gray-300">Scrie-ne pe WhatsApp</p>
            <p className="text-gray-500 text-xs">și îți răspundem imediat!</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-heading font-800 text-lg tracking-wide">
              {CONFIG.storeName}
            </span>
            <span className="text-green-400 text-xs ml-2 tracking-widest">
              {CONFIG.tagline}
            </span>
          </div>
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Toate drepturile rezervate
          </p>
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <a
        href={buildWhatsAppGeneralLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-400 
                   text-white rounded-full w-14 h-14 flex items-center justify-center
                   shadow-xl hover:shadow-green-500/30 hover:scale-110 transition-all duration-200"
        aria-label="Contactează-ne pe WhatsApp"
      >
        <WhatsAppIcon size={26} />
      </a>
    </footer>
  );
}
