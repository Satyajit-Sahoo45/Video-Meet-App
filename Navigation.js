import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from './screens/Home'
import MeetingRoom from './screens/MeetingRoom'

const Navigation = () => {
    const stack = createStackNavigator();

    return (
        <NavigationContainer>
            <stack.Navigator initialRouteName={Home}>
                <stack.Screen name='Home' component={Home} />
                <stack.Screen name='Room' component={MeetingRoom} />
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
