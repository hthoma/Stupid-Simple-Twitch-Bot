import React, { Component } from 'react';
import {Card,Menu,Icon,Row, Col,Button, Form, Input, Select} from 'antd';
import {getCommands} from './botExample';

const FormItem = Form.Item;
const Option = Select.Option;

const children = [];
const commands = getCommands();
for (let i = 0; i < commands.length; i++) {
    console.log('onerun');
  children.push(<Option key={commands[i]}>{commands[i]}</Option>);
}




class ModuleInfo extends Component {
    

    handleChange = (value) =>  {
        this.props.changeModules(value);
      }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
    
            this.props.changeDisplayContent("botview");
    
    
          }
        });
      }
    
    
    render(){
        const { getFieldDecorator } = this.props.form;

    return(
<Card>
  <h1>Select Modules</h1>
  
  <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('oathKey', {
            rules: [{ required: true, message: 'Please add at least one module!' }],
          })(
            <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Please select"
    defaultValue={['a10', 'c12']}
    onChange={this.handleChange}
  >
    {children}
  </Select>
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

        export default Form.create()(ModuleInfo);