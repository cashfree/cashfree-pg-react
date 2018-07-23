import React, { Component } from 'react';
import { Text, View,StyleSheet, Button, Alert } from 'react-native';
import  { CashfreePG, returnData } from 'cashfreereactnativepg';
import WKWebView from 'react-native-wkwebview-reborn';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

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
  render() {
   // let testData = CashfreePG.returnData();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Payments Screen : Example APP</Text>
        
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
  
         <CashfreePG 
    appId="Insert_Your_App_ID" 
    orderId="testing123"
    orderAmount = "100"
    orderCurrency = 'INR'
    orderNote = "testing"
    source = "reactsdk"
    customerName = 'Preetha'
    customerEmail = 'abc@gmail.com'
    customerPhone = '1234561234'
    notifyUrl = "https://www.google.com"
    />
      <Text> {console.log(returnData())} </Text>

      </View>
    );
  }
}

const RootStack = StackNavigator(
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
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

// import React, { Component } from 'react';
// import { Text, View,StyleSheet, Button, Alert } from 'react-native';
// import  { CashfreePG } from 'cashfreereactnativepg';
// import WKWebView from 'react-native-wkwebview-reborn';
// import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

// export default class HomeScreen extends React.Component {
//     render() {
//       return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//           <Text>Home Screen</Text>
//           <Button
//             title="Go to Details"
//             onPress={() => this.props.navigation.navigate('Details')}
//           />
//         </View>
//       );
//     }
//   }

// class DetailsScreen extends Component {
  

//   render() {
 
//     return (
//       <View style={styles.container}>
      
//       <Text> This is the Sample Merchant App Page </Text>
//       {/* <Button
//       onPress={this.handleRoute}
//       title="Press Me"
//        /> 

      
//       <Button
//         title="Go to Jane's profile"
//         onPress={() =>
//           navigate('Profile', { name: 'Jane' })
//         }
//       /> */}
//        <Button
//           title="Go to Home"
//           onPress={() => this.props.navigation.navigate('Home')}
//         />
//          <CashfreePG 
//     appId="275432e3853bd165afbf5272" 
//     orderId="qgphjkllsdjhgfw"
//     orderAmount = "100"
//     orderCurrency = 'INR'
//     orderNote = "testing"
//     source = "reactsdk"
//     customerName = 'Preetha'
//     customerEmail = 'abc@gmail.com'
//     customerPhone = '1234561234'
//     notifyUrl = "https://www.google.com"
//     />

//       </View>
//     );
//   }
// }

// const RootStack = StackNavigator(
//   {
//     Home: {
//       screen: HomeScreen,
//     },
//     Details: {
//       screen: DetailsScreen,
//     },
//   },
//   {
//     initialRouteName: 'Home',
//   }
// );


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'flex-start',
//     justifyContent: 'center',
//   },
// });
