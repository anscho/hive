const fs = require('fs')
const path = require('path')

const {
  BasicCommand
} = require('../index')

module.exports = new BasicCommand({
  name: 'license',
  options: '',
  description: 'Prints the license for this library',
  run: _ => {
    const license = fs.readFileSync(path.resolve(__dirname, '../LICENSE.txt'))
    console.log(license.toString())
  }
})
