import React, {Component} from 'react';
import {View,
        Text,
        TextInput,
        TouchableOpacity,
        StyleSheet,
        Image,
} from 'react-native';

import {auth, db} from '../firebase/config';
import firebase from 'firebase';

class Post extends Component{
    constructor(props){
        super(props)
        this.state={
           cantidadDeLikes:this.props.dataPost.data.likes.length,
           myLike:false,
        }
    }

    componentDidMount(){
        if(this.props.dataPost.data.likes.includes(auth.currentUser.email)){
            this.setState({
                myLike: true,
            })
        }
    }

    like(){
        db.collection('posts')
            .doc(this.props.dataPost.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(()=> this.setState({
                cantidadDeLikes:this.state.cantidadDeLikes + 1,
                myLike: true,
            }))
            .catch(error => console.log(error))

    }

    unLike(){
        db.collection('posts')
            .doc(this.props.dataPost.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(()=> this.setState({
                cantidadDeLikes:this.state.cantidadDeLikes - 1,
                myLike: false
            }))
            .catch(error => console.log(error))
    }


    borrar(){
        this.props.showModal(this.props.dataPost.id)
    }


    render(){
        console.log(this.props.dataPost);
        return(
                <View style = {styles.separator}>
                    {this.props.inProfile?
                    <TouchableOpacity onPress = {()=> this.borrar()}>
                        <Text style = {styles.borrar}>
                            Borrar
                        </Text>
                    </TouchableOpacity>:null}
                    <Image  style = {styles.image} 
                            source = {
                                {uri: this.props.dataPost.data.foto}
                            }
                    />
                    <Text style={styles.pie} >Post de: {this.props.dataPost.data.owner}</Text>
                    <Text style={styles.pie}>Texto del Post: {this.props.dataPost.data.description}</Text>
                     <Text style={styles.pie}>Cantidad de likes: {this.state.cantidadDeLikes}</Text>
                    {
                        this.state.myLike ?
                        <TouchableOpacity onPress={()=> this.unLike()}>
                            <Text style={styles.dislike} >Quitar Like</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={()=> this.like()}>
                            <Text style={styles.like} >Like</Text>
                        </TouchableOpacity>                
                    }
                    <TouchableOpacity style={styles.comment} onPress={ () => this.props.navigation.navigate('Comentarios', { id: this.props.dataPost.id})} > 
                        <Text style={styles.text} >Ver comentarios</Text>
                    </TouchableOpacity>   
                    
                </View>
        )
    }

}

const styles = StyleSheet.create({
    separator:{
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingHorizontal:20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        padding: 50

    },
    image:{
        height: 200,
        width: 200,
    },
    comment:{
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    text:{
        color: 'white'
    },
    pie:{
        fontSize: 18,
        alignContent: 'left'

    },
    like:{
        fontSize: 18,
        alignContent: 'left',
        color: 'green'
    },
    dislike:{
        fontSize: 18,
        alignContent: 'left',
        color: 'red'
    },
    borrar:{
        fontSize: 18,
        color: "blue",
        textDecorationLine: 'underline',
        marginBottom: 20,
        
    }


})


export default Post;