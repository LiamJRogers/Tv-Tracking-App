import React from "react";
import { View, Text } from "react-native";
import SeriesDetailHeader from "./SeriesDetailHeader";
import EpisodesList from "./EpisodesList";
import CastList from "./CastList";
import { styles } from "../../styles/seriesDetail.styles";
import { useSeasonDropdown } from "../../hooks/useSeasonDropdown";
import { AddToWatchlistButton } from "./AddToWatchlistButton";
import { SeriesCompletedButton } from "./SeriesCompletedButton";
import SeasonDropdown from "./SeasonDropdown";
import { Series, Season, Episode } from "../../types/series";
import { useWatchedEpisodes } from "../../hooks/useWatchedEpisodes";
import SeasonReviewModal from "./SeasonReviewModal";
import { useAuth } from "../../hooks/AuthContext";
import { useSeasonReviewModal } from "../../hooks/useSeasonReviewModal";
import {
  getFilteredEpisodes,
  isSeriesCompleted,
} from "../../utils/seriesHelpers";

type SeriesDetailProps = {
  series: Series;
  seasons: Season[];
  episodes: Episode[];
};

const SeriesDetail: React.FC<SeriesDetailProps> = ({
  series,
  seasons,
  episodes,
}) => {
  const {
    open,
    setOpen,
    selectedSeasonId,
    setSelectedSeasonId,
    items,
    setItems,
  } = useSeasonDropdown(seasons);

  const { user } = useAuth();
  const selectedSeason = seasons.find((s) => s.id === selectedSeasonId);
  const filteredEpisodes = getFilteredEpisodes(episodes, selectedSeasonId);

  const {
    watched,
    loading: watchedLoading,
    markWatched,
    unmarkWatched,
  } = useWatchedEpisodes(series.id);

  const completed = isSeriesCompleted(episodes, watched);

  const { showReviewModal, reviewStatusLoading, handleCloseModal } =
    useSeasonReviewModal(user?.id, selectedSeason, filteredEpisodes, watched);

  return (
    <View style={styles.container}>
      <SeriesDetailHeader series={series} />
      <View style={styles.addButtonWrapper}>
        {completed ? (
          <SeriesCompletedButton />
        ) : (
          <AddToWatchlistButton seriesId={series.id} />
        )}
      </View>
      <View style={styles.episodesHeader}>
        <Text style={styles.episodesTitle}>Episodes</Text>
        <SeasonDropdown
          open={open}
          setOpen={setOpen}
          selectedSeasonId={selectedSeasonId}
          setSelectedSeasonId={setSelectedSeasonId}
          items={items}
          setItems={setItems}
        />
      </View>
      <View style={styles.episodesListWrapper}>
        <EpisodesList
          episodes={filteredEpisodes}
          seasons={selectedSeason ? [selectedSeason] : []}
          seriesId={series.id}
          watched={watched}
          loading={watchedLoading}
          markWatched={markWatched}
          unmarkWatched={unmarkWatched}
        />
        <CastList cast={series.cast} />
      </View>
      {user?.id && !reviewStatusLoading && showReviewModal && (
        <SeasonReviewModal
          visible
          onClose={handleCloseModal}
          season={selectedSeason}
          seriesId={series.id}
          userId={user.id}
        />
      )}
    </View>
  );
};

export default SeriesDetail;
