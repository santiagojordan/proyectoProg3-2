import React, {Component} from 'react';
import { View,
         Text,
         TouchableOpacity, 
         StyleSheet, 
         ActivityIndicator,
         FlatList, 
         Image,
} from 'react-native';

import { db, auth } from '../firebase/config';
import Post from './post';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[],
        }
    }
    
    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data(),
                    })
                })

                this.setState({
                    posts: posts,
                })
            }
        )

        
    }


    render(){
        console.log(this.state);
        return(
                <View style = {styles.container}>
                    <Text style={styles.title} >Posteos</Text>
                    <FlatList 
                        data = {this.state.posts} //El array de datos que debe recorrer.
                        keyExtractor = {post => post.id} //La clave unica para cada elemento renderizado.
                        renderItem = { ({item}) => <Post dataPost={item} inProfile={false} {...this.props} />} //El componente a renderizar en cada iteracion.
                    />
                    
                </View>

        )
    }
}


const styles = StyleSheet.create({
    text: {
        color: "#40194f",
        textAlign: 'center',
        fontSize: 40,
        fontWeight: '600',
        backgroundColor: '#cbb9d2',
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'lightgray',
        color: "#616161",
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 30
    }
})


export default Home;