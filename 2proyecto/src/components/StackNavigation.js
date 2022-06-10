import React, {Component} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator ()
import Login from "../screens/login";
import Registro from "../screens/registro";
import Menu from "./Menu";

class StackNavigation extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                    name="Login" component={Login}/>
                     <Stack.Screen
                    name="Registro" component={Registro}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default StackNavigation