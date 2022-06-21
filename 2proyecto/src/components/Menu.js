import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Buscar from '../screens/buscar';
import Home from '../screens/home';
import Perfil from '../screens/perfil';
import Posteo from '../screens/nuevoPost';
import { FontAwesome, Founaation } from '@expo/vector-icons';

const Tab = createBottomTabNavigator ();

class Menu extends Component {
    constructor(props){
        super(props)
        this.state={
            loggedIn:false,
        }
    }

    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen style={styles.header}
                    name='Home' 
                    component={ Home }
                    options={
                        { tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }
                    }
                />
                 <Tab.Screen 
                    name='Posteo' 
                    component={Posteo}
                    options={
                        { tabBarIcon: () => <FontAwesome name="photo" size={24} color="black" /> }
                    }
                />
                 <Tab.Screen 
                    name='Buscar' 
                    component={Buscar}
                    options={
                        { tabBarIcon: () => <FontAwesome name="search" size={24} color="black" /> }
                    }
                />                
                    <Tab.Screen 
                    name='Perfil' 
                    component={Perfil}
                    options={
                        { tabBarIcon: () => <FontAwesome name="user" size={24} color="black" /> }
                    }
                    initialParams={{logout: ()=>this.props.route.params.logout()}}
                />
            </Tab.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    header:{
        fontSize: 134,

    }

})


export default Menu;
