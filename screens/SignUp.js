import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient'

import { COLORS, SIZES, FONTS, icons, images } from '../constants'


const SignUp = ({ navigation }) => {

    const [showPassword, setShowPassword] = React.useState(false)

    const [areas, setAreas] = React.useState([])
    const [selectedArea, setSelectedArea] = React.useState(null)
    const [modalVisible, setModalVisible] = React.useState(false)
    let bouncyCheckboxRef: BouncyCheckbox | null = null;
    const [checkboxState, setCheckboxState] = React.useState(false);

    React.useEffect(() => {
        fetch('https://restcountries.eu/rest/v2/all')
            .then(response => response.json())
            .then(data => {
                let areaData = data.map(item => {
                    return {
                        code: item.alpha2Code,
                        name: item.name,
                        callingCode: `${item.callingCodes[0]}`,
                        flag: `https://flagcdn.com/16x12/${item.alpha2Code}.png`
                    }
                })

                setAreas(areaData)

                if (areaData.length > 0) {
                    let defaultData = areaData.filter(a => a.code == "ZA")

                    if (defaultData.length > 0) {
                        setSelectedArea(defaultData[0])
                    }
                }
            })
    }, [])

    function renderHeader() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: SIZES.padding * 2,
                    paddingHorizontal: SIZES.padding * 2
                }}
                onPress={() => console.log("sign-up")}
            >
                <Image
                    source={icons.back}
                    resizeMode='contain'
                    style={{
                        width: 40,
                        height: 40,
                        tintColor: COLORS.primary_default
                    }}
                />

                <Text style={{ marginLeft: SIZES.padding * 0.5, color: COLORS.primary_default, ...FONTS.h3 }}>Sign Up</Text>
            </TouchableOpacity>
        )
    }

    function renderLogo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 6,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={images.festiLogo}
                    resizeMode='contain'
                    style={{
                        width: '90%',


                    }}
                />



            </View>
        )
    }
    function renderForm() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 6,
                    marginHorizontal: SIZES.padding * 2,

                    backgroundColor: COLORS.primary_default,
                    borderRadius: 20

                }}
            >
                {/* Full Name */}
                <View>
                    <Text style={{ color: COLORS.primary_bg, ...FONTS.h3, marginLeft: SIZES.padding * 3, marginTop: SIZES.padding * 2 }}>
                        Full Name</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            margin: SIZES.padding * 2,
                            borderColor: COLORS.primary_default,
                            borderWidth: 1,
                            height: 40,
                            color: COLORS.primary_default,
                            ...FONTS.body4,
                            backgroundColor: COLORS.primary_bg,
                            borderRadius: 20
                        }}
                        placeholder="Enter Full Name"
                        placeholderTextColor={COLORS.primary_default}
                        paddingHorizontal={SIZES.padding * 2}
                        selectionColor={COLORS.primary_default}
                        marginLeft={SIZES.padding * 2}
                    >

                    </TextInput>

                </View>
                <View>
                    <Text style={{ color: COLORS.primary_bg, ...FONTS.h3, marginLeft: SIZES.padding * 3, marginTop: SIZES.padding * -0.05 }}>
                        Email</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            margin: SIZES.padding * 2,
                            borderColor: COLORS.primary_default,
                            borderWidth: 1,
                            height: 40,
                            color: COLORS.primary_default,
                            ...FONTS.body4,
                            backgroundColor: COLORS.primary_bg,
                            borderRadius: 20
                        }}
                        placeholder="Enter Email Address"
                        placeholderTextColor={COLORS.primary_default}
                        paddingHorizontal={SIZES.padding * 2}
                        selectionColor={COLORS.primary_default}
                        marginLeft={SIZES.padding * 2}
                    >

                    </TextInput>

                </View>

                {/* Phone Number */}
                <View style={{ marginHorizontal: SIZES.padding * 2, marginBottom: SIZES.padding }}>
                    <Text style={{ color: COLORS.primary_bg, ...FONTS.h3, marginLeft: SIZES.padding, marginTop: SIZES.padding * -0.05 }}>
                        Phone Number
                        </Text>

                    <View style={{ flexDirection: 'row' }}>
                        {/* Country Code */}
                        <TouchableOpacity
                            style={{
                                width: 100,
                                height: 40,
                                marginHorizontal: 2,
                                marginTop: SIZES.padding,
                                borderColor: COLORS.primary_default,
                                borderWidth: 1,
                                flexDirection: 'row',
                                ...FONTS.body4,
                                backgroundColor: COLORS.primary_bg,
                                borderRadius: 20
                            }}
                            onPress={() => setModalVisible(true)}
                        >
                            <View style={{ justifyContent: 'center' }}>
                                <Image
                                    source={icons.down}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.primary_default,
                                        marginLeft: 4

                                    }}
                                />

                            </View>
                            <View
                                style={{ justifyContent: 'center', marginLeft: 1 }}
                            >
                                <Image
                                    source={{ uri: selectedArea?.flag }}
                                    resizeMode='contain'
                                    style={{
                                        width: 20,
                                        height: 20
                                    }}
                                />
                            </View>
                            <View style={{ justifyContent: 'center', marginLeft: 1 }}>
                                <Text style={{ color: COLORS.primary_default, ...FONTS.body4 }}>+{selectedArea?.callingCode}</Text>

                            </View>

                        </TouchableOpacity>
                        {/* Phone Number */}
                        <TextInput
                            style={{
                                flex: 1,
                                marginVertical: SIZES.padding,
                                borderColor: COLORS.primary_default,
                                borderWidth: 1,
                                height: 40,
                                color: COLORS.primary_default,
                                ...FONTS.body4,
                                backgroundColor: COLORS.primary_bg,
                                borderRadius: 20

                            }}
                            placeholder="Enter Phone Number"
                            placeholderTextColor={COLORS.primary_default}
                            paddingHorizontal={SIZES.padding}
                            selectionColor={COLORS.primary_default}
                            marginLeft={2}

                        >

                        </TextInput>

                    </View>

                </View>
                {/* I.D Number */}
                {/*<View>
                    <Text style={{ color: COLORS.primary_bg, ...FONTS.h3, marginLeft: SIZES.padding * 3 }}>
                        I.D/Passport Number</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            margin: SIZES.padding * 2,
                            borderColor: COLORS.primary_default,
                            borderWidth: 1,
                            height: 40,
                            color: COLORS.primary_default,
                            ...FONTS.body4,
                            backgroundColor: COLORS.primary_bg,
                            borderRadius: 20
                        }}
                        placeholder="I.D or Passport Number"
                        placeholderTextColor={COLORS.primary_default}
                        paddingHorizontal={SIZES.padding * 2}
                        selectionColor={COLORS.primary_default}
                        marginLeft={SIZES.padding * 2}
                    >

                    </TextInput>

                    </View>*/}


                {/* Password */}
                <View style={{ marginBottom: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.primary_bg, ...FONTS.h3, marginLeft: SIZES.padding * 3, marginTop: SIZES.padding * -1 }}>Password
                    </Text>
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
                        placeholder="Enter Password"
                        placeholderTextColor={COLORS.primary_default}
                        selectionColor={COLORS.primary_default}
                        secureTextEntry={!showPassword}
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
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={showPassword ? icons.eye : icons.eyeclose}
                            style={{
                                height: 40,
                                width: 40,
                                tintColor: COLORS.primary_default
                            }}
                        />

                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ flexDirection: "row", alignContent: 'center', margin: SIZES.padding * -1 }}>

                    <Text style={{ color: COLORS.primary_bg, ...FONTS.h4, marginLeft: SIZES.padding * 4, marginTop: SIZES.padding * -0.01 }}>I am over the age of 18</Text>
                    <BouncyCheckbox style={{
                        margin: SIZES.padding, marginLeft: SIZES.padding * 5.5, marginBottom: SIZES.padding * 4, marginTop: SIZES.padding * -0.3
                    }}
                        ref={(ref: any) => (bouncyCheckboxRef = ref)}
                        isChecked={checkboxState}
                        disableBuiltInState
                        fillColor={{ color: COLORS.secondary_dark }}
                        unfillColor={{ color: COLORS.secondary_light }}
                        iconStyle={{ borderColor: COLORS.seondary_dark }}
                        onPress={(isChecked: boolean = false) =>
                            setCheckboxState(!checkboxState)
                        } />
                </TouchableOpacity>

            </View >
        )
    }

    function renderButton() {
        return (
            <View style={{ margin: SIZES.padding * 2 }}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        width: "100%",
                        backgroundColor: COLORS.primary_default,
                        borderRadius: SIZES.radius,
                        alightItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate('Tickets')}
                >
                    <Text style={{ color: COLORS.primary_bg, ...FONTS.h3, justifyContent: 'center', marginLeft: SIZES.padding * 10 }}>To the party</Text>
                </TouchableOpacity>

            </View>
        )
    }
    function renderAreaCodesModal() {


        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{ padding: SIZES.padding, flexDirection: 'row' }}
                    onPress={() => {
                        setSelectedArea(item)
                        setModalVisible(false)
                    }}
                >
                    <Image
                        source={{ uri: item.flag }}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body4 }}>{item.name}</Text>
                </TouchableOpacity>
            )
        }

        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View style={{
                        flex: 1, alignItems: 'center', justifyContent: 'center'
                    }}>
                        <View
                            style={{
                                height: 400,
                                width: SIZES.width * 0.8,
                                backgroundColor: COLORS.primary_bg,
                                borderRadius: SIZES.radius
                            }}
                        >
                            <FlatList
                                data={areas}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.code}
                                showsVerticalScrollIndicator={false}
                                style={{
                                    padding: SIZES.padding * 2,
                                    marginBottom: SIZES.padding * 2
                                }}
                            />

                        </View>

                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        )
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <LinearGradient
                colors={[COLORS.primary_bg, COLORS.primary_bg]}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    {renderHeader()}
                    {renderLogo()}
                    {renderForm()}
                    {renderButton()}
                </ScrollView>

            </LinearGradient>
            {renderAreaCodesModal()}

        </KeyboardAvoidingView>
    )
}

export default SignUp;