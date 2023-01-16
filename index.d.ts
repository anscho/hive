import minimist from 'minimist'

export const utilities: {
  isHelp: (argv: minimist.ParsedArgs) => boolean
  isVerbose: (argv: minimist.ParsedArgs) => boolean
}

export interface Command {
  name: string
  description: string

  help(): void
  run(argv: minimist.ParsedArgs): Promise<void>
}

export type CommandFunction = (
  argv: minimist.ParsedArgs,
  help: () => void
) => Promise<void>

export class BasicCommand implements Command {
  name: string
  options: string
  description: string
  runInternal: CommandFunction

  constructor(args: {
    name: string
    options: string
    description: string
    run: CommandFunction
  })

  help(): void
  run(argv: minimist.ParsedArgs): Promise<void>
}

export class NestedCommand implements Command {
  name: string
  description: string

  constructor(args: {
    name: string
    description: string
    commands: Array<Command>
  })

  help(): void
  run(argv: minimist.ParsedArgs): Promise<void>
}
