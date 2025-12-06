import React, { useState } from 'react';

const ComplaintForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    // A. Identitas Pelapor
    namaPelapor: '',
    hpPelapor: '',
    alamatPelapor: '',
    
    // B. Data Penerima
    namaKpm: '',
    nikKpm: '',
    dusunKpm: '', // Added Dusun Selection
    alamatKpm: '',
    statusDtks: 'Tidak Tahu',
    tahapCpp: 'Januari',
    
    // C. Masalah
    masalah: [] as string[],
    masalahLainnya: '',
    
    // D. Kronologi
    kronologi: ''
  });

  const dusunOptions = [
    "DSN. DUKO",
    "DSN. KOMIS",
    "DSN. MALAKAH",
    "DSN. TOTONGAN"
  ];

  const masalahOptions = [
    "Tidak menerima bantuan meskipun terdaftar",
    "Bantuan tidak sesuai jumlah/volume",
    "Kualitas beras buruk",
    "Pemotongan/pungli",
    "Salah sasaran",
    "Tidak transparan",
    "Manipulasi data / nepotisme",
    "Bantuan diganti barang lain",
    "Data penerima fiktif / tidak dikenal",
    "Penerima sudah meninggal namun masih tercatat"
  ];

  const handleCheckboxChange = (option: string) => {
    setFormData(prev => {
      const exists = prev.masalah.includes(option);
      if (exists) {
        return { ...prev, masalah: prev.masalah.filter(m => m !== option) };
      } else {
        return { ...prev, masalah: [...prev.masalah, option] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.dusunKpm) {
        alert("Mohon pilih Dusun terlebih dahulu.");
        return;
    }

    // Construct Message
    const masalahText = formData.masalah.map(m => `- ${m}`).join('\n');
    const masalahLain = formData.masalahLainnya ? `- Lainnya: ${formData.masalahLainnya}` : '';
    const fullMasalah = `${masalahText}\n${masalahLain}`.trim();

    // Construct Address
    const fullAddress = `${formData.dusunKpm} ${formData.alamatKpm ? '(' + formData.alamatKpm + ')' : ''}`;

    const message = `*LAPORAN PENGADUAN BANTUAN PANGAN CPP*

*A. Pelapor*
Nama: ${formData.namaPelapor}
No. HP: ${formData.hpPelapor}
Alamat: ${formData.alamatPelapor || '-'}

*B. Data Penerima*
Nama: ${formData.namaKpm}
NIK: ${formData.nikKpm}
Alamat: ${fullAddress}
Status DTKS: ${formData.statusDtks}
Tahap Penyaluran: ${formData.tahapCpp}

*C. Masalah yang Diadukan:*
${fullMasalah}

*D. Kronologi:*
${formData.kronologi}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/62895391606768?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full p-2"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </button>

        <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-red-700 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
                Form Pengaduan CPP
            </h2>
            <p className="text-sm text-gray-500 mb-6">Silakan isi formulir di bawah ini. Data akan otomatis terkirim ke WhatsApp Layanan Pengaduan.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* A. Pelapor */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-2">A. Identitas Pelapor</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pelapor *</label>
                            <input required type="text" className="w-full p-2 border rounded focus:ring-red-500 focus:border-red-500" 
                                value={formData.namaPelapor} onChange={e => setFormData({...formData, namaPelapor: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP *</label>
                            <input required type="tel" className="w-full p-2 border rounded focus:ring-red-500 focus:border-red-500" 
                                value={formData.hpPelapor} onChange={e => setFormData({...formData, hpPelapor: e.target.value})} />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Pelapor</label>
                            <input type="text" className="w-full p-2 border rounded focus:ring-red-500 focus:border-red-500" 
                                value={formData.alamatPelapor} onChange={e => setFormData({...formData, alamatPelapor: e.target.value})} />
                        </div>
                    </div>
                </div>

                {/* B. Data Penerima */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-2">B. Data Penerima Bantuan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penerima (KPM) *</label>
                            <input required type="text" className="w-full p-2 border rounded focus:ring-red-500 focus:border-red-500" 
                                value={formData.namaKpm} onChange={e => setFormData({...formData, namaKpm: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">NIK Penerima *</label>
                            <input required type="text" className="w-full p-2 border rounded focus:ring-red-500 focus:border-red-500" 
                                value={formData.nikKpm} onChange={e => setFormData({...formData, nikKpm: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dusun Penerima *</label>
                            <select 
                                required
                                className="w-full p-2 border rounded focus:ring-red-500 focus:border-red-500"
                                value={formData.dusunKpm} 
                                onChange={e => setFormData({...formData, dusunKpm: e.target.value})}
                            >
                                <option value="">-- Pilih Dusun --</option>
                                {dusunOptions.map(dusun => (
                                    <option key={dusun} value={dusun}>{dusun}</option>
                                ))}
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Detail Alamat (RT/RW) (Opsional)</label>
                            <input type="text" className="w-full p-2 border rounded focus:ring-red-500 focus:border-red-500" 
                                value={formData.alamatKpm} onChange={e => setFormData({...formData, alamatKpm: e.target.value})} 
                                placeholder="Contoh: RT 01 RW 01" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status DTKS</label>
                            <select className="w-full p-2 border rounded focus:ring-red-500 focus:border-red-500"
                                value={formData.statusDtks} onChange={e => setFormData({...formData, statusDtks: e.target.value})}>
                                <option value="Terdaftar">Terdaftar</option>
                                <option value="Tidak Terdaftar">Tidak Terdaftar</option>
                                <option value="Tidak Tahu">Tidak Tahu</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tahap Penyaluran</label>
                            <select className="w-full p-2 border rounded focus:ring-red-500 focus:border-red-500"
                                value={formData.tahapCpp} onChange={e => setFormData({...formData, tahapCpp: e.target.value})}>
                                {["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"].map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* C. Jenis Permasalahan */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-2">C. Jenis Permasalahan</h3>
                    <div className="space-y-2">
                        {masalahOptions.map((opt, idx) => (
                            <label key={idx} className="flex items-start gap-2 cursor-pointer">
                                <input type="checkbox" className="mt-1 rounded text-red-600 focus:ring-red-500" 
                                    checked={formData.masalah.includes(opt)}
                                    onChange={() => handleCheckboxChange(opt)}
                                />
                                <span className="text-sm text-gray-700">{opt}</span>
                            </label>
                        ))}
                         <div className="pt-2">
                             <input type="text" placeholder="Lainnya (tuliskan masalah lain...)" 
                                className="w-full p-2 border rounded text-sm focus:ring-red-500 focus:border-red-500"
                                value={formData.masalahLainnya} onChange={e => setFormData({...formData, masalahLainnya: e.target.value})} />
                         </div>
                    </div>
                </div>

                {/* D. Kronologi */}
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">D. Kronologi Kejadian *</label>
                     <textarea required rows={4} className="w-full p-2 border rounded focus:ring-red-500 focus:border-red-500"
                        value={formData.kronologi} onChange={e => setFormData({...formData, kronologi: e.target.value})}></textarea>
                </div>

                <div className="flex gap-3 pt-2">
                    <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">
                        Batal
                    </button>
                    <button type="submit" className="flex-1 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.05 20.15ZM16.61 14.9C16.36 14.78 15.14 14.18 14.91 14.1C14.69 14.01 14.53 13.97 14.36 14.22C14.2 14.47 13.72 15.03 13.57 15.2C13.43 15.36 13.28 15.38 13.03 15.26C12.78 15.13 11.98 14.87 11.03 14.02C10.29 13.37 9.79 12.56 9.66 12.31C9.53 12.07 9.65 11.95 9.78 11.82C9.89 11.7 10.03 11.53 10.15 11.38C10.28 11.23 10.32 11.12 10.4 10.96C10.48 10.8 10.44 10.66 10.38 10.53C10.32 10.41 9.85 9.25 9.65 8.78C9.46 8.32 9.26 8.38 9.11 8.38C8.97 8.38 8.81 8.38 8.64 8.38C8.48 8.38 8.21 8.44 7.98 8.69C7.75 8.94 7.11 9.54 7.11 10.76C7.11 11.98 8 13.16 8.12 13.32C8.25 13.49 10.05 16.26 12.8 17.45C13.46 17.73 13.97 17.9 14.37 18.03C15.06 18.25 15.69 18.21 16.18 18.14C16.73 18.06 17.88 17.45 18.12 16.77C18.36 16.09 18.36 15.51 18.29 15.39C18.22 15.26 18.06 15.19 17.81 15.07L16.61 14.9Z" />
                        </svg>
                        Kirim Pengaduan via WhatsApp
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;