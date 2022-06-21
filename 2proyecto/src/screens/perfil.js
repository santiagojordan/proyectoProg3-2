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
        //Incluir en el render un ToucheableOpacity para ejecutar el método de logout que viene del padre. ¿Quién es el padre?
        return(
                <View style = {styles.container}>
                    <Text style = {styles.title}> Mi Perfil</Text>
                    <TouchableOpacity onPress={()=>this.props.route.params.logout()}>
                        <Text>Logout</Text>
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
        backgroundColor: "#fdf7ff",
        color: "#fdf7ff",
    },
    noFlatlist: {
        width: "100%",
        flex: 9,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    flatlist: {
        overflow: "hidden",
        width: "100%",
        flex: 9,
        flexDirection: "column",
    },
    icon: {
        backgroundColor: "#40194f",
        color: "white",
        textAlign: "center",
        padding: 7,
        marginTop: 5,
        borderRadius: 15,
        width: "100%",
    },
    titulo: {
        color: "#40194f",
        textAlign: 'center',
        fontSize: 40,
        fontWeight: '600',
        backgroundColor: '#cbb9d2',
    },
    contFlat: {
        flex: 1,
    },
    background: {
        backgroundColor: "#fdf7ff",
        flex: 9,
        flexDirection: "column",
    },
    username: {
        textAlign: "left",
        color: "cbb92d",
        fontWeight: "600",
        fontSize: 15,
        padding: 5,
    },
    boldText: {
        fontSize: "30",
        fontWeight: "bold",
        color: "#40194f",
    },
    paddingLeft: {
        paddingLeft: "5px",
    },
    text: {
        padding: 5,
    },
});


export default Perfil;