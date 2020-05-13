import React from 'react';
import { StyleSheet, View, StatusBar, ActivityIndicator,Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Text,Button} from 'native-base'
import Logo from './screens/Logo'
import Tracker from './screens/Tracker'


const Router = createStackNavigator(
  {
    Logo: { screen: Logo,navigationOptions: () => ({
      title: `.`,
      headerLayoutPreset: 'center',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),},
    Tracker: { screen: Tracker,navigationOptions: () => ({
      title: `Tracker`,
      headerLayoutPreset: 'center',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),},
  },
  {
    initialRouteName: 'Logo'
  }
)


const AppContainer = createAppContainer(Router);

export default class App extends React.Component {

  state = {
      assetsLoaded: false,
  };

  async componentDidMount() {
      await Expo.Font.loadAsync({
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          'Open-Sans-Bold': require('./assets/fonts/Open-Sans/OpenSans-Bold.ttf'),
          'material':require('./assets/fonts/Material/MaterialIcons-Regular.ttf'),
      });
  
      this.setState({ assetsLoaded: true });
  }

  render() {

      const {assetsLoaded} = this.state;

      if( assetsLoaded ) {
          return (
              <AppContainer
                  ref={nav => {
                      this.navigator = nav;
                  }}
              />
          );
      }
      else {
          return (
              <View style={styles.container}>
                  {/* <ActivityIndicator /> */}
                  <StatusBar barStyle="default" />
              </View>
          );
      }
  }
}

const styles = StyleSheet.create({
  container: {
      // flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center'
  },
  logout: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
},
  mb15: {
flexDirection: 'row', 
justifyContent: 'center',
fontFamily:'Open-Sans-Bold'
  },
});