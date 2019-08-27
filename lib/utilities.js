// Whether the user is requesting the help menu.
// Supports `command -h`, `command --help`, and `command help`
const isHelp = argv => argv.h || argv.help || argv._[0] === 'help'

module.exports = {
  isHelp
}
