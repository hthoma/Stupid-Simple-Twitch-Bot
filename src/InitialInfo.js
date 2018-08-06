import React, { Component } from 'react';
import {Card,Menu,Icon,Row, Col,Button, Form, Input, Select} from 'antd';
import {Bot} from './botExample';

const FormItem = Form.Item;

const Option = Select.Option;





class InitialInfo extends Component {
  constructor(props) {
   
   
    super(props);


  }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            
            this.props.changeDisplayContent("moduleinfo");
            this.props.changeChannelAndOauth(values.oathKey,values.chatroom);

    
          }
        });
      }
    
    
    render(){
        const { getFieldDecorator } = this.props.form;

    return(
<Card>
  <h1>Channel Info</h1>
  
  <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('oathKey', {
            rules: [{ required: true, message: 'Please input your oath key!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Oath Key" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('chatroom', {
            rules: [{ required: true, message: 'Please input channel for bot to operate on!' }],
          })(
            <Input prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="Chat Room" />
          )}
        </FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button">
            Connect to chat room
          </Button>
        </Form>
  
  </Card>
        );
        }
        }

        export default Form.create()(InitialInfo);