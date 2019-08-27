const {
  BasicCommand
} = require('../index')

module.exports = new BasicCommand({
  name: 'foo',
  options: '[-b --baz]',
  description: 'Classic foobar',
  run: argv => {
    const baz = argv.b || argv.baz
    console.log(baz ? 'baz' : 'bar')
  }
})
