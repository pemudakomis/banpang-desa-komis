import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12">
      {/* Complaint Service Section */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-6 md:p-8 mb-8 mx-4 md:mx-0 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-red-800 mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                    Layanan Pengaduan Masyarakat
                </h3>
                <p className="text-red-700/80 text-sm md:text-base leading-relaxed">
                    Menemukan data fiktif, penyalahgunaan bantuan, atau pengalihan hak kepada yang tidak berhak? 
                    Laporkan segera agar bantuan tersalurkan sesuai prosedur.
                </p>
            </div>
            <a 
                href="https://wa.me/62895391606768" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-3 rounded-lg shadow transition-transform hover:scale-105 whitespace-nowrap"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.05 20.15ZM16.61 14.9C16.36 14.78 15.14 14.18 14.91 14.1C14.69 14.01 14.53 13.97 14.36 14.22C14.2 14.47 13.72 15.03 13.57 15.2C13.43 15.36 13.28 15.38 13.03 15.26C12.78 15.13 11.98 14.87 11.03 14.02C10.29 13.37 9.79 12.56 9.66 12.31C9.53 12.07 9.65 11.95 9.78 11.82C9.89 11.7 10.03 11.53 10.15 11.38C10.28 11.23 10.32 11.12 10.4 10.96C10.48 10.8 10.44 10.66 10.38 10.53C10.32 10.41 9.85 9.25 9.65 8.78C9.46 8.32 9.26 8.38 9.11 8.38C8.97 8.38 8.81 8.38 8.64 8.38C8.48 8.38 8.21 8.44 7.98 8.69C7.75 8.94 7.11 9.54 7.11 10.76C7.11 11.98 8 13.16 8.12 13.32C8.25 13.49 10.05 16.26 12.8 17.45C13.46 17.73 13.97 17.9 14.37 18.03C15.06 18.25 15.69 18.21 16.18 18.14C16.73 18.06 17.88 17.45 18.12 16.77C18.36 16.09 18.36 15.51 18.29 15.39C18.22 15.26 18.06 15.19 17.81 15.07L16.61 14.9Z" />
                </svg>
                Lapor via WhatsApp
            </a>
        </div>
      </div>

      {/* Identity Section */}
      <div className="bg-slate-900 text-slate-300 py-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
            <p className="font-semibold text-white tracking-wide text-lg mb-2">© 2025 PEMUDA DESA KOMIS BERSATU</p>
            <p className="text-sm italic font-light opacity-80">"Mengawal Hak Rakyat Kecil"</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;