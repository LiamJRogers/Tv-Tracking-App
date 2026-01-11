import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import { View, FlatList } from "react-native";
import TopBar from "../../../../components/TopBar";
import SeriesDetail from "../../../../components/series/SeriesDetail";
import { useSeriesDetailData } from "../../../../hooks/useSeriesDetailData";
import { Series, Episode } from "../../../../types/series";
import { parseSeriesParams } from "../../../../utils/parseSeriesParams";

export default function SeriesDetailScreen() {
  const params = useLocalSearchParams();
  const series: Series = parseSeriesParams(params);

  const { seasons, episodes, cast } = useSeriesDetailData(series.id);

  return (
    <View style={{ flex: 1, backgroundColor: "#F6F7F8" }}>
      <Stack.Screen options={{ animation: "slide_from_right" }} />
      <TopBar showBackButton onNotifications={() => {}} />
      <FlatList<Episode>
        data={episodes}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <SeriesDetail
            series={{ ...series, cast }}
            seasons={seasons}
            episodes={episodes}
          />
        }
        renderItem={null}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
}
