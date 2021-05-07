/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"

import { SignUp, Tickets, OnBoarding, Stalls, TicketInfo } from "./screens"

import Tabs from './navigation/tabs'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent"
  }

}

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'OnBoarding'}
      >

        <Stack.Screen name='OnBoarding' component={OnBoarding} options={{ headerShown: false }} />
        <Stack.Screen name='SignUp' component={SignUp} />

        {/* Tabs */}
        <Stack.Screen name='Tickets' component={Tabs} />
        <Stack.Screen name='Stalls' component={Stalls} />
        <Stack.Screen name='TicketInfo' component={TicketInfo} />

      </Stack.Navigator>
    </NavigationContainer>

  )
}


export default App;
