import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  ListView,
  StyleSheet,
  Image
} from 'react-native';
import { connect } from 'react-redux'
import { updateFollowing, fetchPopularUsers } from '../../redux/Actions'


const Prof = ({id,user,profilePictureUrl, passUser}) =>(
  <View style={styles.containerRow}>
    <Image style={styles.img} source={{uri: profilePictureUrl}} />
    <Text>{user.username}</Text>
    <Button title="follow" onPress={() => passUser()} />
  </View>
)


class PopularScreen extends Component{
  constructor(props){
    super(props)

    this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2})

    var users = []

    this.state = {
      fetching: true,
      users,
      dataSource: this.ds.cloneWithRows(users)
    }

    this.passUser = this.passUser.bind(this)
  }


  componentDidMount(){
    this.props.getPopularUsers().then(res => {
      console.log(res);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.allUsers.length != nextProps.allUsers.length){
      this.setState({
        fetching: false,
        users: nextProps.allUsers,
        dataSource: this.ds.cloneWithRows(nextProps.allUsers)
      })
    }
  }

  passUser(userId){
    var { followUser } = this.props
    return function execute(){
      followUser(userId)
    }
  }


  render(){
    return(
      <View style={{flex: 1}}>
        <ListView

          dataSource={this.state.dataSource}
          renderRow={(user) => {
            return (<Prof {...user} passUser={this.passUser(user.id)} />)
          }}
          enableEmptySections={true}
          />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerRow: {
    flex: 1,
    flexDirection: 'row'
  },
  img:{
    width: 50,
    height: 50,
  }
})

const mapStateToProps = state => {
  return({
    allUsers: state.popularUsers
  })
}

const mapDispatchToProps = dispatch => {
  return({
    followUser: (userId) => { dispatch(updateFollowing(userId))},
    getPopularUsers : () => { return dispatch(fetchPopularUsers()) }
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(PopularScreen)
