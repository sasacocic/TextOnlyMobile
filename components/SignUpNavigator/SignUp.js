import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'
import InitConfig from './SignUpConfig'

const mapStateToProps = (state) => {
  return(
    {
      navigationState: state.initScreen
    }
  )
}


class InitialView extends React.Component{


  render(){
    const { dispatch, navigationState } = this.props
    return(
      <InitConfig
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState
          })
        }
        screenProps={{
          rootNav: this.props.navigation
        }}
        />
    )
  }
}




export default connect(mapStateToProps)(InitialView)
