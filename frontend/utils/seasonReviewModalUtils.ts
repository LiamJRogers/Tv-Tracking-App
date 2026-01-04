export function getSeasonReviewModalTexts(season?: { seasonNumber: number }) {
  const isSpecials = season?.seasonNumber === 0;
  return {
    heading: isSpecials
      ? "Specials Completed!"
      : `Season ${season?.seasonNumber} Completed!`,
    subtitle: isSpecials
      ? "Rate the special episodes and share your thoughts."
      : "Rate this season and share your thoughts.",
    placeholder: isSpecials
      ? "What did you think of the special episodes?"
      : "What did you think of the season?",
  };
}
