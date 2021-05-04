import React, { useRef, useState, useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Platform,
    Image,
    TextInput,
    FlatList,
    TextTrack,
    Button
} from "react-native";




import { COLORS, images, SIZES, width, icons, FONTS } from "../constants";

import { Stalls } from '../screens';




const Food = ({ navigation }) => {

    // Dummy Data

    const categoryData = [
        {
            id: 1,
            name: 'Burgers',
            icon: icons.burgers,
        },
        {
            id: 2,
            name: 'Pizzas',
            icon: icons.pizzas,
        },
        {
            id: 3,
            name: 'Noodles',
            icon: icons.noodles,
        },
        {
            id: 4,
            name: 'Desserts',
            icon: icons.desserts,
        }

    ]

    const affordable = 1
    const fairPrice = 2
    const expensive = 3

    const stallData = [
        {
            id: 1,
            name: 'Festi Burger',
            rating: 4.8,
            categories: 1,
            priceRating: affordable,
            photo: images.festiBurger,
            duration: '15 - 20 min',

            menu: [
                {
                    menuId: 1,
                    name: 'Buttermilk Chicken Burger',
                    photo: images.chickenBurger,
                    description: 'Buttermilk soked chicken breast, cheese, and garnish',
                    calories: 200,
                    price: 59
                },
                {
                    menuId: 2,
                    name: 'Double Smash Burger',
                    photo: images.smashBurger,
                    description: '2 x 100g smash ground-beef patties, cheese, and garnish',
                    calories: 280,
                    price: 69
                },
                {
                    menuId: 3,
                    name: 'Festi Burger',
                    photo: images.festiBurger,
                    description: '100% Festi burger beef patty, cheese, and garnish',
                    calories: 300,
                    price: 79
                },
            ]
        },

        {
            id: 2,
            name: 'Festi Pizzas',
            rating: 4.8,
            categories: 2,
            priceRating: affordable,
            photo: images.festiPizzas,
            duration: '5 - 10 min',

            menu: [
                {
                    menuId: 1,
                    name: 'Magarita',
                    photo: images.festiPizzas,
                    description: 'Tomato base, mozzarella',
                    calories: 120,
                    price: 79
                },
                {
                    menuId: 2,
                    name: 'Pepperoni Pizza',
                    photo: images.festiPizzas,
                    description: 'Tomato base, mozzarella, pepperoni',
                    calories: 180,
                    price: 99
                },
                {
                    menuId: 3,
                    name: 'Vegan Pizza',
                    photo: images.festiBurger,
                    description: 'Tomato base, cashew nut cheese',
                    calories: 120,
                    price: 109
                },
            ]
        },

        {
            id: 3,
            name: 'Festi Noodles',
            rating: 4.8,
            categories: 3,
            priceRating: affordable,
            photo: images.festiNoodles,
            duration: '15 - 20 min',

            menu: [
                {
                    menuId: 1,
                    name: 'Veg Chow Mein',
                    photo: images.chowMein,
                    description: 'Noodles, veggies, sauce',
                    calories: 200,
                    price: 59
                },
                {
                    menuId: 2,
                    name: 'Chicken Chow Mein',
                    photo: images.festiNoodles,
                    description: 'Noodles, chicken, sauce',
                    calories: 250,
                    price: 79
                },
                {
                    menuId: 3,
                    name: 'Pork Chow Mein',
                    photo: images.chowMein,
                    description: 'Noodles, pork, sauce',
                    calories: 280,
                    price: 99
                },
            ]
        },

        {
            id: 4,
            name: 'Festi Desserts',
            rating: 4.8,
            categories: 4,
            priceRating: affordable,
            photo: images.festiDesserts,
            duration: '15 - 20 min',

            menu: [
                {
                    menuId: 1,
                    name: 'Classic Waffle',
                    photo: images.waffle,
                    description: 'Classic waffle and ice-cream',
                    calories: 200,
                    price: 59
                },
                {
                    menuId: 2,
                    name: 'Nutella Waffle',
                    photo: images.festiDesserts,
                    description: 'Classic waffle, nutella and ice-cream',
                    calories: 280,
                    price: 69
                },
            ]
        },
    ]

    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [stalls, setStalls] = React.useState(stallData)


    function renderFoodHeader() {
        return (
            <View>
                <TouchableOpacity>
                    <Text style={{ color: COLORS.primary_default, ...FONTS.h3, marginTop: SIZES.padding, marginLeft: SIZES.padding * 15, marginBottom: SIZES.padding * 2 }}>Food</Text>
                </TouchableOpacity>
            </View>

        )

    }

    {/*function onSelectCategory(category) {
        // filters stalls
        let stallList = stallData.filter(a => a.categories.includes(categoryData))
        setStalls(stallList)
        setSelectedCategory(category)
    }*/}

    function renderHeader() {
        return (
            <View style={{ borderColor: COLORS.primary_default, borderWidth: 1 }}>
                <View style={{ flexDirection: 'row', alignContent: 'flex-start' }}>
                    <TouchableOpacity
                        style={{ flex: 1, left: 0 }}
                        onPress={() => console.log('festi logo on clicked')}
                    >
                        <Image
                            source={icons.festi}
                            resizeMode='contain'
                            style={{
                                width: 100,
                                height: 100,
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ color: COLORS.primary_default, ...FONTS.h3, marginTop: SIZES.padding * 4 }}>
                            Adam</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ flex: 1, right: 0, alignItems: 'flex-end' }}
                        onPress={() => console.log('profile on clicked')}
                    >
                        <Image
                            source={icons.profile}
                            resizeMode='contain'
                            style={{
                                width: 100,
                                height: 100,
                            }}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    {/*function renderMainCategories() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: (selectedCategory?.id === item.id) ? COLORS.primary : COLORS.primary_bg,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: SIZES.padding,

                    }}
                    onPress={() => onSelectCategory(item)}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.primary_bg
                        }}
                    >
                        <Image
                            source={item.icon}
                            resizeMode='contain'
                            style={{
                                width: 50,
                                height: 50
                            }}
                        />

                    </View>
                    <Text style={{ marginTop: SIZES.padding, color: COLORS.primary_default }}
                    >
                        {item.name}
                    </Text>

                </TouchableOpacity>
            )
        }

        return (
            <View style={{ padding: SIZES.padding * 2 }}>

                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />

            </View>
        )
    } */}


    function renderStallList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    marginBottom: SIZES.padding * 2,
                }}
                onPress={() => navigation.navigate("Stalls", {
                    item
                })}
            >
                {/*Image*/}
                <View style={{ marginBottom: SIZES.padding }}>
                    <Image
                        source={item.photo}
                        resizeMode='cover'
                        style={{
                            width: '100%',
                            height: 200,
                            borderRadius: SIZES.radius
                        }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            height: 50,
                            width: SIZES.width * 0.3,
                            backgroundColor: COLORS.secondary_light,
                            borderTopRightRadius: SIZES.radius,
                            borderBottomLeftRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...styles.shadow
                        }}
                    >
                        <Text style={{ color: COLORS.primary_default, ...FONTS.body3 }}>{item.duration}</Text>
                    </View>
                </View>
                {/* Stall Info */}
                <Text style={{ color: COLORS.primary_default, ...FONTS.h3 }}>{item.name}</Text>


            </TouchableOpacity>
        )
        return (
            <FlatList
                data={stalls}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderFoodHeader()}
            {renderStallList()}

        </SafeAreaView>
    )



}

export default Food;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary_bg
    },
    shadow: {
        shadowColor: COLORS.primary_darkmode,
        shadowOffset: {
            width: 0,
            height: 3,
        }
    },
    item: {
        width: width - 60,
        height: width - 60,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
});