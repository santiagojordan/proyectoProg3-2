import React, {Component} from 'react';
import {View,
        Text,
        TextInput,
        TouchableOpacity,
        StyleSheet,
        FlatList,
        Modal,
        Pressable,
} from 'react-native';

import { db, auth } from '../firebase/config';
import Post from "./post"


class Perfil extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
            docId: '',
            visible: false,
        }
    }

    componentDidMount(){
        db.collection("posts").where("owner", "==", auth.currentUser.email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: posts
                })
            }
        )
    }

    showModal(id){
        this.setState({
            docId: id,
            visible: true,
        })
    }

    aceptar(){
        db.collection("posts").doc(this.state.docId).delete()
        this.setState({
            docId: '',
            visible: false,
        })
    }

    cancelar(){
        this.setState({
            docId: '',
            visible: false,
        })
    }

    render(){
        console.log(this.props);
        return(
                <View style = {styles.container}>
                    <Text style = {styles.title}> Mi Perfil </Text>
                    <TouchableOpacity onPress={()=>this.props.route.params.logout()}>
                        <Text style = {styles.logout} >Logout</Text>
                    </TouchableOpacity>
                    <FlatList 
                        data={this.state.posts}
                        keyExtractor={post => post.id}
                        renderItem = { ({item}) => <Post dataPost={item} inProfile={true} showModal={(id) => this.showModal(id)}
                        {...this.props} />}
                    />
                <Modal transparent={false} animationTime="slide" visible={this.state.visible}>
                <View>
                    <Text>
                        Estas seguro de que queres borrarlo?
                    </Text>
                <Pressable onPress={()=> this.aceptar()}>
                    <Text>
                        Si
                    </Text>
                </Pressable>

                <Pressable onPress={()=> this.cancelar()}>
                    <Text>
                        No
                    </Text>
                </Pressable>
                </View>
                </Modal>

                </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgrey",
        color: "#fdf7ff",
    },
    flatlist: {
        overflow: "hidden",
        width: "100%",
        flex: 9,
        flexDirection: "column",
    },
    title: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        padding: 25,
    },
    text: {
        padding: 5,
    },
    logout:{
        fontSize: 20,
        padding: 10,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});


export default Perfil;