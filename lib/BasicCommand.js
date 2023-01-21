// Wrapper for leaf commands

const { isHelp } = require('./utilities')

class BasicCommand {
  constructor({ name, options, description, run }) {
    if (!name) {
      throw new Error('name is required')
    }
    if (!run) {
      throw new Error('run is required')
    }
    this.name = name
    this.options = options
    this.description = description
    this.runInternal = run
  }

  help() {
    console.log(`Usage: ${this.name} ${this.options}

  ${this.description}
`)
  }

  async run(argv) {
    if (isHelp(argv)) {
      this.help()
      return
    }

    await this.runInternal(argv, this.help)
  }
}

module.exports = BasicCommand
