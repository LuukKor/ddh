import { FilmAPI } from './film';
import { PeopleAPI } from './people';

export interface VehicleAPI {
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: Date;
  crew: string;
  edited: Date;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: string[] | PeopleAPI[];
  films: string[] | FilmAPI[];
  url: string;
  vehicle_class: string;
}
