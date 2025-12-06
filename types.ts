export interface Recipient {
  no: number;
  nama: string;
  pbp: string;
  alamat: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}
