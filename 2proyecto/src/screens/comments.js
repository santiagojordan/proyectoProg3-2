import React, {Component} from 'react';
import { View,
        Text,
        TextInput,
        TouchableOpacity,
        StyleSheet,
        FlatList,
} from 'react-native';

import {auth, db} from '../firebase/config';
import firebase from 'firebase';


class Comments extends Component{
    constructor(props){
        super(props)
        this.state={
            comments:[],
            commentText:''
        }
    }

    componentDidMount(){
        db.collection('posts')
        .doc(this.props.route.params.id)
        .onSnapshot( doc => {
                this.setState({
                    comments:doc.data().comments
                })
            }
        )
    }

    agregarComentarios(){
        db.collection('posts')
        .doc(this.props.route.params.id) 
        .update({
            comments:firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                text:this.state.commentText,
                createdAt: Date.now()
            })
        })
        .then( () => {
            this.setState({
                commentText: ''
            })
        })
    }

    render(){
        return(
                <View style = {styles.container}>
                    <Text style = {styles.title}> Comentarios</Text>
                    <FlatList 
                        data={this.state.comments}
                        keyExtractor={ post => post.createdAt}
                        renderItem = { ({item}) => <Text>{item.text}</Text> }
                    />
                    <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Agregar un comentario'
                    onChangeText={text => this.setState({ commentText: text})}
                    value={this.state.commentText}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.agregarComentarios()}>
                    <Text style={ styles.buttonText}>Comentar</Text>
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
        marginBottom:20,
        color: "#40194f",
        textAlign: 'center',
        fontSize: 40,
        fontWeight: '600',
        backgroundColor: '#cbb9d2',
    },
    field:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 15,
        padding:3,
        marginBottom:8,
        margintop: 10,
        width: "100%",

    },
    button: {
        borderRadius: 15,
        padding:3,
        backgroundColor: 'green',
        height: 25,
    },
    buttonText:{
        color: '#fff',
        marginLeft: 10,
    }
})


export default Comments;