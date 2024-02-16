import { FilmAPI } from './film';
import { PeopleAPI } from './people';
import { PlanetAPI } from './planet';

export interface SpecieAPI {
  average_height: string;
  average_lifespan: string;
  classification: string;
  created: Date;
  designation: string;
  edited: Date;
  eye_colors: string;
  hair_colors: string;
  homeworld: string | PlanetAPI;
  language: string;
  name: string;
  people: string[] | PeopleAPI[];
  films: string[] | FilmAPI[];
  skin_colors: string;
  url: string;
}
