import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  Easing,
  Dimensions
} from 'react-native'



class Testing extends React.Component{
  constructor(props){
    super(props)
    //this.animatedValue = new Animated.Value(0)
    this.one = new Animated.Value(0)
    this.two = new Animated.Value(0)
    this.three = new Animated.Value(0)
    this.animate = this.animate.bind(this)
  }


  componentDidMount(){
    this.animate()
  }

  animate(){
    // this.animatedValue.setValue(0) // will we be able to use spinValue??? or do we need to bind this
    // Animated.timing(
    //   this.animatedValue,
    //   {
    //     toValue: 1,
    //     duration: 1000,
    //     easing: Easing.linear,
    //     delay: 3000
    //   }
    // ).start()
    this.one.setValue(0)
    this.two.setValue(0)
    this.three.setValue(0)
    Animated.sequence([
      Animated.timing(
        this.one,
        {
          toValue: 1,
          duration: 100,
          easing: Easing.linear
        }
      ),
      Animated.parallel([
        Animated.timing(
          this.two,
          {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear
          }
        ),
        Animated.timing(
          this.three,
          {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear
          }
        )
      ])
    ]).start( () => this.animate())
  }



  render(){
    // const opacity = this.one.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [0, 1]
    // })
    const thingTwo = this.two.interpolate({
      inputRange: [0, .5, 1],
      outputRange: [0, 350, 0]
    })
    return(
      <View style={styles.container}>
      <Animated.View
        style={{
          opacity: this.one,
          marginLeft: thingTwo,
          height: 100,
          width: 100,
          backgroundColor: this.three.interpolate({
            inputRange: [0, .5, 1],
            outputRange: ['green', 'yellow', 'red']
          })}} />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})


export default Testing
