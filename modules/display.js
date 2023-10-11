function clearTerminal() {
    process.stdout.write('\x1b[2J\x1b[0f');
  }
  
  module.exports = { clearTerminal };
  