import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image
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
        //Agregar el email del user logueado en el array
        db.collection('posts')
            .doc(this.props.dataPost.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(()=> this.setState({
                cantidadDeLikes:this.state.cantidadDeLikes + 1, //Se puede mejorar.
                myLike: true,
            }))
            .catch(error => console.log(error))

    }

    unLike(){
        //Agregar el email del user logueado en el array
        db.collection('posts')
            .doc(this.props.dataPost.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(()=> this.setState({
                cantidadDeLikes:this.state.cantidadDeLikes - 1, //Se puede mejorar
                myLike: false
            }))
            .catch(error => console.log(error))
    }


    borrar(){
        this.props.showModal(this.props.dataPost.id)
    }


    render(){
        // console.log(this.props);
        return(
                <View style={styles.separator}>
                    {this.props.inProfile?
                    <TouchableOpacity onPress={()=> this.borrar()}>
                        <Text>
                            Borrar
                        </Text>
                    </TouchableOpacity>:null}
                    <Image style={styles.image} source={{uri: this.props.dataPost.data.foto}}
                    />
                    <Text>Post de: {this.props.dataPost.data.owner}</Text>
                    <Text>Texto del Post: {this.props.dataPost.data.description}</Text>
                     <Text>Cantidad de likes: {this.state.cantidadDeLikes}</Text>
                    {
                        this.state.myLike ?
                        <TouchableOpacity onPress={()=> this.unLike()}>
                            <Text>Quitar Like</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={()=> this.like()}>
                            <Text>Like</Text>
                        </TouchableOpacity>                
                    }
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Comentarios', { id: this.props.dataPost.id})} > 
                        <Text>Ver comentarios</Text>
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
        paddingHorizontal:20
    },
    image:{
        height: 100,
        width: 100,
    }
})


export default Post;