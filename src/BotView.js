import React, { Component } from 'react';
import {Card,Menu,Icon,Row, Col,Button, Form, Input, Select,Table} from 'antd';

const tmi = require('tmi.js')
const haikudos = require('haikudos')
let nummessage = 3;
let dataSource = [{
    key: '1',
    user: 'Mike',
    message: '32',
  }, {
    key: '2',
    user: 'John',
    message: '42',
  }];
  
  const columns = [{
    title: 'User',
    dataIndex: 'user',
    key: 'user',
  }, {
    title: 'Message',
    dataIndex: 'message',
    key: 'message',
  }];



// Called every time the bot connects to Twitch chat:
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`)
}

// Called every time the bot disconnects from Twitch:
function onDisconnectedHandler (reason) {
  console.log(`Disconnected: ${reason}`)
}
class BotView extends Component {
    constructor(props) {
        super(props)

      this.state = {
        chat: "welcome to chat!",

    }
}
    componentDidMount(){
        let commandPrefix = '!'
        // Define configuration options:
        let opts = {
          identity: {
            username: 'hthoma12',
            password: 'oauth:' + this.props.oauth
          },
          channels: [
            this.props.channel
          ]
        }
        
        
        let knownCommands = { echo, haiku, whoami }
        // These are the commands the bot knows (defined below):
        
        
        // Function called when the "echo" command is issued:
        function echo (target, context, params) {
          // If there's something to echo:
          if (params.length) {
            // Join the params into a string:
            const msg = params.join(' ')
            // Send it back to the correct place:
            sendMessage(target, context, msg)
          } else { // Nothing to echo
            console.log(`* Nothing to echo`)
          }
        }
        
        function whoami (target, context) {
         const msg = 'You are ' + context.username;
         sendMessage(target, context, msg)
            }
        
        
        
          
        
        // Function called when the "haiku" command is issued:
        function haiku (target, context) {
          // Generate a new haiku:
          haikudos((newHaiku) => {
            // Split it line-by-line:
            newHaiku.split('\n').forEach((h) => {
            // Send each line separately:
            sendMessage(target, context, h)
            })
          })
        }
        
        // Helper function to send the correct type of message:
        function sendMessage (target, context, message) {
          if (context['message-type'] === 'whisper') {
            client.whisper(target, message)
          } else {
            client.say(target, message)
          }
        }
        
        // Create a client with our options:
        let client = new tmi.client(opts)
        
        // Register our event handlers (defined below):
        client.on('message', onMessageHandler)
        client.on('connected', onConnectedHandler)
        client.on('disconnected', onDisconnectedHandler)
        
        // Connect to Twitch:
        client.connect()
        let updateState = (msg) =>{
            this.setState(previousState => ({
                chat: [...previousState.chat, msg]
            }));


        }

        // Called every time a message comes in:
        function onMessageHandler (target, context, msg, self) {
          if (self) { return } // Ignore messages from the bot
        
            updateState('\n' + `[${target} (${context['message-type']})] ${context.username}: ${msg}`);
          // This isn't a command since it has no prefix:
          if (msg.substr(0, 1) !== commandPrefix) {
            console.log(`[${target} (${context['message-type']})] ${context.username}: ${msg}`)
            return
          }
           

          // Split the message into individual words:
          const parse = msg.slice(1).split(' ')
          // The command name is the first (0th) one:
          const commandName = parse[0]
          // The rest (if any) are the parameters:
          const params = parse.splice(1)
        
          // If the command is known, let's execute it:
          if (commandName in knownCommands) {
            // Retrieve the function by its name:
            const command = knownCommands[commandName]
            // Then call the command with parameters:
            command(target, context, params)
            console.log(`* Executed ${commandName} command for ${context.username}`)
          } else {
            console.log(`* Unknown command ${commandName} from ${context.username}`)
          }
        }

    }
    
    render(){


    return(
<Card>
  <h1>Bot View</h1>
  <pre style={{whiteSpace: 'pre-wrap',}}>{this.state.chat}</pre>
  </Card>
        );
        }
        }

        export default Form.create()(BotView);