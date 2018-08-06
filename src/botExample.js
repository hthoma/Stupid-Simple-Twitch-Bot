const tmi = require('tmi.js')
const haikudos = require('haikudos')

let knownCommands = [ 'echo', 'haiku', 'whoami' ]



export function getCommands(){
    
    console.log(knownCommands);
    return knownCommands;
}


