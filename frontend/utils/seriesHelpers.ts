import { Episode } from "../types/series";

export function getFilteredEpisodes(
  episodes: Episode[],
  seasonId: number | null
) {
  return seasonId !== null
    ? episodes.filter((ep) => ep.seasonId === seasonId)
    : episodes;
}

export function isSeriesCompleted(episodes: Episode[], watched: number[]) {
  const allIds = episodes.map((ep) => ep.id);
  return allIds.length > 0 && allIds.every((id) => watched.includes(id));
}
