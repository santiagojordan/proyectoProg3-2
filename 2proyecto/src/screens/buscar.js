import React, {Component} from 'react';
import { db, auth } from '../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity, 
         StyleSheet, 
         ActivityIndicator,
         FlatList, 
         Image } from 'react-native';
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
    
    // Obtener información a partir de una búsqueda.
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
                    whoIs:email,
                })
            }
        )

        
    }


    render(){
        // console.log(this.state);
        return(
                <View>
                {/* Si no hay resultados deben mostrar un mensaje al usuario. Puede ser un mensaje único o segmenteado: en caso de que el usuario no exista o si el usuario existe indicar que aún no tiene posteos. */}
                    <Text>Posts del usuario: {this.state.whoIs}</Text>
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
                            //👇 Les dejo un dato sorpresa para los que llegaron hasta acá: así se deshabilita un touchable opacity
                            disabled= {this.state.email == '' ? true : false }
                            >
                            <Text style={ styles.buttonText}>Buscar</Text>
                        </TouchableOpacity>                         
                    </View>
                    <FlatList 
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
        flex:1,
        padding:10,
    },
    form:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal:20,
    },
    field:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 10,
        padding:3,
        marginBottom:8,
        width:'70%',
        marginBottom: 8,
        lineHeight:60,
        backgroundColor: "lightblue",
    },
    button: {
        borderRadius: 10,
        padding:3,
        backgroundColor: "#3483fa",
        width:'29%',
        textAlign: 'center',
    },
    buttonText:{
        color: "#fff",
        fontFamily: "Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif",
    },
    text: {
        margin: 200,
    }
})

/*const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fdf7ff",
        color: "#fdf7ff",
    },
    form: {
        flex: 1,
        marginHorizontal: 20,
    },
    field: {
        borderRadius: 15,
        padding: 3,
        marginBottom: 8,
        width: '100%',
        marginTop: 20,
        backgroundColor: 'lightblue',
    },
    button: {
        height: 30,
        width: 30,
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff'
    },
    titulo: {
        color: '#40194f',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
    },
    posts: {
        marginTop: 60,
    },
    texto: {
        color: '#40194f',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
        marginLeft: 20,
        textAlign: 'center',
    }
})*/

export default Search;