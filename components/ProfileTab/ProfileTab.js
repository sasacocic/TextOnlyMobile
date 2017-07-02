import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import ProfileTabConfig from './ProfileTabConfig'
import { addNavigationHelpers } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

const mapStateToProps = (state) => {
  return(
    {
      navigationState: state.tabTwo
    }
  )
}


class ProfileTab extends Component{
  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({tintColor}) => <Icon size={ 20 } name={ 'user-circle' } color={tintColor } />,
  }

  render(){
    const {dispatch, navigationState} = this.props
    return(
      <ProfileTabConfig navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState
          })
        }
        />
    )
  }
}


export default connect(mapStateToProps)(ProfileTab)
