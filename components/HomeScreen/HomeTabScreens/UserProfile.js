import React from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
  Button,
  Dimensions
} from 'react-native'

const UserProfile = ({id, profilePictureUrl, postings, navigationToUser, user}) =>{

  return(
    <TouchableHighlight style={ {flex: 1, borderWidth: 1, borderColor: 'aqua', opacity: 1, zIndex: 99999} } onPress={() => navigationToUser(id)}>
      <View style={styles.row}>
        <View style={styles.flexOne}>
          <Image style={styles.img} source={{uri: profilePictureUrl}} />
          <Text>{user.username}</Text>
        </View>

        <TouchableHighlight style={styles.postings} onPress={() => console.log('this thing')}>
          <View>
            { ( postings.length <= 0 && <Text>No Posts</Text> ) || postings.map( (post, i) => <Text key={i}> {post} </Text> ) }
          </View>
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'aqua',
  },
  img: {
    height: 50,
    width: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  postings: {
    flex: 1,
    height: 50,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  flexOne :{
    flex: 1,
    flexDirection: "row"
  }
})

export default UserProfile
