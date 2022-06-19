import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {auth, db} from '../firebase/config';
import MyCamera from '../components/MyCamera';

class NewPost extends Component{
    constructor(props){
        super(props)
        this.state={
            description:'',
            likes:[],
            comments: [],
            showCamera: true,
            url:''
        }
    }

    guardarPost(){
         db.collection('posts').add({
                createdAt: Date.now(),
                owner: auth.currentUser.email,
                description: this.state.description,
                likes:[],
                comments:[],
                foto: this.state.url
            })
            .then( response => this.setState({
                description:'',
            },
            ()=>this.props.navigation.navigate('Home')))
            .catch(error => console.log(error) )
    }

    onImageUpload(url){
        this.setState({
            url: url,
            showCamera: false,
        })
    }




export default NewPost;