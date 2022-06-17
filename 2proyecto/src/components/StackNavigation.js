import React, {Component} from "react";
import {NavigationContainer} from "@react-navigation/native";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator ()

import Login from "../screens/login";
import Registro from "../screens/registro";
import Menu from "./Menu";
import {auth, db} from "../firebase/config"

class StackNavigation extends Component {
    constructor(props){
        super(props)
        this.state={
            loggedIn: false,
        }
    }


    componentDidMount(){
        //chequear que el usuario esté logueado.
      auth.onAuthStateChanged(user => {
           // Si el usuario está logueado, cambiar el estado loggedIn: true
           if(user){
               this.setState({
                   loggedIn:true
               })
           }
       })
   }


   login(mail, pass){
       //Debería loguear en Firebase y cambiar el estado loggedIn: true
       //Debe pasar como método a el componente login
       auth.signInWithEmailAndPassword(mail, pass)
           .then(response => this.setState({
               loggedIn:true
           }))
           .catch( error => console.log(error))

   }

   register(mail, pass, userName){
       //Debería registrar en Firebase y cambiar el estado loggedIn: true
       //Debe pasar como método a el componente register
       //console.log(this.state)
       //Colocar el método de registración de Firebase
       auth.createUserWithEmailAndPassword(mail, pass)
           .then( responseRegister => {
               console.log(responseRegister); 
               //Guardar documento en colección de usuarios.
               db.collection('users').add({
                           email: mail,
                           userName: userName,
                           createdAt: Date.now(),
                       })
                       // .then( responseUsers => this.setState({
                       //     loggedIn:true,
                       // }))
                       .thne( res => console.log(res))
                       .catch(error => console.log(error) )

                   })
           .catch( error => {
               console.log(error);
               this.setState({
                    registerError: error.message
               })
           })      
   }
   
   logout(){
       //Debe pasar como método a el componente Porfile
       auth.signOut()
           .then( response => this.setState({
               loggedIn: false
           }))
           .catch( error => console.log(error))
   }

    
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    {this.state.loggedIn?
                    <Stack.Group>
                        <Stack.Screen
                        name = "Menu" component={Menu}
                        options = {{headerShown: false}}
                        initialParams={{logout: ()=>this.logout()}}/>
                    </Stack.Group>
                    :
                    <Stack.Group>
                         <Stack.Screen
                    name="Login" component={Login}
                    initialParams = {
                        {   login: (mail, pass)=>this.login(mail, pass),
                        }}/>
                     <Stack.Screen
                    name="Registro" component={Registro}
                    initialParams = { {register: (mail, pass, userName)=>this.register(mail, pass, userName)}}/>
                    </Stack.Group>
                    }
                   
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default StackNavigation