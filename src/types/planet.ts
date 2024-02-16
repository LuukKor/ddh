import { FilmAPI } from './film';
import { PeopleAPI } from './people';

export interface PlanetAPI {
  climate: string;
  created: Date;
  diameter: string;
  edited: Date;
  films: string[] | FilmAPI[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[] | PeopleAPI[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}
