import { Series } from "../types/series";

export function extractAllGenres(seriesLists: Series[][]): string[] {
  return [...new Set(seriesLists.flat().flatMap((s) => s.genres || []))];
}
