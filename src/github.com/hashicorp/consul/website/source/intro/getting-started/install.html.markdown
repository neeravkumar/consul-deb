---
layout: "intro"
page_title: "Installing Consul"
sidebar_current: "gettingstarted-install"
---

# Install Consul

Consul must first be installed on every node that will be a member of a
Consul cluster. To make installation easy, Consul is distributed as a
[binary package](/downloads.html) for all supported platforms and
architectures. This page will not cover how to compile Consul from
source.

## Installing Consul

To install Consul, find the [appropriate package](/downloads.html) for
your system and download it. Consul is packaged as a "zip" archive.

After downloading Consul, unzip the package. Copy the `consul` binary to
somewhere on the PATH so that it can be executed. On Unix systems,
`~/bin` and `/usr/local/bin` are common installation directories,
depending on if you want to restrict the install to a single user or
expose it to the entire system. On Windows systems, you can put it wherever
you would like.

### OS X

If you are using [homebrew](http://brew.sh/#install) as a package manager,
than you can install consul as simple as:
```
brew cask install consul
```

if you are missing the [cask plugin](http://caskroom.io/) you can install it with:
```
brew install caskroom/cask/brew-cask
```

## Verifying the Installation

After installing Consul, verify the installation worked by opening a new
terminal session and checking that `consul` is available. By executing
`consul` you should see help output similar to that below:

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

If you get an error that `consul` could not be found, then your PATH
environment variable was not setup properly. Please go back and ensure
that your PATH variable contains the directory where Consul was installed.

Otherwise, Consul is installed and ready to go!
