import { useState, useEffect } from "react";
import { API_URL } from "../utils/getApiUtils";
import { Series } from "../types/series";
import { extractAllGenres } from "../utils/extractGenres";

export function useDiscoverData() {
  const [selectedGenre, setSelectedGenre] = useState<string>();
  const [newlyAdded, setNewlyAdded] = useState<Series[]>([]);
  const [topRated, setTopRated] = useState<Series[]>([]);
  const [allGenres, setAllGenres] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/discover`)
      .then((res) => res.json())
      .then((data) => {
        setNewlyAdded(data.newlyAdded || []);
        setTopRated(data.topRated || []);
        setAllGenres(extractAllGenres([data.topRated || []]));
      });
  }, []);

  const filteredTopRated = selectedGenre
    ? topRated.filter((series) => (series.genres || []).includes(selectedGenre))
    : topRated;

  return {
    selectedGenre,
    setSelectedGenre,
    newlyAdded,
    topRated,
    allGenres,
    filteredTopRated,
  };
}
