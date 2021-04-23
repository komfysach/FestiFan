import React, { Component } from 'react';

import { images } from '../constants';

import Image from 'react-native';

export default class Splash extends Component {
    constructor(props) {
        super(props);
        setTimeout(() => {
            this.props.navigation.navigate("OnBoarding");
        }, 5000);
    }
    render() {
        return (
            <Image source={images.festiSplash} />
        )
    }

}


