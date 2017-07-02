import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import {currentAuthUser} from '../../redux/Actions'
import Icon from 'react-native-vector-icons/FontAwesome'



class Profile extends Component{
  static navigationOptions = {
    title: "profile",
  }

  constructor(props){
    super(props)

    this.state = {
      loggedInUser: undefined,
      fetching: true
    }
  }

  componentDidMount(){
    this.props.authUser().then(res =>{
      this.setState({
        loggedInUser: res,
        fetching: false
      })
    })//might want to catch any error that occurs here
  }


  render(){
    if(this.state.fetching){
      // not 100% sure if this works
      return <ActivityIndicator style={ {height: 80} } animating={true} />
    }else{
      var following = `following: ${this.props.currentUser.following.length}`
      var followers = `followers: ${this.props.currentUser.followers.length}`
      var userName = this.props.currentUser.user.username
      return(
        <View style={styles.container}>

          <View style={[styles.userInfoContainer,styles.row,styles.aqua, {paddingTop: 5}]}>
            <View style={{flex: 4} }>
              <Image style={[styles.img]}source={ {uri: this.props.currentUser.profilePictureUrl} }></Image>
              <Text>{userName}</Text>
            </View>

            <View style={ {flex: 6, alignItems: 'flex-start', marginLeft: 10} }>
              <Text>{ following }</Text>
              <Text>{ followers }</Text>
            </View>
            <View style={ [{flex: 2},{alignItems:'center'}] }>
              <Text onPress={() => this.props.navigation.navigate('Profile_Settings')}>
                <Icon name="ellipsis-h" size={12} />
              </Text>
            </View>

          </View>

          <View style={[styles.subContainer,styles.salmon]}>
            {this.props.currentUser.postings ?  this.props.currentUser.postings.map((posting, i) => <Text key={i}>{posting}</Text>) : <Text>not posts</Text>}
          </View>
        </View>

      )
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  subContainer:{
    flex: 9,
    justifyContent: 'flex-end'
  },
  userInfoContainer :{
    flex: 3
  },
  row:{
    flexDirection: 'row',
  },
  coulmn:{
    flexDirection: 'column'
  },
  aqua: {
    backgroundColor: 'aqua'
  },
  salmon: {
    backgroundColor: 'salmon'
  },
  aquamarine:{
    backgroundColor: "aquamarine"
  },
  img:{
    width: 120,
    height: 120,
    borderRadius: 60
  }
})

const mapStateToProps = (state) => {
  return({
    currentUser: state.currentAuthUser
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    authUser: () => {return dispatch(currentAuthUser())}
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile)
