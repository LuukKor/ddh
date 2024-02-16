import { FilmAPI } from './film';
import { PlanetAPI } from './planet';
import { SpecieAPI } from './specie';
import { StarshipAPI } from './starship';
import { VehicleAPI } from './vehicle';

export interface PeopleAPI {
  birth_year: string;
  eye_color: string;
  films: string[] | FilmAPI[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string | PlanetAPI;
  mass: string;
  name: string;
  skin_color: string;
  created: Date;
  edited: Date;
  species: string[] | SpecieAPI[];
  starships: string[] | StarshipAPI[];
  url: string;
  vehicles: string[] | VehicleAPI[];
}

export interface People {
  name: string;
}
