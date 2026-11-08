export type Location = {
  id: string;
  city: string;
  district: string;
};

export const LOCATIONS: Location[] = [
  { id: 'semarang', city: 'Semarang', district: 'Tembalang' },
  { id: 'surakarta', city: 'Surakarta', district: 'Laweyan' },
  { id: 'salatiga', city: 'Salatiga', district: 'Sidorejo' },
  { id: 'magelang', city: 'Magelang', district: 'Magelang Tengah' },
  { id: 'pekalongan', city: 'Pekalongan', district: 'Pekalongan Barat' },
  { id: 'tegal', city: 'Tegal', district: 'Tegal Timur' },
  { id: 'kudus', city: 'Kudus', district: 'Kota Kudus' },
  { id: 'purwokerto', city: 'Purwokerto', district: 'Purwokerto Selatan' },
];

export const DEFAULT_LOCATION: Location = LOCATIONS[0];