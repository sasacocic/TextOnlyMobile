import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput, Dimensions} from 'react-native';


/*
  TODO: setup post is linked with user logged in (note: api side done you just have to send the request)
*/


class Post extends Component{
  constructor(props){
    super(props)

    this.state = {
      tex: "tex"
    }
  }

  render(){
    return(
      <View style={styles.cont}>
        <TextInput
          style={ {height: 40, borderWidth: 1, borderColor: "gray"} }
          onChangeText={(tex) => this.setState({tex})}
          value={this.state.tex}
        />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: 'aqua',
  }
})


export default Post
