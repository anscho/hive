// Reusable CLI code

const {
  isHelp,
  isVerbose
} = require('./utilities')

// Remove the first argument for nested calls
const stripFirstArgument = argv => ({
  ...argv,
  _: argv._.slice(1)
})

// Supports CLI abstraction for subcommands
class NestedCommand {
  constructor ({
    commands,
    name,
    description
  }) {
    this.commands = commands
    this.name = name
    this.description = description
  }

  help (argv) {
    const maxLength = this.commands
      .map(c => c.name)
      .reduce((acc, name) => Math.max(acc, name.length), 0)

    console.log(`Usage: ${this.name} [OPTIONS] COMMAND [ARGS]...

  ${this.description}
`)
    if (isVerbose(argv)) {
      console.log('Command tree:')
      this.helpTree(1)
    } else {
      const commandList = this.commands
        .map(c => `  ${c.name}${' '.repeat(maxLength - c.name.length)}  ${c.description}`)
        .join('\n')

      console.log(`Commands:
${commandList}`)
    }
  }

  helpTree (indentation = 0) {
    this.commands.forEach(command => {
      console.log(`${' '.repeat(indentation * 2)}${command.name}`)
      if (command.helpTree) {
        command.helpTree(indentation + 1)
      }
    })
  }

  run (argv) {
    const subcommand = this.commands.find(c => c.name === [argv._[0]])

    if (!subcommand) {
      this.help(argv)
      process.exit(isHelp(argv) ? 0 : 1)
    }

    subcommand.run(stripFirstArgument(argv))
  }
}

module.exports = NestedCommand
