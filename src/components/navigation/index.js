import React from 'react';
import {
    createAppContainer
} from 'react-navigation';
import {
    createStackNavigator
} from 'react-navigation-stack';

import Home from '../screens/index';

const MainNavigation = createStackNavigator ({
    Home: {
        screen: Home,
        navigationOptions: () => ({
            header: null,
        }),
    },
});

const Routes = createAppContainer(MainNavigation);

export default Routes;