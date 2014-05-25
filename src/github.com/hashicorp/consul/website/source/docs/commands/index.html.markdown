---
layout: "docs"
page_title: "Commands"
sidebar_current: "docs-commands"
---

# Consul Commands (CLI)

Consul is controlled via a very easy to use command-line interface (CLI).
Consul is only a single command-line application: `consul`. This application
then takes a subcommand such as "agent" or "members". The complete list of
subcommands is in the navigation to the left.

The `Consul` CLI is a well-behaved command line application. In erroneous
cases, a non-zero exit status will be returned. It also responds to `-h` and `--help`
as you'd most likely expect. And some commands that expect input accept
"-" as a parameter to tell Consul to read the input from stdin.

To view a list of the available commands at any time, just run `consul` with
no arguments:

```
$ consul
usage: consul [--version] [--help] <command> [<args>]

Available commands are:
    agent          Runs a Consul agent
    force-leave    Forces a member of the cluster to enter the "left" state
    info           Provides debugging information for operators
    join           Tell Consul agent to join cluster
    keygen         Generates a new encryption key
    leave          Gracefully leaves the Consul cluster and shuts down
    members        Lists the members of a Consul cluster
    monitor        Stream logs from a Consul agent
    version        Prints the Consul version
```

To get help for any specific command, pass the `-h` flag to the relevant
subcommand. For example, to see help about the `members` subcommand:

```
$ consul members -h
Usage: consul members [options]

  Outputs the members of a running Consul agent.

Options:

  -detailed                 Additional information such as protocol verions
                            will be shown.

  -role=<regexp>            If provided, output is filtered to only nodes matching
                            the regular expression for role

  -rpc-addr=127.0.0.1:8400  RPC address of the Consul agent.

  -status=<regexp>			If provided, output is filtered to only nodes matching
                            the regular expression for status

  -wan						If the agent is in server mode, this can be used to return
                            the other peers in the WAN pool
```
