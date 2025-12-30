import React from "react";
import { View, Text } from "react-native";
import SeriesDetailHeader from "./SeriesDetailHeader";
import EpisodesList from "./EpisodesList";
import CastList from "./CastList";
import { styles } from "../../styles/seriesDetail.styles";
import { useSeasonDropdown } from "../../hooks/useSeasonDropdown";
import { AddToWatchlistButton } from "./AddToWatchlistButton";
import SeasonDropdown from "./SeasonDropdown";
import { Series, Season, Episode } from "../../types/series";

type SeriesDetailProps = {
  series: Series;
  seasons: Season[];
  episodes: Episode[];
  onButtonPress?: () => void;
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

  const selectedSeason = seasons.find((s) => s.id === selectedSeasonId);

  const filteredEpisodes =
    selectedSeasonId !== null
      ? episodes.filter((ep) => ep.seasonId === selectedSeasonId)
      : episodes;

  return (
    <View style={styles.container}>
      <SeriesDetailHeader series={series} />
      <View style={styles.addButtonWrapper}>
        <AddToWatchlistButton seriesId={series.id} />
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
        />
        <CastList cast={series.cast} />
      </View>
    </View>
  );
};

export default SeriesDetail;
