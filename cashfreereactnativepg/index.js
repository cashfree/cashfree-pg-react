import React from 'react';
import { Button, Image, View, Text, WebView, TextInput,ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json
import WKWebView from 'react-native-wkwebview-reborn';


class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        style={{ width: 30, height: 30 }}
      />
    );
  }
}


class HomeScreen extends React.Component {
 
 
  static navigationOptions = ({ navigation }) => {
      const params = navigation.state.params || {};

      this.state = {appId: ''},
      this.state = {secretKey: ''},
      this.state = {orderAmount: ''},
      this.state = {orderCurrency: ''},
      this.state = {orderNote:''},
      this.state = {customerName: ''},
      this.state = {customerEmail: ''},
      this.state = {customerPhone: ''},
      this.state = {notifyUrl: ''};

    return {
      headerTitle: <LogoTitle />,
      headerRight: (
        <Button onPress={params.increaseCount} title="+1" color="#fff" />
      ),
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  state = {
    count: 0,
  };

  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Text>Count: {this.state.count}</Text>

        <TextInput
          style={{height: 40}}
          placeholder="Dummy App ID"
          onChangeText={(appId) => this.setState({appId})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Dummy Secret Key"
          onChangeText={(secretKey) => this.setState({secretKey})}
        />
          <TextInput
          style={{height: 40}}
          placeholder="Dummy Order ID"
          onChangeText={(orderId) => this.setState({orderId})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Dummy Order Amount"
          onChangeText={(orderAmount) => this.setState({orderAmount})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Dummy Order Note"
          onChangeText={(orderNote) => this.setState({orderNote})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Dummy Order Currency"
          onChangeText={(orderCurrency) => this.setState({orderCurrency})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Dummy Customer Name"
          onChangeText={(customerName) => this.setState({customerName})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Dummy Customer Email"
          onChangeText={(customerEmail) => this.setState({customerEmail})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Dummy Customer Phone"
          onChangeText={(customerPhone) => this.setState({customerPhone})}
        />
        <Button
          title="Modal"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Details', {
              itemId: this.state.count,
              otherParam: this.state.count + ' Details',
              appId : this.state.appId,
              secretKey : this.state.secretKey,
              orderId : this.state.orderId,
              orderAmount : this.state.orderAmount,
              orderCurrency : this.state.orderCurrency,
              orderNote : this.state.orderNote,
              customerName : this.state.customerName,
              customerEmail : this.state.customerEmail,
              customerPhone : this.state.customerPhone,
            });
          }
      
        }
        />

      </View>
      </ScrollView>
    );
  }
}

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       test: ''
    }
  }
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'A Nested Details Screen',
    
    };
  };
  componentDidMount(){
    this.request();
  }

  request(){
      
      const { params } = this.props.navigation.state;
      const itemId = params ? params.itemId : null;
      const otherParam = params ? params.otherParam : null;
      const appId = params ? params.appId : '';
      const orderId = params ? params.orderId: '';
      const orderAmount = params ? params.orderAmount : '';
      const orderCurrency = params ? params.orderCurrency : 'INR';
      const orderNote = params ? params.orderNote : '';
     // const customerName = params ? params.customerName : null;
      const customerName = params ? params.customerName : '';
      const customerEmail = params ? params.customerEmail : '' ;
      const customerPhone = params ? params.customerPhone : '';
      const notifyUrl = "https://www.google.com"; // this is a dummy value 

      //create a string to send the data in form encoded format 

      const createString = "appId="+appId+"&orderId="+orderId+"&orderCurrency="+orderCurrency+"&orderAmount="+orderAmount+"&customerEmail="+customerEmail+"&customerPhone="+customerPhone+"&customerName="+customerName+"&orderNote="+orderNote+"&notifyUrl="+notifyUrl
      let response = fetch('https://test.cashfree.com/checksum.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: createString

      }).then(res => res.json()).then(res => {
        console.log(res);
        this.setState({
          test : res });

      })
 };


  render() {
    
    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    const otherParam = params ? params.otherParam : null;
    const appId = params ? params.appId : '';
    const orderId = params ? params.orderId: '';
    const orderAmount = params ? params.orderAmount : '';
    const orderCurrency = params ? params.orderCurrency : 'INR';
    const orderNote = params ? params.orderNote : '';
   // const customerName = params ? params.customerName : null;
    const customerName = params ? params.customerName : '';
    const customerEmail = params ? params.customerEmail : '' ;
    const customerPhone = params ? params.customerPhone : '';
    const notifyUrl = "https://www.google.com"; // this is a dummy value 
    
    let json = this.state.test; 
    return (
      
    
    <View style={{flex:1}}>
    <WKWebView
      javaScriptEnabled = {true}  
      source = {{html : '<body><form id="redirectForm" method="post" action="https://test.cashfree.com/billpay/checkout/post/app-submit"><input type="hidden" name="appId" value="' + appId + '"/><input type="hidden" name="orderId" value="' + orderId +  '"/><input type="hidden" name="orderAmount" value="' +  orderAmount + '"/><input type="hidden" name="orderCurrency" value="' + orderCurrency+ '"/><input type="hidden" name="orderNote" value="' + orderNote +'"><input type="hidden" name="customerEmail" value="' + customerEmail+'"/><input type="hidden" name="customerName" value="' + customerName +'"><input type="hidden" name="customerPhone" value="'+ customerPhone +'"/><input type="hidden" name="notifyUrl" value="' + notifyUrl +'"><input type="hidden" name="signature" value="'+json["checksum"]+'"/></form><script> document.getElementById("redirectForm").submit();</script></body>'}}
      
      style={{flex:1}}
      />
    </View>
    );
  
  
  }
}

const MainStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    mode: 'modal',
    },
  {
    initialRouteName: 'Home',
    navigationOptions: {
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

const RootStack = StackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      //screen: ModalScreen,
      screen : DetailsScreen,
      
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

exports.printMsg = function() {
    console.log("This is a message from the demo package");
  }

 module.exports = DetailsScreen;
  