# Cherry

## Description

For organisations with a larger number of repositories, maintaining consistent
branding across them can be tough. Cherry is here to help though, with its quick
and simple command line interface, you just build a template for either a logo
or social preview, and run the `cherry` command in the repository you wish to
generate beautiful, consistent branding.

## Usage

To generate your assets, you’ll first need to have built some templates _(they
should be written using moustache)_. Each one must have a `.target` class that
contains the markup for your logo or social preview.

When you're ready to generate your first logo or social preview, navigate to the
project that you wish to generate the assets for, and simply run the following
command...

```sh
cherry -n “My project name” -d “It’s pretty cool”
```

> Note that if you’re running Cherry in a Node.js project it should be able to
> pick up your `package.json` file, and automatically inject the values found
> within.

## Features

As mentioned above, Cherry will automatically pickup any keys defined within
your projects `package.json` file _(assuming it’s a Node.js project)_. If,
however, your project is not a Node.js project, or you require any custom keys,
Cherry will interpret any keys that you may supply accordingly, and pass them to
your templates.

For example, if you'd like to pass your `superGreeting` value to your templates,
this should do the trick...

```sh
cherry --superGreeting "Oh, hi Mark"
```
