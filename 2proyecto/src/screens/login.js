import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

class Login extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity onPress={ ()=> this.props.navigation.navigate('Registro')}>
                    <Text>
                        Ir a registro
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({})

export default Login;
