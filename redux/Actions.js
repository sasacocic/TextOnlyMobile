import consts from './Consts'
import {AsyncStorage} from 'react-native'

var currentUserToken;
AsyncStorage.getItem("@TextOnlyMobile:CurrentUser")
.then(res => currentUserToken = res)


export const updateFollowing = userId => (dispatch, state) =>{

  var form = new FormData()
  form.append('following', userId)
  return fetch("http://localhost:8000/accounts/follow/", {
    method: "PUT",
    headers: {
      'Authorization': "Token " + currentUserToken
    },
    body: form
  })
  .then(response => response.json())
  .then(jsonRes => {
    console.log(jsonRes)
    dispatch({
      type: consts.UPFOLLOWING,
      payload: jsonRes
    })
  })
}


export const updateCurrentAuthUser = (formData) => (dispatch, state) => {
  //note you can use state to check things
  var form = new FormData()
  form.append('username', formData.username)
  form.append('firstname', formData.firstName)
  form.append('lastname', formData.lastName)
  form.append('profilePictureUrl', formData.profilePictureUrl)

  return fetch('http://localhost:8000/accounts/current_user/',{
    method: "PUT",
    headers: {
      "Authorization": "Token " + currentUserToken
    },
    body: form
  })
  .then(res => res.json())
  .then(updatedUser => {
    console.log('here bitch');
    dispatch({
      type: consts.GETAUTHUSER,
      payload: updatedUser
    })
    return updatedUser
  })
}


export const currentAuthUser = (username, password) => (dispatch, state) => {

  return fetch('http://localhost:8000/accounts/get_cur_user/',{
    method: "GET",
    headers: {
      "Authorization": "Token " + currentUserToken
    }
  }).then(res => res.json())
  .then(res => {
    dispatch({
      type: consts.GETAUTHUSER,
      payload: res
    })
    return res
  })
}


export const currentLoggedInUser = (username,password) => (dispatch, state) => {
  var form = new FormData()
  form.append('username', username)
  form.append('password', password)

  return fetch('http://localhost:8000/accounts/api-token-auth/',{
    method: "POST",
    body: form
  })
  .then(res => res.json())
}


export const fetchUsers = () => (dispatch, state) => {

  return fetch("http://localhost:8000/accounts/home_page/",{
    method: "GET",
    headers: {
      "Authorization": "Token " + currentUserToken
    }
  })
  .then(serverResponse => serverResponse.json())
  .then(jsonData =>{
    dispatch({
      type: consts.GETINITALUSERS,
      payload: jsonData
    })
    return "fetchUsers .then.then()"
  })
}

export const fetchPopularUsers = () => (dispatch, state) => {

  return fetch("http://localhost:8000/accounts/follow/",{
    method: "GET",
    headers: {
      "Authorization": "Token " + currentUserToken
    }
  })
  .then(serverResponse => serverResponse.json())
  .then(jsonData =>{
    dispatch({
      type: consts.POPULARUSERS,
      payload: jsonData
    })
    return "fetchUsers .then.then()"
  })
}


export const getUser = (id) => (dispatch, state) => {

  return fetch("http://localhost:8000/accounts/detail/" + id, {
    method: "GET",
    headers: {
      "Authorization": "Token " + currentUserToken
    }
  })
  .then(serverResponse => serverResponse.json())
  .then(jsonData => {
    console.log(jsonData);
    dispatch({
      type: consts.GETCURRENTUSER,
      payload: jsonData
    })
    return "got the current user"
  })
}
