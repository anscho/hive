// Reusable CLI code

const utilities = require('./utilities').default

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

  help () {
    const maxLength = this.commands
      .map(c => c.name)
      .reduce((acc, name) => Math.max(acc, name.length), 0)

    const commandList = this.commands
      .map(c => `  ${c.name}${' '.repeat(maxLength - c.name.length)}  ${c.description}`)
      .join('\n')

    console.log(`Usage: ${this.name} [OPTIONS] COMMAND [ARGS]...

  ${this.description}

Commands:
${commandList}`)
  }

  async run (argv) {
    const nextCommand = argv._[0]
    const subcommand = nextCommand
      ? this.commands.find(c => c.name === nextCommand)
      : null

    if (!subcommand) {
      this.help()
      process.exit(utilities.is_help(argv) ? 0 : 1)
    }

    subcommand.run(stripFirstArgument(argv))
  }
}

module.exports = NestedCommand
