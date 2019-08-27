// Is the user asking for help
const is_help = argv => argv.h || argv.help || argv._[0] === 'help'

module.exports = {
  is_help
}
