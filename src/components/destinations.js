// HeroSection.js
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import SortCategories from "./sortCategories";
import AllCountry from "./AllCountry"; // Import your AllCountry component
import axios from "axios";  
import Popular from "./Popular";
import Recommended from "./Recommended";

export default function HeroSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [allCountries, setAllCountries] = useState([]);
  const [popular, setPopular] = useState([]);
  const [recommended, setRecommeded] = useState([]);

  useEffect(() => {
    if (activeCategory === "All") {
      fetchAllCountries();
    } else if (activeCategory === "Popular") {
      fetchPopular();
    } else if (activeCategory === "Recommend") {
      fetchRecommended();
    }
  }, [activeCategory]);
  const handleSelectCategory = (category) => {
    setActiveCategory(category);
  };
  const fetchAllCountries = async () => {
    try {
      const response = await axios.get(
        "http://192.168.48.15:6500/api/v1/country/allCount"
      );
      // Check if response.data is an array before setting state
      if (Array.isArray(response.data.data)) {
        setAllCountries(response.data.data);
      } else {
        console.error("Invalid response format. Expected an array.");
      }
    } catch (error) {
      console.error("Error fetching all countries:", error);
    }
  };
  const fetchPopular = async () => {
    try {
      const res = await axios.get(
        "http://192.168.48.15:6500/api/v1/country/getPopular"
      );
      if (Array.isArray(res.data.data)) {
        setPopular(res.data.data);
      } else {
        console.error("Invalid response format. Expected an array.");
      }
    } catch (error) {
      console.error("Error fetching popular countries:", error);
    }
  };
  const fetchRecommended = async () => {
    try {
      const res = await axios.get(
        "http://192.168.48.15:6500/api/v1/country/getRecommended"
      );
      if (Array.isArray(res.data.data)) {
        setRecommeded(res.data.data);
      }
    } catch (error) {}
  };
  return (  
    <View>
      <SortCategories onSelectCategory={handleSelectCategory} />
      {activeCategory === "All" && <AllCountry allCountries={allCountries} />}
      {activeCategory === "Popular" && <Popular popular={popular} />}
      {activeCategory === "Recommend" && (
        <Recommended recommended={recommended} />
      )}
    </View>
  );
}
