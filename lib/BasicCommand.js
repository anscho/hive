// Wrapper for leaf commands

const { isHelp } = require('./utilities')

class BasicCommand {
  constructor ({
    name,
    options,
    description,
    run
  }) {
    this.name = name
    this.options = options
    this.description = description
    this.runInternal = run
  }

  help () {
    console.log(`Usage: ${this.name} ${this.options}

  ${this.description}
`)
  }

  async run (argv) {
    if (isHelp(argv)) {
      this.help()
      return
    }

    try {
      console.log(await this.runInternal(argv, this.help))
    } catch (error) {
      console.error(error)
    }
  }
}

export default BasicCommand
