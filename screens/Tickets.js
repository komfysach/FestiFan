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


const ScrollableCard = ({ navigation, productList }) => {

    const renderCard = ({ item }) => (
        <TouchableOpacity
            style={{ marginLeft: SIZES.padding * 2, marginTop: SIZES.padding, borderColor: COLORS.primary_default, borderWidth: 1, borderRadius: 20, height: SIZES.height / 2.5 }}
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

const Tickets = ({ navigation }) => {

    const [tabList, setTabList] = React.useState([
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
            <View style={{ borderTopColor: COLORS.primary_default, borderTopWidth: 1, borderBottomWidth: 1, borderBottomColor: COLORS.primary_default }}>
                <View style={{ flexDirection: 'row', marginBottom: SIZES.padding * 8 }}>
                    <TouchableOpacity style={{ flex: 1 }}>
                        <Text style={{ color: COLORS.primary_default, ...FONTS.h2, left: '5%', top: '5%', padding: SIZES.padding }}>Total</Text>
                        <TextInput
                            style={{

                                marginVertical: SIZES.padding,
                                borderColor: COLORS.primary_default,
                                margin: SIZES.padding * 2,
                                borderWidth: 1,
                                height: 45,
                                width: 170,
                                color: COLORS.primary_default,
                                backgroundColor: COLORS.primary_bg,
                                borderRadius: 20,
                                ...FONTS.h3
                            }}
                            placeholder="R"
                            placeholderTextColor={COLORS.primary_default}
                            selectionColor={COLORS.primary_default}

                            paddingHorizontal={SIZES.padding * 2}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 45,
                            width: "40%",
                            backgroundColor: COLORS.primary_default,
                            borderRadius: SIZES.radius,
                            alightItems: 'center',
                            justifyContent: 'center',
                            marginTop: SIZES.padding * 6,
                            marginRight: SIZES.padding
                        }}
                        onPress={() => navigation.navigate('Tickets')}
                    >
                        <Text style={{ color: COLORS.primary_bg, ...FONTS.h3, justifyContent: 'center', marginLeft: SIZES.padding * 3 }}>Purchase</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderTabs(selectedTab.title)}
            {renderSearchBar()}

            <View style={{ flex: 1 }}>
                <ScrollableCard

                />
            </View>
            {renderTotalTab()}





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