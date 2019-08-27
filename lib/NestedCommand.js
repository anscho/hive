// Reusable CLI code

const utilities = require('./utilities').default

// Remove the first argument for nested calls
const strip_first_argument = argv => ({
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
    const max_length = this.commands
      .map(c => c.name)
      .reduce((acc, name) => Math.max(acc, name.length), 0)

    const command_list = this.commands
      .map(c => `  ${c.name}${' '.repeat(max_length - c.name.length)}  ${c.description}`)
      .join('\n')

    console.log(`Usage: ${this.name} [OPTIONS] COMMAND [ARGS]...

  ${this.description}

Commands:
${command_list}`)
  }

  async run (argv) {
    const next_command = argv._[0]
    const subcommand = next_command ? this.commands.find(c => c.name === next_command) : null

    if (!subcommand) {
      this.help()
      process.exit(utilities.is_help(argv) ? 0 : 1)
    }

    subcommand.run(strip_first_argument(argv))
  }
}

module.exports = NestedCommand
