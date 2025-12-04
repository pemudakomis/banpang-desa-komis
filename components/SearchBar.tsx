import React from 'react';
import { SearchProps } from '../types';

const SearchBar: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-3xl mx-auto -mt-8 relative z-10 px-4">
      <div className="bg-white p-2 rounded-xl shadow-lg flex items-center border border-gray-100">
        <div className="pl-4 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Cari Nama atau Nomor PBP..."
          className="w-full p-4 text-lg text-gray-700 placeholder-gray-400 focus:outline-none rounded-r-xl"
        />
        {value && (
            <button 
                onClick={() => onChange('')}
                className="pr-4 text-gray-400 hover:text-gray-600"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;