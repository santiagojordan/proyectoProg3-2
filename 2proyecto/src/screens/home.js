import React, {Component} from 'react';
import { db, auth } from '../firebase/config';
import { View,
         Text,
         TouchableOpacity, 
         StyleSheet, 
         ActivityIndicator,
         FlatList, 
         Image } from 'react-native';
import Post from './post';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[]
        }
    }
    
    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
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


    render(){
        console.log(this.state);
        return(
                <View style = {styles.container}>
                    <Text>Posteos</Text>
                    <FlatList 
                        data = {this.state.posts}
                        keyExtractor = {post => post.id}
                        renderItem = { ({item}) => <Post dataPost={item} inProfile={false}
                        {...this.props} />}
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
})


export default Home;