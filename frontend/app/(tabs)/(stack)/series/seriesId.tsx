import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, FlatList } from "react-native";
import TopBar from "../../../../components/TopBar";
import SeriesDetail from "../../../../components/series/SeriesDetail";
import { useSeriesDetailData } from "../../../../hooks/useSeriesDetailData";
import { Series, Episode } from "../../../../types/series";
import { parseSeriesParams } from "../../../../utils/parseSeriesParams";

export default function SeriesDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const series: Series = parseSeriesParams(params);

  const { seasons, episodes, cast } = useSeriesDetailData(series.id);

  return (
    <View style={{ flex: 1, backgroundColor: "#F6F7F8" }}>
      <TopBar
        showBackButton
        onBack={() => router.back()}
        onSearch={() => {}}
        onNotifications={() => {}}
      />
      <FlatList<Episode>
        data={episodes}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <SeriesDetail
            series={{ ...series, cast }}
            seasons={seasons}
            episodes={episodes}
            onButtonPress={() => {}}
          />
        }
        renderItem={null}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
}
