import { Series } from "../types/series";

export function parseSeriesParams(params: Record<string, any>): Series {
  return {
    id: params.seriesId ? Number(params.seriesId) : 0,
    external_id: params.external_id ? Number(params.external_id) : 0,
    name: params.name as string,
    genres: params.genres ? JSON.parse(params.genres as string) : [],
    rating: params.rating ? Number(params.rating) : undefined,
    description: params.description as string | undefined,
    release_date: params.release_date as string | undefined,
    poster_url: params.poster_url as string | undefined,
    background_url: params.background_url as string | undefined,
    cast: [],
  };
}
