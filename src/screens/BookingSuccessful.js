import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme";

const BookingSuccessful = () => {
    const navigation=useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Booking Successful!</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Explore more</Text>
      </TouchableOpacity>
      {/* You can add more components or styles as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
  button: {
    backgroundColor: theme.bg(0.8),
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookingSuccessful;
