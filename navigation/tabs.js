import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs'
import Svg, {
    Path
} from 'react-native-svg'

import { Tickets, Drinks, Artists, Map, Food } from '../screens'
import { COLORS, icons } from '../constants'

const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({ accessabilityLabel, accessibilityState, children, onPress }) => {
    var isSelected = accessibilityState.selected

    if (isSelected) {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        top: 0
                    }}
                >

                    <View style={{ flex: 1, backgroundColor: COLORS.primary_default }}></View>
                    <Svg
                        width={75}
                        height={61}
                        viewBox='0 0 75 61'
                    >
                        <Path
                            d='M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z'
                            fill={COLORS.primary_bg}
                        />


                    </Svg>

                    <View style={{ flex: 1, backgroundColor: COLORS.primary_bg }}></View>

                </View>
                <TouchableOpacity
                    style={{
                        top: -22.5,
                        justifyContent: 'center',
                        actionItems: 'center',
                        width: 75,
                        height: 75,
                        borderRadius: 50,
                        backgroundColor: COLORS.primary_default,
                        ...styles.shadow
                    }}
                    onPress={onPress}

                >
                    {children}

                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    height: 50,
                    backgroundColor: COLORS.primary_bg
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}

            </TouchableOpacity>

        )
    }

}

const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 5,
                    left: 0,
                    right: 0,
                    backgroundColor: 'transparent',
                    elevation: 0
                }
            }}
        >
            <Tab.Screen
                name='Tickets'
                component={Tickets}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.tickets}
                            resizeMode='contain'
                            style={{
                                width: 75,
                                height: 75,
                                tintColor: focused ? COLORS.secondary_default : COLORS.primary_default
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='Drinks'
                component={Drinks}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.drinks}
                            resizeMode='contain'
                            style={{
                                width: 75,
                                height: 75,
                                tintColor: focused ? COLORS.secondary_default : COLORS.primary_default
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='Food'
                component={Food}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.food}
                            resizeMode='contain'
                            style={{
                                width: 75,
                                height: 75,
                                tintColor: focused ? COLORS.secondary_default : COLORS.primary_default
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='Artists'
                component={Artists}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.artists}
                            resizeMode='contain'
                            style={{
                                width: 75,
                                height: 75,
                                tintColor: focused ? COLORS.secondary_default : COLORS.primary_default
                            }}
                        />
                    ),

                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )

                }}
            />
            <Tab.Screen
                name='Map'
                component={Map}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.map}
                            resizeMode='contain'
                            style={{
                                width: 75,
                                height: 75,
                                tintColor: focused ? COLORS.secondary_default : COLORS.primary_default
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.primary_default,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
})

export default Tabs;

