import React, { Component } from 'react';
import { WebView, Modal } from 'react-native';
import WKWebView from 'react-native-wkwebview-reborn';

import {
  View,
  Text, Dimensions

} from 'react-native';
let msgData;
export class CashfreePG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: '',
      visibleModal : true
      
   }
    this.props.test;
    this.props.appId = '';
    this.props.orderId = '';
    this.props.orderAmount = '';
    this.props.orderCurrency = 'INR';
    this.props.orderNote = '';
    this.props.source = '';
    this.props.customerName = '' ;
    this.props.customerEmail = '';
    this.props.customerPhone = '';
    this.props.notifyUrl = "https://www.google.com"; // this is a dummy value 
    this.props.msgData;


  }


  componentDidMount(){
    this.request();
  }
   
  request(){

      const appId = this.props.appId;
      const orderId = this.props.orderId;
      const orderAmount = this.props.orderAmount;
      const orderCurrency = this.props.orderCurrency;
      const orderNote = this.props.orderNote;
      const source = this.props.source;
     // const customerName = params ? params.customerName : null;
      const customerName =this.props.customerName;
      const customerEmail = this.props.customerEmail;
      const customerPhone = this.props.customerPhone;
      const notifyUrl = "https://www.google.com"; // this is a dummy value 

      //create a string to send the data in form encoded format 

      const createString = "appId="+appId+"&orderId="+orderId+"&orderCurrency="+orderCurrency+"&orderAmount="+orderAmount+"&source="+source+"&customerEmail="+customerEmail+"&customerPhone="+customerPhone+"&customerName="+customerName+"&orderNote="+orderNote+"&notifyUrl="+notifyUrl
      let response = fetch('https://test.cashfree.com/checksum.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: createString

      }).then(res => res.json()).then(res => {
        this.setState({
          test : res });

      })
 
  };

  // _onMessage(message) {
  //   if (message.body.content) {
  //     console.log("entered function")
  //      console.log("working" + message.body.content)
  //   }
  // };

   getUrl (){
    const json = this.state.test;
    return '<body><form id="redirectForm" method="post" action="https://test.cashfree.com/billpay/checkout/post/app-submit"><input type="hidden" name="appId" value="' + appId + '"/><input type="hidden" name="orderId" value="' + orderId+  '"/><input type="hidden" name="orderAmount" value="' +  this.props.orderAmount + '"/><input type="hidden" name="source" value="' + this.props.source + '"/><input type="hidden" name="orderCurrency" value="' + this.props.orderCurrency+ '"/><input type="hidden" name="orderNote" value="' + this.props.orderNote +'"><input type="hidden" name="customerEmail" value="' + this.props.customerEmail+'"/><input type="hidden" name="customerName" value="' + this.props.customerName +'"><input type="hidden" name="customerPhone" value="'+ this.props.customerPhone +'"/><input type="hidden" name="notifyUrl" value="' + this.props.notifyUrl +'"><input type="hidden" name="signature" value="'+json["checksum"]+'"/></form><script> document.getElementById("redirectForm").submit();</script></body>'
    
  }

  _hideModal(){
    this.setState({
      visibleModal: false,
    })
  }

  onWebViewMessage(event) {
  
    //console.log(event);
    try {
      msgData = event;
     //console.log(msgData);
      this._hideModal();
      

    } catch (err) {
      console.warn(err);
      return;
    }
  }
  
 static returnData(){
   console.log("this is from index.js" + msgData);
    return msgData;
    
    }
  render() {
    const appId = this.props.appId;
    const orderId = this.props.orderId;
    const orderAmount = this.props.orderAmount;
    const orderCurrency = this.props.orderCurrency;
    const orderNote = this.props.orderNote;
    const source = this.props.source;    
   // const customerName = params ? params.customerName : null;
    const customerName =this.props.customerName;
    const customerEmail = this.props.customerEmail;
    const customerPhone = this.props.customerPhone;
    const notifyUrl = "https://www.google.com"; // this is a dummy value 


    const json = this.state.test
    
    return (
     <Modal visible={this.state.visibleModal}>
      <View style={{flex:1}}>
      {/* <Text> Preetha </Text>
      <Text> Pree </Text> */}
      <WKWebView
        javaScriptEnabled = {true}  
        source = {{html : '<body><form id="redirectForm" method="post" action="https://test.cashfree.com/billpay/checkout/post/app-submit"><input type="hidden" name="appId" value="' + appId + '"/><input type="hidden" name="orderId" value="' + orderId +  '"/><input type="hidden" name="source" value="' + source + '"/><input type="hidden" name="orderAmount" value="' +  orderAmount + '"/><input type="hidden" name="orderCurrency" value="' + orderCurrency+ '"/><input type="hidden" name="orderNote" value="' + orderNote +'"><input type="hidden" name="customerEmail" value="' + customerEmail+'"/><input type="hidden" name="customerName" value="' + customerName +'"><input type="hidden" name="customerPhone" value="'+ customerPhone +'"/><input type="hidden" name="notifyUrl" value="' + notifyUrl +'"><input type="hidden" name="signature" value="'+json["checksum"]+'"/></form><script> document.getElementById("redirectForm").submit();</script></body>'}}
      // source = {{uri : 'https://test.cashfree.com/messageTest.php'}}
       onMessage={(event) => this.onWebViewMessage(event.nativeEvent.data)}
       
      style={{marginTop : 30,width: Dimensions.get('window').width}}
        />

      </View>
      </Modal>

    );
  }
}

export function returnData(){
return msgData;

}
export default CashfreePG;