import * as fs from 'fs'
import * as path from 'path'
import { BasicCommand } from '..'

module.exports = new BasicCommand({
  name: 'license',
  options: '',
  description: 'Prints the license for this library',
  run: async _ => {
    const license = fs.readFileSync(path.resolve(__dirname, '../LICENSE.txt'))
    console.log(license.toString())
  }
})
