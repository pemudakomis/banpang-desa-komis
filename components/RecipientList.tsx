import React from 'react';
import { Recipient } from '../types';
import { maskPBP } from '../utils';

interface RecipientListProps {
  data: Recipient[];
}

const RecipientList: React.FC<RecipientListProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm mt-4">
        <div className="text-gray-400 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">Data tidak ditemukan</h3>
        <p className="text-gray-500">Silakan cek ejaan nama atau nomor PBP Anda.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5 mt-6">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-blue-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-royal-blue sm:pl-6 w-20">
                No
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-royal-blue">
                Nama
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-royal-blue">
                Nomor PBP
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((person) => (
              <tr key={person.pbp} className="hover:bg-sky-50 transition-colors">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {person.no}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 font-medium">
                  {person.nama}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-mono">
                  {maskPBP(person.pbp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden mt-6 space-y-4">
        {data.map((person) => (
          <div key={person.pbp} className="bg-white rounded-lg shadow-sm border-l-4 border-sky-custom p-4 flex flex-col gap-1">
            <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">No. {person.no}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mt-1">{person.nama}</h3>
            <div className="mt-2 flex flex-col">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Nomor PBP</span>
              <span className="text-md font-mono text-royal-blue font-medium">{maskPBP(person.pbp)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecipientList;