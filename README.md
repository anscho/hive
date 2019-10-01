# Hive

Hive provides simple tools built on [minimist](https://github.com/substack/minimist) to help nest commands within a CLI.

## Testing

You can test Hive using the [example](example/example.js):
```
> node example/example.js
Usage: example [OPTIONS] COMMAND [ARGS]...

  Hive example CLI

Commands:
  one  First command
  two  Second command

> node example/example.js one
Usage: one [OPTIONS] COMMAND [ARGS]...

  First command

Commands:
  a    Another command
  foo  Classic foobar

> node example/example.js one foo -h
Usage: foo [-b --baz]

  Classic foobar

> node example/example.js one foo
bar

> node example/example.js one foo -b
baz
```
