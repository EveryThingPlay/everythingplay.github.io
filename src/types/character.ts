export namespace Character {
  export interface Response {
    info: PaginationInfo;
    results: Character[];
    error?:string;
  }

  export interface Filters {
    name?: string;
    status?: 'Alive'|'Dead'|'Unknown';
  }

  export interface Character {
    id: number;
    name: string;
    status: 'Alive'|'Dead'|'Unknown';
    species: string;
    type: string;
    gender: 'Male'|'Female';
    origin: Location;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: string;
  }

  export interface CharacterCard extends Character {
    firstEpisodeName: string;
  }

  interface Location {
    name: string;
    url: string;
  }

  export interface PaginationInfo {
    count: number;
    pages: number;
    next?: string;
    prev?: string;
  }
}