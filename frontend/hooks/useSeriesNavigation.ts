import { useRouter } from "expo-router";
import { Series } from "../types/series";

export function useSeriesNavigation() {
  const router = useRouter();
  return (series: Series) => {
    router.push({
      pathname: "/series/seriesId",
      params: {
        seriesId: series.id,
        external_id: series.external_id,
        name: series.name,
        genres: JSON.stringify(series.genres),
        rating: series.rating,
        description: series.description,
        release_date: series.release_date,
        poster_url: series.poster_url,
      },
    });
  };
}
