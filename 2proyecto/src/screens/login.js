import React, { Component } from 'react';
import {View, StyleSheet,   TouchableOpacity,  Text, TextInput,
} from 'react-native';

class Login extends Component {

    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
        }
    }

    render(){ 
        return(
                <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput 
                    style={styles.field}
                    keyboardType='email-address'
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text})}
                />
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text})}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.props.route.params.login(this.state.email, this.state.password)}>
                    <Text style={ styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>   
                 <TouchableOpacity onPress={ ()=>this.props.navigation.navigate('Registro') }>
                        <Text style={styles.noCuenta} >No tengo cuenta</Text>
                 </TouchableOpacity>
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        marginTop: 10
    },
    title:{
        fontSize: 40,
        fontWeight: 'bold',
        padding: 25,

    },
    field:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding:10,
        marginBottom:20,
        backgroundColor: 'lightblue',
        borderRadius: 10

    },
    button: {
        borderRadius: 2,
        padding:10,
        backgroundColor: 'black',
        width: 75,
        borderRadius: 10
    },
    buttonText:{
        color: '#fff'
    },
    noCuenta:{
        marginTop: 40,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }

})


export default Login;