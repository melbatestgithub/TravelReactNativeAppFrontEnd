import { View, Text, TouchableOpacity, Image, Alert ,TextInput} from "react-native";
import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function CountryScreen() {
  const navigation = useNavigation();
  const [country, setCountry] = useState([]);
  const [searchItem,setSearchItem]=useState("")

  useEffect(() => {
    fetchData();
  }, []);


  const filteredCountries = country.filter((item) =>
    item.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.48.15:6500/api/v1/country/allCountry"
      );
      setCountry(response.data.countries);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch data from the server");
    }
  };
  return (
    <>
      <View className="mx-5 mb-4">
        <View className="flex-row items-center bg-neutral-100 rounded-full p-4 space-x-2 pl-6">
          <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
          <TextInput
            placeholder="Search destination"
            placeholderTextColor={"gray"}
            className="flex-1 text-base mb-1 pl-1 tracking-wider"
            onChangeText={(text) => setSearchItem(text)}
          />
        </View>
      </View>
      <View className="mx-4 flex-row justify-between flex-wrap">
        {filteredCountries.map((item, index) => {
          return (
            <DestinationCard navigation={navigation} item={item} key={index} />
          );
        })}
      </View>
    </>
  );
}

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
