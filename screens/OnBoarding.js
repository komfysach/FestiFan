import React from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    Image,
    Animated,
    TouchableOpacity
} from 'react-native'



// Constants
import { images, theme } from '../constants';
const { onBoarding1, onBoarding2, onBoarding3, onBoarding4, onBoarding5 } = images;

// Theme
const { COLORS, FONTS, SIZES } = theme;

// Dummy Data
const onBoardings = [
    {
        title: 'Add Credits',
        description: 'Add Festival Credits',
        img: onBoarding1
    },
    {
        title: 'Purchase Tickets',
        description: 'Use credits to purchase Festival Tickets',
        img: onBoarding2
    },
    {
        title: 'Purchase Food and Drinks',
        description: 'Use credits to purchase Festival Food and Drinks',
        img: onBoarding3
    },
    {
        title: 'Performance reminders',
        description: 'Set reminders for your favourite artist performances',
        img: onBoarding4
    },
    {
        title: 'View Festival Map',
        description: 'View the Festival Map and important info',
        img: onBoarding5
    }

];



const OnBoarding = ({ navigation }) => {

    const [completed, setCompleted] = React.useState(false);

    const scrollX = new Animated.Value(0);

    React.useEffect(() => {
        // To check is user has finished scrolling the onboarding pages
        scrollX.addListener(({ value }) => {
            if (Math.floor(value / SIZES.width) === onBoardings.length - 1) {
                setCompleted(true)
            }
        })

        return () => scrollX.removeListener();
    }, [])
    // Render
    function renderContent() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEnabled
                decelerationRate={0}
                scrollEventThrottle={16}
                snapToAlignment='center'
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } },
                ], { useNativeDriver: false })}
            >
                {onBoardings.map((item, index) => (
                    <View key={index}
                        style={{ width: SIZES.width }}
                    >
                        {/* Image */}
                        <View style={{ flex: 1, alignitems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={item.img}
                                resizeMode='cover'
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}
                            />



                        </View>
                        {/* Text */}
                        <View
                            style={{
                                position: 'absolute',
                                bottom: '10%',
                                left: 40,
                                right: 40

                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.h3,
                                    color: COLORS.primary_default,
                                    textAlign: 'center'
                                }}
                            >{item.title}</Text>
                            <Text
                                style={{
                                    ...FONTS.body3,
                                    textAlign: 'center',
                                    marginTop: SIZES.base,
                                    color: COLORS.primary_default

                                }}
                            >{item.description}</Text>

                        </View>
                        {/* Button */}

                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                bottom: 10,
                                width: 150,
                                height: 60,
                                right: 50,
                                justifyContent: 'center',
                                alignContent: 'center'


                            }}
                            onPress={() => navigation.navigate('SignUp')}
                        >
                            <Text style={{ ...FONTS.h3, color: COLORS.primary_default }}>{completed ? 'Skip' : 'Skip'}</Text>
                        </TouchableOpacity>

                    </View>

                ))}
            </Animated.ScrollView>
        )
    }

    function renderDots() {

        const dotPosition = Animated.divide(scrollX, SIZES.width)
        return (
            <View style={styles.dotContainer}>
                {onBoardings.map((item, index) => {

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
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <View>
                {renderContent()}
            </View>
            <View style={styles.dotRootContainer}>
                {renderDots()}
            </View>
        </SafeAreaView>

    )
}
export default OnBoarding;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary_bg

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



