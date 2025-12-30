import { useState, useEffect } from "react";
import { sortSeasons } from "../utils/sortSeasons";

export function useSeasonDropdown(
  seasons: Array<{ id: number; seasonNumber: number }>
) {
  const [open, setOpen] = useState(false);
  const [selectedSeasonId, setSelectedSeasonId] = useState<number | null>(
    seasons.length > 0 ? seasons[0].id : null
  );
  const [items, setItems] = useState(
    sortSeasons(seasons).map((season) => ({
      label:
        season.seasonNumber === 0
          ? "Specials"
          : `Season ${season.seasonNumber}`,
      value: season.id,
    }))
  );

  useEffect(() => {
    const sortedSeasons = sortSeasons(seasons);
    setItems(
      sortedSeasons.map((season) => ({
        label:
          season.seasonNumber === 0
            ? "Specials"
            : `Season ${season.seasonNumber}`,
        value: season.id,
      }))
    );
    if (seasons.length > 0 && selectedSeasonId === null) {
      setSelectedSeasonId(sortedSeasons[0]?.id ?? null);
    }
  }, [seasons]);

  return {
    open,
    setOpen,
    selectedSeasonId,
    setSelectedSeasonId,
    items,
    setItems,
  };
}
