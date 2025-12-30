export interface BoardingPassData {
  passengerName: string;
  airline: string;
  flightNumber: string;
  originCode: string;
  originCity: string;
  destinationCode: string;
  destinationCity: string;
  date: string;
  time: string;
  gate: string;
  seat: string;
  classType: string; // Economy, Business, First
  group: string;
  remarks: string;
  notes: string; // New field for custom text
}

export enum ThemeType {
  Classic = 'Classic',
  Modern = 'Modern',
  Dark = 'Dark',
  Retro = 'Retro',
}

export enum PatternType {
  None = 'none',
  Dots = 'dots',
  Lines = 'lines',
  Grid = 'grid',
  Globe = 'globe',
}

export interface StyleConfig {
  theme: ThemeType;
  primaryColor: string;
  accentColor: string;
  bgColor: string; // Custom card background
  width: number; // Custom width scaling
  logoUrl?: string; // Custom uploaded logo
  bgPattern: PatternType;
}

export const INITIAL_DATA: BoardingPassData = {
  passengerName: 'CHAN / TAI MAN MR',
  airline: 'Cathay Pacific',
  flightNumber: 'CX 888',
  originCode: 'HKG',
  originCity: 'Hong Kong',
  destinationCode: 'YVR',
  destinationCity: 'Vancouver',
  date: '2025-1-12',
  time: '00:30',
  gate: '60',
  seat: '11A',
  classType: 'Business',
  group: '1',
  remarks: 'Lounge Invitation',
  notes: ''
};

export const INITIAL_STYLE: StyleConfig = {
  theme: ThemeType.Modern,
  primaryColor: '#006B54', // Cathay Jade Green
  accentColor: '#B6A984', // Brushwing Gold/Beige
  bgColor: '#ffffff',
  width: 100, // Percentage or arbitrary scale unit
  logoUrl: undefined,
  bgPattern: PatternType.None,
};