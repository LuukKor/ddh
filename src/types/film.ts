import { PeopleAPI } from './people';
import { PlanetAPI } from './planet';
import { SpecieAPI } from './specie';
import { StarshipAPI } from './starship';
import { VehicleAPI } from './vehicle';

export interface FilmAPI {
  characters: string[] | PeopleAPI[];
  created: Date;
  director: string;
  edited: Date;
  episode_id: string;
  opening_crawl: string;
  planets: string[] | PlanetAPI[];
  producer: string;
  release_date: Date;
  species: string[] | SpecieAPI[];
  starships: string[] | StarshipAPI[];
  title: string;
  url: string;
  vehicles: string[] | VehicleAPI[];
}
