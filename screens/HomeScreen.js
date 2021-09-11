import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from '../database';
export default class HomeScreen extends Component{
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word  : "Loading...",
      lexicalCategory :'',
      definition : ""
    };
  }

  getWord=(text)=>{
    var text = text.toLowerCase()
    try{
      var word = dictionary[text]["word"]

      var lexicalCategory = dictionary[text]["lexicalCategory"]

      var definition = dictionary[text]["definition"]
      
      this.setState({
        "word" : word,
        "lexicalCategory" : lexicalCategory,
        "definition" : definition
      })
    }
    catch(err){
      alert("sorry, this word is not available at the moment. please try again later :)")
      this.setState({
        'text':'',
        'isSearchPressed':false
      })
    }
  }

  render(){
    return(
      <View style={{flex:1, borderWidth:10, borderRadius:15, borderColor: 'lightgreen', paddingTop:15, paddingLeft:15, paddingRight:15}}>
        <Header
          backgroundColor={'#fcb653'}
          centerComponent={{
            text: 'Pocket Dictionary',
            style: { color: 'white', fontSize: 28, fontWeight: 'bold'},
          }}
        />
        <View style={styles.inputBoxContainer}>
          <TextInput
            style={styles.inputBox}
            onChangeText={text => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word  : "Loading...",
                lexicalCategory :'',
                examples : [],
                defination : ""
              });
            }}
            value={this.state.text}
          />

          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord(this.state.text)
            }}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          <Text style={{fontSize:20}}>
            {
              this.state.isSearchPressed && this.state.word === "Loading..."
              ? this.state.word
              : ""
            }
          </Text>
            {
              this.state.word !== "Loading..." ?
              (
                <View style={{justifyContent:'center', marginLeft:10 }}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}> Word :{" "} </Text>
                    <Text style={{fontSize:18 }}>
                      {/*Display the word here*/}
                      {this.state.word}
                    </Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}> Type :{" "}  </Text>
                    <Text style={{fontSize:18}}>
                      {/*Display the category here*/}
                      {this.state.lexicalCategory}
                    </Text>
                  </View>
                  <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                    <Text style={styles.detailsTitle}> Definition :{" "} </Text>
                    <Text style={{ fontSize:18}}>
                    {/*Display the definition here*/}
                      {this.state.definition}
                    </Text>
                  </View>
                </View>
              )
              :null
            }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputBoxContainer: {
    flex:0.3,
    alignItems:'center',
    justifyContent:'center',
  },
  inputBox: {
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 2,
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderColor: 'lightgreen',
    fontSize: 20,
    color: 'lightgreen'
  },
  searchButton: {
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderWidth: 2,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderColor: 'lightgreen',
  },
  searchText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'lightgreen'
  },
  outputContainer:{
    flex:0.7,
    alignItems:'center'
  },
  detailsContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  detailsTitle:{
    color:'#fcb653',
    fontSize:20,
    fontWeight:'bold',
  }
});
