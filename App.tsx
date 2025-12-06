import React, { useState, useMemo, useEffect } from 'react';
import { DATA_PENERIMA } from './data';
import { maskPBP, normalizeString } from './utils';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import RecipientList from './components/RecipientList';
import Footer from './components/Footer';
import ComplaintForm from './components/ComplaintForm';

const DUSUN_OPTIONS = [
  { label: 'Semua', value: 'SEMUA' },
  { label: 'Dsn. Duko', value: 'DSN. DUKO' },
  { label: 'Dsn. Komis', value: 'DSN. KOMIS' },
  { label: 'Dsn. Malakah', value: 'DSN. MALAKAH' },
  { label: 'Dsn. Totongan', value: 'DSN. TOTONGAN' },
];

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDusun, setSelectedDusun] = useState('SEMUA');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [isComplaintFormOpen, setIsComplaintFormOpen] = useState(false);

  // Filter Logic
  const filteredData = useMemo(() => {
    let data = DATA_PENERIMA;

    // 1. Filter by Dusun
    if (selectedDusun !== 'SEMUA') {
      data = data.filter(person => person.alamat === selectedDusun);
    }

    // 2. Filter by Search Query
    const query = normalizeString(searchQuery);
    if (!query) return data;

    return data.filter((person) => {
      // 1. Check Name
      const nameMatch = normalizeString(person.nama).includes(query);
      
      // 2. Check Raw PBP
      const rawPbpMatch = person.pbp.includes(query);

      // 3. Check Masked PBP (User types "***")
      const maskedPbp = maskPBP(person.pbp);
      const maskedPbpMatch = maskedPbp.includes(searchQuery);
      
      // 4. Check Dusun (Useful if global search)
      const dusunMatch = normalizeString(person.alamat).includes(query);

      return nameMatch || rawPbpMatch || maskedPbpMatch || dusunMatch;
    });
  }, [searchQuery, selectedDusun]);

  // Pagination Logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Reset to page 1 if search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, itemsPerPage, selectedDusun]);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage, filteredData]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-royal-blue to-blue-900 text-white pb-16 pt-10 px-4 shadow-lg text-center relative">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3">
          DAFTAR PENERIMA BANTUAN PANGAN
        </h1>
        <h2 className="text-lg md:text-2xl font-semibold text-blue-100 mb-2">
          DESA KOMIS 2025
        </h2>
        <p className="text-blue-200 text-sm md:text-base max-w-xl mx-auto">
          Cek nama Anda pada daftar di bawah ini. Pilih Dusun atau gunakan pencarian untuk menemukan data.
        </p>

        {/* Floating Complaint Button (Visible on desktop header) */}
        <button 
            onClick={() => setIsComplaintFormOpen(true)}
            className="hidden md:flex absolute top-6 right-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md items-center gap-2 transition-transform hover:scale-105"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            Buat Pengaduan
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 pb-8">
        
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Dusun Filter Buttons */}
        <div className="mt-8 mb-6">
          <p className="text-center text-sm text-gray-500 mb-3 font-medium">Pilih Wilayah Dusun:</p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {DUSUN_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedDusun(option.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm border
                  ${selectedDusun === option.value 
                    ? 'bg-royal-blue text-white border-royal-blue shadow-md transform scale-105' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'}
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Complaint Button (Visible below filters on mobile) */}
        <div className="md:hidden mt-4 flex justify-center mb-8">
            <button 
                onClick={() => setIsComplaintFormOpen(true)}
                className="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl font-bold shadow-sm flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
                Laporkan Masalah Bantuan
            </button>
        </div>

        <div className="">
            <div className="flex flex-col md:flex-row justify-between items-end mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 border-l-4 border-royal-blue pl-3">
                      {selectedDusun === 'SEMUA' ? 'Daftar Semua Penerima' : `Daftar Penerima ${DUSUN_OPTIONS.find(o => o.value === selectedDusun)?.label}`}
                  </h3>
                  {searchQuery && (
                    <p className="text-sm text-gray-500 mt-1 pl-4">
                      Hasil pencarian untuk: <span className="font-semibold text-gray-700">"{searchQuery}"</span>
                    </p>
                  )}
                </div>
                <span className="text-sm text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">
                    Total: <span className="font-bold text-royal-blue">{totalItems}</span> Data
                </span>
            </div>
            
            <RecipientList data={currentData} />
            
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                onPageChange={handlePageChange}
                onItemsPerPageChange={setItemsPerPage}
            />
        </div>
      </main>

      <Footer />

      {/* Complaint Modal */}
      {isComplaintFormOpen && (
        <ComplaintForm onClose={() => setIsComplaintFormOpen(false)} />
      )}
    </div>
  );
};

export default App;