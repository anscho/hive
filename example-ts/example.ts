import * as minimist from 'minimist'
import { NestedCommand } from '..'

// CLI

const argv = minimist.default(process.argv.slice(2))

const command = new NestedCommand({
  name: 'example',
  description: 'Hive example CLI',
  commands: [
    new NestedCommand({
      name: 'one',
      description: 'First command',
      commands: [
        new NestedCommand({
          name: 'a',
          description: 'Another command',
          commands: [
            require('./license_command')
          ]
        }),
        require('./foobar_command')
      ]
    }),
    new NestedCommand({
      name: 'two',
      description: 'Second command',
      commands: [
        require('./echo_command')
      ]
    })
  ]
})

command.run(argv)
