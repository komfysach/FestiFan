import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated
} from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper'

import { icons, COLORS, SIZES, FONTS } from '../constants'

const Stalls = ({ route, navigation }) => {

    const scrollX = new Animated.Value(0);
    const [stall, setStall] = React.useState(null);
    const [orderItems, setOrderItems] = React.useState([]);

    React.useEffect(() => {
        let { item } = route.params;

        setStall(item)

    })

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



    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode='contain'
                        style={{
                            width: 40,
                            height: 40
                        }}
                    />
                </TouchableOpacity>
                {/* Stall Name Section */}
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View style={{
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: SIZES.padding * 3,
                        margin: SIZES.padding,
                        marginLeft: SIZES.padding * -3,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.secondary_light
                    }}>
                        <Text style={{ ...FONTS.h3 }}>{stall?.name}</Text>

                    </View>
                </View>
            </View>
        )
    }
    function renderFoodInfo() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment='center'
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } }
                ], { useNativeDriver: false })}
            >
                {
                    stall?.menu.map((item, index) => (
                        <View
                            key={`menu-${index}`}
                            style={{ alignItems: 'center' }}
                        >
                            <View style={{ height: SIZES.height * 0.35 }}>
                                {/* Food Image */}
                                <Image
                                    source={item.photo}
                                    resizeMode='cover'
                                    style={{
                                        width: SIZES.width,
                                        height: '100%'
                                    }}
                                />
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: -20,
                                        width: SIZES.width,
                                        height: 50,
                                        justifyContent: 'center',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.primary_bg,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopLeftRadius: 25,
                                            borderBottomLeftRadius: 25
                                        }}
                                        onPress={() => editOrder("-", item.menuId, item.price)}
                                    >
                                        <Text style={{ ...FONTS.body1 }}>-</Text>
                                    </TouchableOpacity>
                                    <View
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.primary_bg,
                                            alignItems: 'center',
                                            justifyContent: 'center',

                                        }}
                                    >
                                        <Text style={{ ...FONTS.h2 }}>{getOrderQty(item.menuId)}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.primary_bg,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopRightRadius: 25,
                                            borderBottomRightRadius: 25
                                        }}
                                        onPress={() => editOrder("+", item.menuId, item.price)}
                                    >

                                        <Text style={{ ...FONTS.body1 }}>+</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            {/* Name & Description */}
                            <View
                                style={{
                                    width: SIZES.width,
                                    alignItems: 'center',
                                    marginTop: 15,
                                    paddingHorizontal: SIZES.padding * 2
                                }}
                            >
                                <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}>{item.name} = R{item.price.toFixed(2)}</Text>
                                <Text style={{ ...FONTS.body3, textAlign: 'center' }}>{item.description}</Text>
                            </View>
                            {/* Calories */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 10
                                }}
                            >
                                <Image
                                    source={icons.like}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        marginRight: 10
                                    }}
                                />
                                <Text style={{ ...FONTS.body3, color: COLORS.primary_light }}>{item.calories.toFixed(2)} cal</Text>
                            </View>
                        </View>
                    ))
                }

            </Animated.ScrollView>
        )
    }

    function renderDots() {

        const dotPosition = Animated.divide(scrollX, SIZES.width)



        return (
            <View style={{ height: 30 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: SIZES.padding
                    }}
                >
                    {stall?.menu.map((item, index) => {

                        const opacity = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        })

                        const dotSize = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [SIZES.base, 17, SIZES.base],
                            extrapolate: 'clamp'
                        })
                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                opacity={opacity}
                                style={[styles.dot, { width: dotSize, height: dotSize }]}
                            >

                            </Animated.View>
                        )

                    })}


                </View>
            </View>

        )

    }

    function renderOrder() {
        return (
            <View>
                {
                    renderDots()
                }
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
                            borderBottomColor: COLORS.primary_light,
                            borderBottomWidth: 1,
                            borderColor: COLORS.primary_default
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{getCartItemCount()} items in Cart</Text>
                        <Text style={{ ...FONTS.h3 }}>R{sumOrder()}</Text>
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
                                justifyContent: 'center'
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    width: SIZES.width * 0.9,
                                    padding: SIZES.padding * 2,
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
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderFoodInfo()}
            {renderOrder()}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary_bg,


    },
    dotContainer: {
        flexDirection: 'row',
        height: SIZES.padding
    },
    dotRootContainer: {
        position: 'absolute',
        bottom: SIZES.height > 700 ? '25%' : '20%'
    },
    dot: {
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary_default,
        marginHorizontal: SIZES.radius / 2
    },

})

export default Stalls;
