// AllCountry.js
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const Popular = ({ popular }) => {
  const navigation = useNavigation();
  return (
    <View className="mx-4 my-4 flex-row justify-between flex-wrap">
      {popular.map((item, index) => (
        <DestinationCard navigation={navigation} item={item} key={index} />
      ))}
    </View>
  );
};
const DestinationCard = ({ item, navigation }) => {
  const handleClick = () => {
    if (item && item._id) {
      navigation.navigate("Place", { countryId: item._id });
    } else {
      console.error("Country ID is undefined in the item:", item);
    }
  };
  const [isFavourite, toggleFavourite] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        handleClick();
      }}
      style={{ width: wp(44), height: wp(65) }}
      className="flex justify-end relative p-4 py-6 space-y-2 mb-5"
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: wp(44), height: wp(65), borderRadius: 35 }}
        className="absolute"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={{
          width: wp(44),
          height: hp(15),
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="absolute bottom-0"
      />
      <TouchableOpacity
        onPress={() => toggleFavourite(!isFavourite)}
        style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
        className="absolute top-1 right-3 rounded-full p-3"
      >
        <HeartIcon size={wp(5)} color={isFavourite ? "red" : "white"} />
      </TouchableOpacity>

      <Text style={{ fontSize: wp(4) }} className="text-white font-semibold">
        {item.name}
      </Text>
      <Text style={{ fontSize: wp(2.2) }} className="text-white">
        {item.description}
      </Text>
    </TouchableOpacity>
  );
};

export default Popular;
