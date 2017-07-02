import React from 'react'
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  Image,
  ListView
} from 'react-native'
import { connect } from 'react-redux'
import { getUser } from '../../../redux/Actions'



const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'yellow'
  },
  proContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: "column"
  },
  conContainer:{
    flex:2,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'red'
  },
  postingsContainer:{
    flex:10,
    backgroundColor: 'salmon',

  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: 'salmon',
    margin: 5,
  },
  alignCenter:{
    alignItems: "center"
  }
})

//need to set up a list view for a users postings
class UserDetail extends React.Component {
  constructor(props){
    super(props)

    this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2})
    var posts = []
    this.state = {
      fetching: true,
      posts,
      dataSource: this.ds.cloneWithRows(posts)
    }
    console.log(this.state);
  }

  componentDidMount(){
    this.props.getUser(this.props.navigation.state.params.userId)
    .then(res => {
      let { currentUser } = this.props
      let posts = currentUser.postings
      this.setState({
        fetching: false,
        posts,
        dataSource: this.ds.cloneWithRows(posts)
      })
    }).catch(function(error){
      console.log(error);
    })
  }

  render(){
    var show;
    if(this.state.fetching){
      show = (
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator animating={this.state.fetching} color="red"/>
        </View>
      )
      return <Text>fetching</Text>
    } else{
      var pp = this.props.currentUser.profilePictureUrl
      var following = `following: ${this.props.currentUser.following.length}`
      var followers = `followers: ${this.props.currentUser.followers.length}`
      show = (
        <View style={styles.proContainer}>
          <View style={styles.conContainer}>
            <Image style={styles.img} source={{uri: pp}}></Image>
            <Text>{this.props.currentUser.user.username}</Text>
            <Text>{following}</Text>
            <Text>{followers}</Text>
          </View>

          <View style={styles.postingsContainer}>
            <ListView
              contentContainerStyle={styles.alignCenter}
              dataSource={this.state.dataSource}
              renderRow={(post) => <Text style={{color: "aquamarine", padding: 5}} >{post}</Text> }
              enableEmptySections={true}
              />
          </View>

        </View>
      )
    }
    return(
      <View style= { styles.container}>
        {show}
      </View>
    )
  }
}

const mapStateToProps = (state) =>{
  return(
    {
      currentUser : state.currentUser
    }
  )
}

const mapDispatchToProps = (dispatch) =>{
  return(
    {
      getUser: (id) => {
        return dispatch(getUser(id)).then(res => res)
      }
    }
  )
}

//try and export UserDetail function directly
export default connect(mapStateToProps,mapDispatchToProps)(UserDetail)
