import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colours 

    // primary
    primary_default: "#0E067D",
    primary_dark: "#4E4CB6",
    primary_darkmode: "#02004D",
    primary_light: "#D8D6FF",
    primary_bg: "#F8F8FF",

    // secondary
    secondary_default: "#5CEEA7",
    seondary_dark: "#29D381",
    secondary_darkmode: "#A9FFD5",
    secondary_light: "#CFFFE8",
    secondary_bg: "#E9FFF4",

    // success
    success_default: "#00BA3F",
    success_dark: "#009633",
    success_light: "#D6FFE4",
    success_bg: "#E9FFF0",

    // error
    error_default: "#EF7373",
    error_dark: "#D64646",
    error_light: "#FFDBDB",
    error_darkmode: "#FFA5A5",
    error_bg: "#FFE9E9"


};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    //font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "KronaOne-Regular", fontSize: SIZES.largeTitle, lineHeight: 42 },
    h1: { fontFamily: "KronaOne-Regular", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "KronaOne-Regular", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "RedHatDisplay-Medium", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "RedHatDisplay-Regular", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "RedHatDisplay-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "RedHatDisplay-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "RedHatDisplay-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "RedHatDisplay-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "RedHatDisplay-Regular", fontSize: SIZES.body5, lineHeight: 22 },
};

const theme = { COLORS, SIZES, FONTS };

export default theme;