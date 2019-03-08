import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import base64 from 'react-native-base64'
import { CashfreePG, returnData } from 'cashfreereactnativepg';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Payment',
  };

  constructor(props) {
    super(props);
    this.state = {testData: ''};
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         
          <CashfreePG 
           appId='YOUR-APP-ID'
           orderId='Order01-RN-11003'
           orderAmount = '52'
           orderCurrency = 'INR'
           orderNote = 'testing'
           source = 'reactsdk'
           customerName = 'John Doe'
           customerEmail = 'abc@domain.com'
           customerPhone = '1234561234'
           notifyUrl = 'YOUR-NOTIFY-URL'
           paymentModes = ''
           env = 'TEST'
           tokenData = 'CFTOKEN-VALUE'
           caller = {this}
           /> 
         <Button
           title="Go back"
           onPress={() => this.props.navigation.goBack()}
         />
         <Text>{base64.decode(this.state.testData)}</Text>
       </View>      
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      headerBackTitleVisible : 'true' ,     
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}