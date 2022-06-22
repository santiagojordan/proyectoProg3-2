import React, {Component} from 'react'; 
import { db, auth } from '../firebase/config'; 
import { View,
         Text,
         TextInput,
         TouchableOpacity, 
         StyleSheet, 
         FlatList, 
} from 'react-native';

import Post from './post'; 

class Search extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[],
            email:'',
            whoIs:'', 
        }
    }
    
    
    search(email){ 
        db.collection('posts').where('owner', '==', email).onSnapshot( 
            docs => {                                 
                let posts = [];                                        
                docs.forEach( oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: posts,
                    email:'',
                    whoIs: email,
                })
            }
        )

        
    }


    render(){ 
        return(
                <View style={styles.container}>
                    <Text style={styles.text} >Posteos del usuario: {this.state.whoIs}</Text>
                    <View style={styles.form}>
                        <TextInput 
                            style={styles.field}
                            keyboardType='default'
                            placeholder='Email a buscar...'
                            value={this.state.email}
                            onChangeText={text => this.setState({ email: text})} 
                        />
                        <TouchableOpacity
                            style={styles.button} 
                            onPress={()=>this.search(this.state.email)} 
                            disabled = {this.state.email == '' ? true : false } 
                        >
                        <Text style={ styles.buttonText}>Buscar</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList style={styles.listaPosteos} 
                        data={this.state.posts} 
                        keyExtractor={post => post.id} 
                        renderItem = { ({item}) => <Post dataPost={item} 
                        {...this.props} />}
                    />
                    
                </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        padding: 10,
    },
    listaPosteos:{
        marginTop: 100,
    },
    form:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal:20,
    },
    field:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 10,
        padding:10,
        marginBottom:8,
        width:'80%',
        height: 40,
        marginBottom: 20,
        lineHeight:60,
        backgroundColor: "lightblue",
    },
    button:{
        borderRadius: 10,
        padding:10,
        backgroundColor: "#3483fa",
        width: 100,
        height: 40,
        textAlign: 'center',
    },
    buttonText:{
        color: "#fff",
        fontFamily: "Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif",
    },
    text:{
        fontSize: 40,
        fontWeight: 'bold',
        padding: 25,
    },
    
})


export default Search;