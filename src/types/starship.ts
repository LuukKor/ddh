import { FilmAPI } from './film';
import { PeopleAPI } from './people';

export interface StarshipAPI {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  crew: string;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  films: string[] | FilmAPI[];
  pilots: string[] | PeopleAPI[];
  starship_class: string;
  url: string;
  created: Date;
  edited: Date;
}
