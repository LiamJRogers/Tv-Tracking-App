import React, { useState } from "react";
import { View } from "react-native";
import TopBar from "../../components/TopBar";
import { MySeriesTabBar } from "../../components/myseries/MySeriesTabBar";
import { WatchingTab } from "../../components/myseries/WatchingTab";
import { WatchlistTab } from "../../components/myseries/WatchlistTab";
import { CompletedTab } from "../../components/myseries/CompletedTab";
import { useSeriesNavigation } from "../../hooks/useSeriesNavigation";
import { useMySeriesTabData } from "../../hooks/useMySeriesTabData";

const TAB_LABELS = ["Watching", "Watchlist", "Completed"];

export default function MySeriesScreen() {
  const [activeTab, setActiveTab] = useState("Watching");
  const handleSeriesPress = useSeriesNavigation();

  const {
    userWatchlist,
    userWatching,
    userCompleted,
    loadingWatchlist,
    loadingWatching,
    loadingCompleted,
  } = useMySeriesTabData(activeTab);

  return (
    <View style={{ flex: 1 }}>
      <TopBar onNotifications={() => {}} showBorder={false} />
      <MySeriesTabBar
        labels={TAB_LABELS}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <View style={{ flex: 1 }}>
        {activeTab === "Watching" && (
          <WatchingTab
            loading={loadingWatching}
            data={userWatching}
            onSeriesPress={handleSeriesPress}
          />
        )}
        {activeTab === "Watchlist" && (
          <WatchlistTab
            loading={loadingWatchlist}
            data={userWatchlist}
            onSeriesPress={handleSeriesPress}
          />
        )}
        {activeTab === "Completed" && (
          <CompletedTab
            loading={loadingCompleted}
            data={userCompleted}
            onSeriesPress={handleSeriesPress}
          />
        )}
      </View>
    </View>
  );
}
