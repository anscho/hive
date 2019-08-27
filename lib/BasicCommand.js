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

  run (argv) {
    if (isHelp(argv)) {
      this.help()
      return
    }

    try {
      this.runInternal(argv, this.help)
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = BasicCommand