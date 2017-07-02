import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import HomeTab from './HomeTabConfig'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return(
    {
      navigationState: state.tabOne
    }
  )
}

class HomeTabNavigation extends React.Component{
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({tintColor}) => <Icon size={ 20 } name={ 'home' } color={tintColor } />,
  }

  render(){
    console.log('current props in top');
    console.log(this);
    console.log(this.cardStyle);
    console.log('current props in top');
    const { dispatch, navigationState } = this.props
    return(
      <HomeTab
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState
          })
        }
        screenProps={
          {rootNav: this.props.navigation}
        }
      />
    )
  }
}

export default connect(mapStateToProps)(HomeTabNavigation)
