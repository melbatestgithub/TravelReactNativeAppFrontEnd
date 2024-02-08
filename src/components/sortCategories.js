import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../theme";

const categoriesToShow = ["All", "Popular", "Recommend", "More"];

export default function SortCategories({  
  onSelectCategory: parentOnSelectCategory,
}) {
  const [activeSort, setActiveSort] = useState("All");

  const onSelectCategory = (sort) => {
    setActiveSort(sort);
    // Call the parent's onSelectCategory
    parentOnSelectCategory(sort);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: wp(4),
      }}
    >
      {categoriesToShow.map((sort, index) => {
        let isActive = sort === activeSort;
        let activeButtonStyle = isActive
          ? {
              backgroundColor: "white",
              shadowColor: "black",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }
          : {};
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onSelectCategory(sort)}
            style={{
              padding: wp(2),
              paddingHorizontal: wp(4),
              borderRadius: wp(10),
              ...activeButtonStyle,
            }}
          >
            <Text
              style={{
                fontSize: wp(4),
                color: isActive ? theme.text : "rgba(0,0,0,0.6)",
              }}
            >
              {sort}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
