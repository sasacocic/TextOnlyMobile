import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Button
} from 'react-native'

import { NavigationActions } from 'react-navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtContainer:{
    flexDirection: 'row'
  },
  txtInput: {
    height: 40,
    width: Dimensions.get('window').width,
    borderWidth: 1,
    borderColor: 'blue',
  }
})

class SignUp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  componentDidMount(){
    console.log(this.props);
  }

  render(){
    return(
      <View style={styles.container}>

        <View>
          <Text>Username</Text>
          <TextInput
            style={styles.txtInput}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}/>
        </View>

        <View >
          <Text>Password</Text>
          <TextInput
            style={styles.txtInput}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            secureTextEntry={true}
            />
        </View>

        <Button
          onPress={() => {
            console.log(this.props);
          }
        }
          title="SignUp?"/>
          <Button
            onPress={() => {
              this.props.navigation.navigate('Login')
            }
          }
            title="Login?"/>

      </View>
      )
    }

}

export default SignUp
