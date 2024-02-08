import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  Button,
  ScrollView,
} from "react-native";
import { MagnifyingGlassIcon, HeartIcon } from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { theme } from "../theme";

export default function PlaceScreen({ route }) {
  const { countryId } = route.params;
  const navigation = useNavigation();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  useEffect(() => {
    console.log("Country ID from route params:", countryId);
    if (countryId) {
      fetchData(countryId);
    }
  }, [countryId]);

  const fetchData = async (countryId) => {
    try {
      const response = await axios.get(
        `http://192.168.48.15:6500/api/v1/place/getPlaceByCountry/${countryId}`
      );
      setPlaces(response.data.place);
      setLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch data from the server");
      setLoading(false);
    }
  };
  const filteredPlace = places
    ? places.filter((item) => {
        const itemName = item.title && item.title.toLowerCase();
        return itemName && itemName.includes(searchItem.toLowerCase());
      })
    : [];
  const DestinationCard = ({ item }) => {
    const [isFavourite, toggleFavourite] = useState(false);

    const handleClick = (item) => {
      if (item) {
        navigation.navigate("Destination", {
          placeId: item._id,
        });
      } else {
        console.error("PlaceId is undefined in the item:", item);
      }
    };
    return (
      <TouchableOpacity
        onPress={() => handleClick(item)}
        style={{ width: wp(44), height: wp(65), marginBottom: wp(5) }}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={{ width: "100%", height: "70%", borderRadius: wp(5) }}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: hp(15),
            borderBottomLeftRadius: wp(5),
            borderBottomRightRadius: wp(5),
          }}
        />
        <TouchableOpacity
          onPress={() => toggleFavourite(!isFavourite)}
          style={{
            backgroundColor: "rgba(255,255,255,0.4)",
            position: "absolute",
            top: wp(2),
            right: wp(3),
            borderRadius: wp(5),
            padding: wp(3),
          }}
        >
          <HeartIcon size={wp(5)} color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: wp(4),
            color: "white",
            fontWeight: "bold",
            marginTop: wp(3),
          }}
        >
          {item.title}
        </Text>
        <Text style={{ fontSize: wp(2.2), color: "white" }}>
          {item.description}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView>
      <View>
        <View style={{ marginHorizontal: wp(5), marginBottom: hp(4) }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F0F0F0",
              borderRadius: wp(5),
              padding: wp(4),
              marginBottom: hp(1),
              marginTop: 20,
            }}
          >
            <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
            <TextInput
              placeholder="Search destination"
              placeholderTextColor="gray"
              style={{ flex: 1, marginLeft: wp(2), fontSize: wp(4) }}
              onChangeText={(text) => {
                setSearchItem(text);
                 // Log the updated searchItem
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: theme.bg(0.8),
                height: wp(15),
                width: wp(30),
              }}
              onPress={() => navigation.goBack()}
              className="mb-6 mx-auto flex justify-center items-center rounded-full"
            >
              <Text
                className="text-white font-bold"
                style={{ fontSize: wp(4.5) }}
              >
                Country
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: wp(4),
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {filteredPlace.map((item, index) => {
            if (!item) {
              console.error(`Item at index ${index} is undefined.`);
              return null;
            }
            return (
              <DestinationCard
                navigation={navigation}
                item={item}
                key={index}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
