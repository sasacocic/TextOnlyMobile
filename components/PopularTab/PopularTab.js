import React, { Component } from 'react'
import { View, Text, Button } from 'react-native';
import {connect} from 'react-redux'
import PopularTabConfig from './PopularTabConfig'
import { addNavigationHelpers } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'


const mapStateToProps = (state) => {
  return(
    {
      navigationState: state.popularTab
    }
  )
}

class PopularTab extends Component{
  static navigationOptions = ({navigation}) => ({
    title: "Popular",
    tabBarIcon: ({tintColor}) => <Icon name="users" size={20} color={tintColor} />
  })

  constructor(props){
    super(props)
  }

  render(){
    const { dispatch, navigationState } = this.props
    return(
      <PopularTabConfig
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState
          })
        }
      />
    )
  }
}


export default connect(mapStateToProps)(PopularTab)
