import React, { Component } from 'react';

import LottieView from 'lottie-react-native';

import { images } from '../constants';

export default class Splash extends Component {
    constructor(props) {
        super(props);
        setTimeout(() => {
            this.props.navigation.navigate("OnBoarding");
        }, 5000);
    }
    render() {
        return (
            <LottieView source={images.festiSplash} />
        )
    }

}
