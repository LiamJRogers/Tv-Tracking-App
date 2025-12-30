import { useEffect, useState } from "react";
import { API_URL } from "../utils/getApiUtils";

export function useSeriesDetailData(seriesId?: number) {
  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (seriesId) {
      fetch(`${API_URL}/series/${seriesId}/seasons`)
        .then((res) => res.json())
        .then(setSeasons);

      fetch(`${API_URL}/series/${seriesId}/episodes`)
        .then((res) => res.json())
        .then(setEpisodes);

      fetch(`${API_URL}/series/${seriesId}/cast`)
        .then((res) => res.json())
        .then(setCast);
    }
  }, [seriesId]);

  return { seasons, episodes, cast };
}
