import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../utils/getApiUtils";
import { Season, Episode } from "../types/series";

export function useSeasonReviewModal(
  userId: string | undefined,
  selectedSeason: Season | undefined,
  filteredEpisodes: Episode[],
  watched: number[]
) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [hasReviewedOrDismissed, setHasReviewedOrDismissed] = useState(false);
  const [reviewStatusLoading, setReviewStatusLoading] = useState(true);

  useEffect(() => {
    if (!userId || !selectedSeason) {
      setHasReviewedOrDismissed(false);
      setReviewStatusLoading(false);
      return;
    }
    setReviewStatusLoading(true);
    fetch(
      `${API_URL}/season-reviews?userId=${userId}&seasonId=${selectedSeason.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setHasReviewedOrDismissed(
          !!(data.review && (data.review.rating || data.review.dismissed))
        );
      })
      .catch(() => setHasReviewedOrDismissed(false))
      .finally(() => setReviewStatusLoading(false));
  }, [userId, selectedSeason?.id]);

  useEffect(() => {
    if (
      selectedSeason &&
      filteredEpisodes.length > 0 &&
      filteredEpisodes.every((ep) => watched.includes(ep.id)) &&
      !hasReviewedOrDismissed
    ) {
      setShowReviewModal(true);
    } else {
      setShowReviewModal(false);
    }
  }, [
    watched,
    selectedSeason,
    hasReviewedOrDismissed,
    filteredEpisodes.length,
  ]);

  const handleCloseModal = useCallback(() => {
    setShowReviewModal(false);
    setHasReviewedOrDismissed(true);
  }, []);

  return {
    showReviewModal,
    reviewStatusLoading,
    handleCloseModal,
    hasReviewedOrDismissed,
  };
}
