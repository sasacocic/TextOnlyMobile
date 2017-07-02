import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ListView,
  Image,
  Button,
  TouchableHighlight
} from 'react-native'
import {fetchUsers} from '../../../redux/Actions'
import { NavigationActions } from 'react-navigation'
import UP from './UserProfile'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    opacity: 1,
  },
  profileContainer:{
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'red'
  },
  img:{
    width: 45,
    height: 45,
    marginRight : 5,
  },
  actCon :{
    backgroundColor: 'blue',
    position: 'relative'
  }
})

const PostButton = ({navigation}) => {

  return(
    <Button
      onPress={() => navigation.navigate("Post")}
      title="Post"
    />
  )
}

class UserList extends Component{
  static navigationOptions = ({navigation}) => ({
    title: "TextOnly",
    headerRight: <PostButton navigation={navigation} />
  })

  constructor(props){
    super(props)

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    var users = []

    this.state = {
      fetching: true,
      users,
      dataSource: this.ds.cloneWithRows(users)
    }

    this.navToUser = this.navToUser.bind(this)

    console.log(this.props.navigation.state)
  }

  navToUser(id){
    var {navigation} = this.props
    navigation.navigate('User_Detail', {userId : id})
  }


  componentDidMount(){

    this.props.getAllUsers().then(response => {
      let { userFeed } = this.props
      this.setState({
        fetching: false,
        users: userFeed,
        dataSource: this.ds.cloneWithRows(userFeed)
      })
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.userFeed.length != nextProps.userFeed.length){
      this.setState({
        users: nextProps.userFeed,
        dataSource: this.ds.cloneWithRows(nextProps.userFeed)
      })
    }
  }

  render(){
    let { userFeed } = this.props
    // if you want to navigate to a specific user pass a function that does that
    return(
      <View style={styles.container}>

        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator animating={this.state.fetching} color="red"/>
        </View>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(user) => <UP
                                  {...user}
                                  navigationToUser={this.navToUser}/>}/>



      </View>

    )
  }
}


const mapStateToProps = (state) =>{
  return(
    {
      userFeed : state.allUsers
    }
  )
}

const mapDispatchToProps = (dispatch) =>{
  return(
    {
      getAllUsers: () =>{
        return dispatch(fetchUsers()).then(res => {
          return res
        })
      },
    }
  )
}


export default connect(mapStateToProps,mapDispatchToProps)(UserList)
