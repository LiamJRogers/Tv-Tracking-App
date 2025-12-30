import { CastMember } from "./cast";

export type Series = {
  id: number;
  external_id: number;
  name: string;
  genres: string[];
  rating?: number;
  description?: string;
  release_date?: string;
  poster_url?: string;
  background_url?: string;
  cast: CastMember[];
};

export type Season = {
  id: number;
  seasonNumber: number;
};

export type Episode = {
  id: number;
  name: string;
  episodeNumber: number;
  seasonId: number;
  description?: string;
};
