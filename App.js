import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, PanResponder, Animated } from 'react-native';

const ARTICLES = [
  {id:"1" , uri:require('./assets/1.png')},
  {id:"2" , uri:require('./assets/2.png')},
  {id:"3" , uri:require('./assets/3.png')},
  {id:"4" , uri:require('./assets/4.png')}
]

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class DeckSwiper extends Component {
  constructor(props){
    super(props);

    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0
    }
  }

  componentWillMount(){
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder :(e, gestureState) => true,
      onPanResponderMove:(e, gestureState) => {
        this.position.setValue({y:gestureState.dy})
      },
      onPanResponderRelease:(e,gestureState)=>{
        if(-gestureState.dy > 50 && -gestureState.vy> 0.7){
          Animated.timing(this.position, {
            toValue:({x:0, y: -SCREEN_HEIGHT}),
            duration: 400
          }).start(() => {
            this.setState({ currentIndex : this.state.currentIndex + 1})
            this.position.setValue({ x :0, y:0 })
          })
        }else{
          Animated.spring(this.position, {
            toValue : ({ x:0, y:0 })
          }).start()
        }
      }
    })
  }

  renderArticles = () => {
   return ARTICLES.map((item, i) => {
     
    if(i < this.state.currentIndex) {
       return null
     }
    
     if(i === this.state.currentIndex){
      return(
        <Animated.View key={item.id} style={this.position.getLayout()}
          {...this.PanResponder.panHandlers}
        > 
          <View style={{flex:1, position:"absolute", height:SCREEN_HEIGHT, width:SCREEN_WIDTH, backgroundColor:'white'}}>
          <View style={{flex:2, backgroundColor:'grey'}}>
            <Image source={ARTICLES[i].uri} style={{flex:1, height:null, width:null, resizeMode:'center'}} />
          </View>
            <View style={{flex:3, padding:10}}>
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              It has survived not only five centuries,Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              It has survived not only five centuries,Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              It has survived not only five centuries,Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              It has survived not only five centuries.
            </Text>
            </View>
          </View>
        </Animated.View>
      )}
      else{
       return ( <Animated.View key={item.id}> 
          <View style={{flex:1, position:"absolute", height:SCREEN_HEIGHT, width:SCREEN_WIDTH, backgroundColor:'white'}}>
          <View style={{flex:2, backgroundColor:'grey'}}>
            <Image source={ARTICLES[i].uri} style={{flex:1, height:null, width:null, resizeMode:'center'}} />
          </View>
            <View style={{flex:3, padding:10}}>
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              It has survived not only five centuries,Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              It has survived not only five centuries,Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              It has survived not only five centuries,Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              It has survived not only five centuries.
            </Text>
            </View>
          </View>
        </Animated.View>
        )}
    }).reverse()
  }

  render() { 
    return ( 
      <View style={{flex:1}}>
        {this.renderArticles()}
      </View>
     )
  }
}

export default DeckSwiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
