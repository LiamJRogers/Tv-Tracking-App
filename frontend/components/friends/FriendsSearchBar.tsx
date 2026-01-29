import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { styles as searchBarStyles } from "../../styles/searchScreen.styles";

type FriendsSearchBarProps = {
  query: string;
  setQuery: (q: string) => void;
  clear: () => void;
};

export function FriendsSearchBar({
  query,
  setQuery,
  clear,
}: FriendsSearchBarProps) {
  return (
    <View style={searchBarStyles.searchBarWrapper}>
      <MaterialIcons
        name="search"
        size={24}
        color="#64748B"
        style={{ marginRight: 8 }}
      />
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search for friends..."
        style={searchBarStyles.searchInput}
        placeholderTextColor="#B0B0B0"
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={clear} style={{ marginLeft: 8 }}>
          <MaterialIcons name="close" size={24} color="#64748B" />
        </TouchableOpacity>
      )}
    </View>
  );
}
