import React, { Component } from 'react';
import { Text, View,StyleSheet, Button, Alert } from 'react-native';
import  { CashfreePG, returnData } from 'cashfreereactnativepg';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import base64 from 'react-native-base64'

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen : Example APP</Text>
        <Button
          title="Go to Payments"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}


class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigationOptions }) => {

    return {
      title: 'Payment',
      headerStyle: {
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  constructor(props) {
    super(props);
    this.state = {testData: ''};
  }

  render() {    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         
         <CashfreePG 
          appId="275432e3853bd165afbf5272" 
          orderId="testRN-12m1311aa"
          orderAmount = "100"
          orderCurrency = 'INR'
          orderNote = "testing"
          source = "reactsdk"
          customerName = 'Preetha'
          customerEmail = 'abc@gmail.com'
          customerPhone = '1234561234'
          notifyUrl = "https://www.notgoogle.com"
          paymentModes = "nb"
          env = "TEST"
          checksumUrl = "https://test.cashfree.com/checksum-react.php"
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

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
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
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
