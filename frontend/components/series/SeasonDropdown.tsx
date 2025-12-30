import React from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { View } from "react-native";
import { styles } from "../../styles/seriesDetail.styles";

type SeasonDropdownProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSeasonId: number | null;
  setSelectedSeasonId: React.Dispatch<React.SetStateAction<number | null>>;
  items: Array<{ label: string; value: number }>;
  setItems: React.Dispatch<
    React.SetStateAction<Array<{ label: string; value: number }>>
  >;
};

const SeasonDropdown: React.FC<SeasonDropdownProps> = ({
  open,
  setOpen,
  selectedSeasonId,
  setSelectedSeasonId,
  items,
  setItems,
}) => (
  <View style={styles.dropDownContainer}>
    <DropDownPicker
      open={open}
      value={selectedSeasonId}
      items={items}
      setOpen={setOpen}
      setValue={setSelectedSeasonId}
      setItems={setItems}
      containerStyle={{ width: 120 }}
      style={styles.dropDownPicker}
      dropDownContainerStyle={styles.dropDownPickerContainer}
      placeholder="Select Season"
      textStyle={styles.dropDownText}
      labelStyle={styles.dropDownLabel}
      listItemContainerStyle={styles.dropDownListItem}
      listMode="SCROLLVIEW"
    />
  </View>
);

export default SeasonDropdown;
