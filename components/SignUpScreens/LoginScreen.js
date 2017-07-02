import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Button,
  AsyncStorage
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { currentLoggedInUser } from '../../redux/Actions'
import { connect } from 'react-redux'

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
    borderColor: 'red',
  }
})

class Login extends React.Component {
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

  saveUser(token){
    AsyncStorage.setItem(
      '@TextOnlyMobile:CurrentUser',
      token
    )
  }

  render(){
    return(
      <View style={styles.container}>

        <View>
          <Text>Username</Text>
          <TextInput
            style={styles.txtInput}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            autoCapitalize="none"/>
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
            console.log(this.state);
            var {username, password} = this.state
            console.log(username);
            console.log(password);
            this.props.gu(username,password).then(res => {
              console.log(res);
              this.saveUser(res.token)
            }).catch(err => console.log(err))
          }
        }
          title="Login?"/>

          <Button
            onPress={() => {
              AsyncStorage.getItem('@TextOnlyMobile:CurrentUser').then(res => console.log(res))
            }
          }
            title="GetUser?"/>



      </View>
      )
    }

}


const mapStateToProps = (state) =>{
  return(
    {

    }
  )
}

const mapDispatchToProps = (dispatch) =>{
  return(
    {
      gu: (username,password) => dispatch(currentLoggedInUser(username,password))
    }
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
