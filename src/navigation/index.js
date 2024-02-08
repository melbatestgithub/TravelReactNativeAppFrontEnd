import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "../redux/store";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import DestinationScreen from "../screens/DestinationScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import PlaceScreen from "../screens/PlaceScreen";
import BookingSuccessful from "../screens/BookingSuccessful";
import Dashboard from "../admin/Dashboard";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Register" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Destination" component={DestinationScreen} />
          <Stack.Screen name="Place" component={PlaceScreen} />
          <Stack.Screen name="SuccessBooking" component={BookingSuccessful} />
          <Stack.Screen name="Dashboard" component={Dashboard} /> 
          {/* <Stack.Screen name="Country" component={CountryScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
