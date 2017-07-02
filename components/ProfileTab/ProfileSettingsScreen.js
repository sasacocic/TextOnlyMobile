import React from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import {updateCurrentAuthUser} from '../../redux/Actions'


const BackButton = ({goBack}) =>(
  <Icon style={ {paddingTop:20, backgroundColor: 'transparent' } } name={'chevron-left'} size={20} onPress={() => goBack()} />
)

//passing navigation like this might only work for stackNavigators
class ProfileSettings extends React.Component {
  static navigationOptions = ({navigation}) =>(
    {
      header: <BackButton goBack={navigation.goBack} />
    }
  )

  constructor(props){
    super(props)

    const profilePictureUrl = props.currentUser.profilePictureUrl
    const username = props.currentUser.user.username
    const firstName = props.currentUser.user.first_name
    const lastName = props.currentUser.user.last_name
    this.state = {
      profilePictureUrl,
      username,
      firstName,
      lastName
    }
  }

  render(){
    return(
      <View style={ {flex: 1, justifyContent: "flex-end"}} onLayout={(event) => {console.log('back');console.log(event.nativeEvent.layout.height);console.log('back');}}>

        <View style={styles.backColor} />

        <View style={[styles.innerBack,styles.spaced]} onLayout={(event) => { console.log('innerBack');console.log(event.nativeEvent.layout.height); console.log(event.nativeEvent); console.log('innerBack');}} >

          <Text style={styles.inputField}> PROFILE SETTINGS </Text>
          <View style={styles.inputField }>
            <Text>profilePictureUrl</Text>
            <TextInput
              style={ [{height: 40}, styles.bTop] }
              onChangeText={(profilePictureUrl) => this.setState({profilePictureUrl})}
              value={this.state.profilePictureUrl}
               />
          </View>

          <View style={styles.inputField}>
            <Text>Username</Text>
            <TextInput
              style={ [{height: 40},styles.bTop] }
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
               />
          </View>

          <View style={styles.inputField}>
            <Text>First Name</Text>
            <TextInput
              style={ [{height: 40}, styles.bTop] }
              onChangeText={(firstName) => this.setState({firstName})}
              value={this.state.firstName}
               />
          </View>

          <View style={styles.inputField}>
            <Text >Last Name</Text>
            <TextInput
              style={ [{height: 40}, styles.bTop ]}
              onChangeText={(lastName) => this.setState({lastName})}
              value={this.state.lastName}
               />
          </View>

          <Button onPress={() => {
              this.props.saveChanges(
                {
                  username: this.state.username,
                  firstName: this.state.firstName,
                  lastName : this.state.lastName,
                  profilePictureUrl: this.state.profilePictureUrl
                }
              )
            }
          } title="Save" />

        </View>

        <TouchableHighlight style={[styles.btn, styles.spaced]} onPress={() => this.props.navigation.goBack()}>
          <Text style={{textAlign: "center", backgroundColor: 'yellow', padding: 20}}>Cancel</Text>
        </TouchableHighlight>


      </View>

    )
  }
}



const styles = StyleSheet.create({
  inputField: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'red'
  },
  backColor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: .70,
  },
  innerBack: {
    backgroundColor: 'transparent',
    opacity: 1,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: 'aquamarine'
  },
  btn :{
    backgroundColor: 'transparent',
    borderWidth: 5,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
    borderColor: 'aquamarine',
  },
  spaced: {
    marginLeft: 10,
    marginRight: 10,
  },
  bTop: {
    backgroundColor: 'yellow'
  }
})

const mapStatetoProps = (state) => {
  return({
    currentUser: state.currentAuthUser
  })
}

const mapDispatchToProps = (dispatch) => {
  return(
    {
      saveChanges: (formData) => {
        return dispatch(updateCurrentAuthUser(formData))
      }
    }
  )
}

export default connect(mapStatetoProps,mapDispatchToProps)(ProfileSettings)
