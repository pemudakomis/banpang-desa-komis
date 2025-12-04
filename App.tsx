import React, { useState, useMemo } from 'react';
import { DATA_PENERIMA } from './data';
import { maskPBP, normalizeString } from './utils';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import RecipientList from './components/RecipientList';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  // Filter Logic
  const filteredData = useMemo(() => {
    const query = normalizeString(searchQuery);
    if (!query) return DATA_PENERIMA;

    return DATA_PENERIMA.filter((person) => {
      // 1. Check Name
      const nameMatch = normalizeString(person.nama).includes(query);
      
      // 2. Check Raw PBP
      const rawPbpMatch = person.pbp.includes(query);

      // 3. Check Masked PBP (User types "***")
      const maskedPbp = maskPBP(person.pbp);
      const maskedPbpMatch = maskedPbp.includes(searchQuery); // Case sensitive for asterisks usually, but let's keep it simple

      return nameMatch || rawPbpMatch || maskedPbpMatch;
    });
  }, [searchQuery]);

  // Pagination Logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Reset to page 1 if search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, itemsPerPage]);

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
      <header className="bg-gradient-to-r from-royal-blue to-blue-900 text-white pb-12 pt-10 px-4 shadow-lg text-center">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3">
          DAFTAR PENERIMA BANTUAN PANGAN
        </h1>
        <h2 className="text-lg md:text-2xl font-semibold text-blue-100 mb-2">
          DESA KOMIS 2025
        </h2>
        <p className="text-blue-200 text-sm md:text-base max-w-xl mx-auto">
          Cek nama Anda pada daftar di bawah ini. Gunakan fitur pencarian untuk kemudahan akses data.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 pb-8">
        
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="mt-8">
            <div className="flex justify-between items-end mb-4">
                <h3 className="text-xl font-bold text-gray-800 border-l-4 border-royal-blue pl-3">
                    Daftar Penerima
                </h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Total: {totalItems} Data
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
    </div>
  );
};

export default App;