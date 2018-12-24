# selecto/webpack-starter

A simple webpack 4 starter project for your basic web development needs.

## Table of contents:

- [Features](#features)
- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Development and builds](#development-and-builds)


## <a name="features"></a> Features

* Separated development and production webpack settings you can understand
* Pug
* SCSS
* ES6 / TS
* CSS Vendor prefixing
* Development server
* Sourcemaps
* [ESLint](https://standardjs.com/rules.html)
* [StyleLint](https://github.com/stylelint/stylelint-config-standard)
* Production optimizations


## <a name="getting-started"> Getting started

### <a name="installation"> Installation

You can install **`selecto/webpack-starter`** by simply forking the repo:

```
# clone the repo
$ git clone https://github.com/...
$ cd selecto-webpack-starter
```

### <a name="development-builds"> Development & Builds

Below are the scripts to start, build, this project:

#### Install dependencies

```
# use `yarn` or `npm` to install the dependencies
$ yarn
or 
$ npm i
```

#### Create project

```
$ run the kickstart command
$ yarn kickstart
```

#### Development servers (webpack-dev-server)

```
# dev server
$ yarn start
```

#### Build

```
# development build
$ yarn build:dev

# production build
$ yarn build
```