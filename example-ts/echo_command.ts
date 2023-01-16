import { BasicCommand, utilities } from '..'

const { isHelp } = utilities

export const echoCommand = new BasicCommand({
  name: 'echo',
  options: '<text> [-t --times]',
  description: 'Echoes back what you send',
  run: async (argv, help) => {
    const text = argv._[0]

    if (!text) {
      help()
      process.exit(isHelp(argv) ? 1 : 0)
    }

    const times = parseInt(argv.t || argv.times || 0)

    for (let i = 0; i < times; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(text)
    }
  }
})
