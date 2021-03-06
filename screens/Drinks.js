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

import { isIphoneX } from 'react-native-iphone-x-helper'


import { COLORS, images, SIZES, width, icons, FONTS } from "../constants";



const Drinks = ({ navigation }) => {

    const [orderItems, setOrderItems] = React.useState([]);
    const [drink, setDrink] = React.useState(null);


    function editOrder(action, menuId, price) {
        let orderList = orderItems.slice()
        let item = orderList.filter(a => a.menuId === menuId)

        if (action === "+") {
            if (item.length > 0) {
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty * price
            } else {
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price
                }
                orderList.push(newItem)
            }
            setOrderItems(orderList)
        } else {
            if (item.length > 0) {
                if (item[0].qty > 0) {
                    let newQty = item[0].qty - 1
                    item[0].qty = newQty
                    item[0].total = newQty * price
                }
            }

            setOrderItems(orderList)

        }
    }

    function getOrderQty(menuId) {
        let orderItem = orderItems.filter(a => a.menuId === menuId)

        if (orderItem.length > 0) {
            return orderItem[0].qty
        }

        return 0

    }

    function getCartItemCount() {
        let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)

        return itemCount

    }

    function sumOrder() {
        let total = orderItems.reduce((a, b) => a + (b.total || 0), 0)

        return total

    }

    const ScrollableTab = ({ tabList, selectedTab, onPress }) => {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    marginHorizontal: SIZES.padding / 2,


                }}
                onPress={() => onPress(item)}
            >
                <Text style={{
                    color: COLORS.primary_default, ...FONTS.body3, marginHorizontal: SIZES.padding, marginVertical: SIZES.padding / 2
                }}>{item.name}</Text>
                {
                    selectedTab.id == item.id &&
                    <View style={{ alignItems: 'center', marginTop: SIZES.base / 3 }}>
                        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.success_default }}>

                        </View>
                    </View>
                }
            </TouchableOpacity>
        );

        return (
            <View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={tabList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }

    const ScrollableCard = ({ navigation, productList }) => {


        const renderCard = ({ item }) => (
            <TouchableOpacity
                style={{ marginLeft: SIZES.padding * 2, marginTop: SIZES.padding * -0.01, borderColor: COLORS.primary_default, borderWidth: 1, borderRadius: 20, height: SIZES.height / 2.55 }}
            >
                <View style={{ width: SIZES.width / 1.5, margin: SIZES.padding }}>
                    <Image
                        source={item.image}
                        resizeMode='cover'
                        style={{ width: '90%', height: '70%', borderRadius: 20, margin: SIZES.padding }}
                    />
                </View>
                <View
                    style={{ position: 'absolute', bottom: 75, left: '13%', right: '10%', top: '60%' }}
                >

                    <Text style={{ color: COLORS.primary_default, ...FONTS.h3 }}>{item.productName}</Text>
                    <Text style={{ color: COLORS.primary_default, ...FONTS.body3 }}>{item.productQauntity}</Text>

                </View>
                <View style={{ position: 'absolute', bottom: 20, left: 30, borderRadius: 20, paddingVertical: 10, paddingHorizontal: 15, backgroundColor: COLORS.secondary_light }}>
                    <View>
                        <Text style={{ color: COLORS.primary_default, ...FONTS.h3 }}>R {item.price.toFixed(2)} </Text>
                    </View>
                </View>
                <View style={{
                    position: 'absolute',
                    bottom: 15, right: 10, paddingVertical: 10,
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    flexDirection: 'row',


                }}>
                    <TouchableOpacity
                        style={{
                            width: 32,
                            backgroundColor: COLORS.primary_bg,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderTopLeftRadius: 25,
                            borderBottomLeftRadius: 25
                        }}
                        onPress={() => editOrder("-", item.menuId, item.price)}
                    >
                        <Text style={{ ...FONTS.body1, color: COLORS.primary_default }}>-</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            width: 32,
                            backgroundColor: COLORS.primary_bg,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h3, color: COLORS.primary_default }}>{getOrderQty(item.menuId)}</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            width: 32,
                            backgroundColor: COLORS.primary_bg,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderTopRightRadius: 25,
                            borderBottomRightRadius: 25
                        }}
                        onPress={() => editOrder("+", item.menuId, item.price)}
                    >

                        <Text style={{ ...FONTS.body1, color: COLORS.primary_default }}>+</Text>
                    </TouchableOpacity>
                </View>


            </TouchableOpacity>

        )

        return (
            <View style={{ marginTop: SIZES.padding }}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={productList}
                    renderItem={renderCard}
                    keyExtractor={item => item.productId}
                />
            </View>
        )

    }

    const [tabList, setTabList] = React.useState([

        // Dummy Data
        {
            id: 0,
            name: 'Beer',
            title: 'beers',
            productList: [
                {
                    productId: 1,
                    productName: 'Castle Lager',
                    productQauntity: '340ml',
                    price: 30.00,
                    image: images.beerCan,
                },
                {
                    productId: 2,
                    productName: 'Castle Light',
                    productQauntity: '340ml',
                    price: 30.00,
                    image: images.beerCan,
                },
                {
                    productId: 3,
                    productName: 'Budweiser',
                    productQauntity: '340ml',
                    price: 30.00,
                    image: images.beerCan,
                },
                {
                    productId: 4,
                    productName: 'CBC',
                    productQauntity: '340ml',
                    price: 30.00,
                    image: images.beerCan,
                },
            ]
        },
        {
            id: 1,
            name: 'Cider',
            title: 'ciders',
            productList: [
                {
                    productId: 1,
                    productName: 'Hunters Dry',
                    productQauntity: '340ml',
                    price: 30.00,
                    image: images.beerCan,
                },
                {
                    productId: 2,
                    productName: 'Savannah',
                    productQauntity: '340ml',
                    price: 30.00,
                    image: images.beerCan,
                },
                {
                    productId: 3,
                    productName: 'Strongbow',
                    productQauntity: '340ml',
                    price: 30.00,
                    image: images.beerCan,
                },
                {
                    productId: 4,
                    productName: 'Hunters Extreme',
                    productQauntity: '340ml',
                    price: 30.00,
                    image: images.beerCan,
                },
            ]
        },
        {
            id: 2,
            name: 'Liqour',
            title: 'liqour',
            productList: [
                {
                    productId: 1,
                    productName: 'Vodka',
                    price: 30.00,
                    image: images.paperCup,
                },
                {
                    productId: 2,
                    productName: 'Brandy',
                    price: 30.00,
                    image: images.paperCup,
                },
                {
                    productId: 3,
                    productName: 'Whiskey',
                    price: 30.00,
                    image: images.paperCup,
                },
                {
                    productId: 4,
                    productName: 'Rum',
                    price: 30.00,
                    image: images.paperCup,
                },
            ]
        },
        {
            id: 3,
            name: 'Shot',
            title: 'shooters',
            productList: [
                {
                    productId: 1,
                    productName: 'Jagermeister',
                    price: 30.00,
                    image: images.paperCup,
                },
                {
                    productId: 2,
                    productName: 'Tequila',
                    price: 30.00,
                    image: images.paperCup,
                },
                {
                    productId: 3,
                    productName: 'Caramel Vodka',
                    price: 30.00,
                    image: images.paperCup,
                },
                {
                    productId: 4,
                    productName: 'Jager Bombs',
                    price: 30.00,
                    image: images.paperCup,
                },
            ]
        },
        {
            id: 4,
            name: 'Specials',
            title: 'specials',
            productList: [
                {
                    productId: 1,
                    productName: 'Vodka & Red Bull',
                    price: 30.00,
                    image: images.paperCup,
                },
                {
                    productId: 2,
                    productName: 'Brandy & Coke',
                    price: 30.00,
                    image: images.paperCup,
                },
                {
                    productId: 3,
                    productName: 'Whiskey & Water',
                    price: 30.00,
                    image: images.paperCup,
                },
                {
                    productId: 4,
                    productName: 'Beer Bucket',
                    price: 30.00,
                    image: images.paperCup,
                },
            ]
        },

    ])

    const [selectedTab, setSelectedTab] = React.useState({

    })

    function renderDrinksHeader() {
        return (
            <View>
                <TouchableOpacity>
                    <Text style={{ color: COLORS.primary_default, ...FONTS.h3, marginTop: SIZES.padding, marginLeft: SIZES.padding * 15, marginBottom: SIZES.padding * -2 }}>Drinks</Text>
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
    function renderTabs() {
        return (
            <View>
                <Text></Text>
            </View>
        )
    }

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
    function renderTotalTab() {
        return (
            <View
                style={{
                    backgroundColor: COLORS.primary_bg,
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,

                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: SIZES.padding * 2,
                        paddingHorizontal: SIZES.padding * 3,
                        bottom: 30
                    }}
                >
                    <Text style={{ ...FONTS.h3, color: COLORS.primary_default }}>{getCartItemCount()} items in Cart</Text>
                    <Text style={{ ...FONTS.h3, color: COLORS.primary_default }}>R{sumOrder()}</Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: SIZES.padding * 2,
                        paddingHorizontal: SIZES.padding * 3
                    }}
                >
                    {/* Order Button */}
                    <View
                        style={{
                            padding: SIZES.padding,
                            marginLeft: SIZES.padding * -2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            bottom: 60
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.9,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary_default,
                                alignItems: 'center',
                                borderRadius: SIZES.radius
                            }}
                        >
                            <Text style={{ color: COLORS.primary_bg, ...FONTS.h2 }}>Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {isIphoneX() &&
                    <View
                        style={{
                            position: 'absolute',
                            bottom: -34,
                            left: 0,
                            right: 0,
                            height: 34,
                            backgroundColor: COLORS.primary_bg
                        }}
                    >

                    </View>
                }

            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderDrinksHeader()}
            {renderTabs(selectedTab.title)}
            {renderSearchBar()}

            <ScrollableTab
                tabList={tabList}
                selectedTab={selectedTab}
                onPress={(item) => setSelectedTab(item)}
            />
            <View style={{ flex: 1 }}>
                <ScrollableCard
                    navigation={navigation}
                    productList={selectedTab.productList}
                />
            </View>
            {renderTotalTab()}





        </SafeAreaView>
    )



}

export default Drinks;

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