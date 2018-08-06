import React, { Component } from 'react';
import logo from './logo.svg';
import {Card,Menu,Icon,Row, Col,Button, Form, Input} from 'antd';
import './App.css';

import InitialInfo from './InitialInfo';
import ModuleInfo from './ModuleInfo';
import BotView from './BotView';



const FormItem = Form.Item;
class App extends Component {
  constructor(props) {
   
   
    super(props);

    this.state = {
      users: null,
      userSelection : "initialinfo",
      oauth: "",
      channel: "",
      modules: "",
    };
  }

  changeDisplayContent = (selectionValue) =>{
    this.setState({userSelection : selectionValue});
  }

  changeChannelAndOauth = (oauth,channel) =>{
    this.setState({channel: channel});
    this.setState({oauth: oauth});
    console.log(oauth + " " + channel);
  }

  changeModules = (modules) =>{
    this.setState({modules: modules});
  }

  DisplayedContent = (userSelection) => {
    console.log(userSelection);
    switch(userSelection) {
      case "initialinfo":
          return <InitialInfo changeDisplayContent={this.changeDisplayContent} changeChannelAndOauth={this.changeChannelAndOauth}/>
          console.log("initialinfo");
          break;
        case "moduleinfo":
        return <ModuleInfo changeDisplayContent={this.changeDisplayContent} changeModules={this.changeModules}/>
          break;
        case "botview":
        return <BotView oauth={this.state.oauth} channel={this.state.channel} modules={this.state.modules} />
          default:
          return <InitialInfo changeDisplayContent={this.changeDisplayContent} changeChannelAndOauth={this.changeChannelAndOauth}/>
          break;
      
  
    }
  }


  render() {


    return (
      <div>
      <Menu
      theme="dark"
      mode="horizontal"
      selectable={false}
     >
      <Menu.Item key="twitch">
          Stupid Simple Twitch Bot
        </Menu.Item>
    
             </Menu>

<Row style={{marginTop:25,}}>
<Col span={8}/>
<Col span={8}>{this.DisplayedContent(this.state.userSelection)}</Col>
</Row>

</div>
    );
  }
}


export default Form.create()(App);
