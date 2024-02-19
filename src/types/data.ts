import { FilmAPI } from './film';
import { PlanetAPI } from './planet';
import { SpecieAPI } from './specie';
import { StarshipAPI } from './starship';
import { VehicleAPI } from './vehicle';

export type DataAPI = FilmAPI | PlanetAPI | SpecieAPI | StarshipAPI | VehicleAPI;