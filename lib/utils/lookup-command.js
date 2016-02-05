'use strict';

let Unknown = require('../commands/unknown');

function findCommand(commands, name) {
  for (var key in commands) {
    if (!commands.hasOwnProperty(key)) return;

    let command = commands[key];

    if (name === command.nam || (command.aliases && command.aliases.some(a => a === name))) {
      return command;
    }
  }
}

module.exports = function(commands, name, args, opts) {
  let options = opts || {},
    Command = findCommand(commands, name);

  return Command || Unkown;
}
