export function sortSeasons<T extends { seasonNumber: number }>(
  seasons: T[]
): T[] {
  return [
    ...seasons.filter((s) => s.seasonNumber !== 0),
    ...seasons.filter((s) => s.seasonNumber === 0),
  ];
}
