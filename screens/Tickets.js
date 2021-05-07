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

import { TicketInfo } from '../screens';




const Tickets = ({ navigation }) => {

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

    const ticketData = [
        {
            id: 1,
            name: 'Festival One',
            photo: images.ticket1,
            price: 'R150-R350',

            info: [
                {
                    infoId: 1,
                    name: 'General Ticket',
                    photo: images.ticket1,
                    description: 'General Admittance',
                    price: 150
                },
                {
                    infoId: 2,
                    name: 'VIP Ticket',
                    photo: images.ticket1,
                    description: 'VIP Admittance',
                    price: 250
                },
                {
                    infoId: 3,
                    name: 'Backstage Pass',
                    photo: images.ticket1,
                    description: 'Backstage Admittance',
                    price: 350
                },
            ]
        },

        {
            id: 2,
            name: 'Festival Two',
            photo: images.ticket2,
            price: 'R150-R350',

            info: [
                {
                    infoId: 1,
                    name: 'General Ticket',
                    photo: images.ticket2,
                    description: 'General Admittance',
                    price: 150
                },
                {
                    infoId: 2,
                    name: 'VIP Ticket',
                    photo: images.ticket2,
                    description: 'VIP Admittance',
                    price: 250
                },
                {
                    infoId: 3,
                    name: 'Backstage Pass',
                    photo: images.ticket2,
                    description: 'Backstage Admittance',
                    price: 350
                },
            ]
        },

        {
            id: 3,
            name: 'Festival Three',
            photo: images.ticket3,
            price: 'R150-R350',

            info: [
                {
                    infoId: 1,
                    name: 'General Ticket',
                    photo: images.ticket3,
                    description: 'General Admittance',
                    price: 150
                },
                {
                    infoId: 2,
                    name: 'VIP Ticket',
                    photo: images.ticket3,
                    description: 'VIP Admittance',
                    price: 250
                },
                {
                    infoId: 3,
                    name: 'Backstage Pass',
                    photo: images.ticket3,
                    description: 'Backstage Admittance',
                    price: 350
                },
            ]
        },

        {
            id: 4,
            name: 'Festival Four',
            photo: images.ticket4,
            price: 'R150-R350',

            info: [
                {
                    infoId: 1,
                    name: 'General Ticket',
                    photo: images.ticket4,
                    description: 'General Admittance',
                    price: 150
                },
                {
                    infoId: 2,
                    name: 'VIP Ticket',
                    photo: images.ticket4,
                    description: 'VIP Admittance',
                    price: 250
                },
                {
                    infoId: 3,
                    name: 'Backstage Pass',
                    photo: images.ticket4,
                    description: 'Backstage Admittance',
                    price: 350
                },
            ]
        },
    ]

    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [tickets, settickets] = React.useState(ticketData)


    function renderTicketsHeader() {
        return (
            <View>
                <TouchableOpacity>
                    <Text style={{ color: COLORS.primary_default, ...FONTS.h3, marginTop: SIZES.padding, marginLeft: SIZES.padding * 15, marginBottom: SIZES.padding * 2 }}>Tickets</Text>
                </TouchableOpacity>
            </View>

        )

    }

    {/*function onSelectCategory(category) {
        // filters tickets
        let ticketList = ticketData.filter(a => a.categories.includes(categoryData))
        settickets(ticketList)
        setSelectedCategory(category)
    }*/}

    function renderSearchBar() {
        return (
            <View style={{



                borderRadius: 20
            }}>

                <TextInput
                    style={{

                        marginVertical: SIZES.padding,
                        borderColor: COLORS.primary_default,
                        margin: SIZES.padding * 2,
                        borderWidth: 1,
                        height: 40,
                        color: COLORS.primary_default,
                        backgroundColor: COLORS.primary_bg,
                        borderRadius: 20,
                        ...FONTS.body4
                    }}
                    placeholder="Search"
                    placeholderTextColor={COLORS.primary_default}
                    selectionColor={COLORS.primary_default}

                    paddingHorizontal={SIZES.padding * 2}

                />
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 35,
                        bottom: 20,
                        height: 30,
                        width: 30,

                    }}

                >
                    <Image
                        source={icons.search}
                        style={{
                            height: 40,
                            width: 40,
                            tintColor: COLORS.primary_default
                        }}
                    />

                </TouchableOpacity>
            </View>
        )
    }

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


    function renderticketList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    marginBottom: SIZES.padding * 2,
                }}
                onPress={() => navigation.navigate("TicketInfo", {
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
                        <Text style={{ color: COLORS.primary_default, ...FONTS.body3 }}>{item.price}</Text>
                    </View>
                </View>
                {/* ticket Info */}
                <Text style={{ color: COLORS.primary_default, ...FONTS.h3 }}>{item.name}</Text>


            </TouchableOpacity>
        )
        return (
            <FlatList
                data={tickets}
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
            {renderSearchBar()}
            {renderTicketsHeader()}
            {renderticketList()}

        </SafeAreaView>
    )



}

export default Tickets;

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