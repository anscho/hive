// Whether the user is requesting the help menu.
// Supports `command -h`, `command --help`, and `command help`
const isHelp = argv => argv && (argv.h || argv.help || argv._[0] === 'help')

const isVerbose = argv => argv && (argv.v || argv.verbose)

module.exports = {
  isHelp,
  isVerbose
}
