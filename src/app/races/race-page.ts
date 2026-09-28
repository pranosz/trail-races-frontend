import { Race } from './race';

export interface RacePage {
  content: Race[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}