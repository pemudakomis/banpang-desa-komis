export interface Recipient {
  no: number;
  nama: string;
  pbp: string;
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