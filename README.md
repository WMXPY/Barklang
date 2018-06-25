# Barklang

[![npm version](https://badge.fury.io/js/bkc.svg)](https://www.npmjs.com/package/bkc)
[![Build Status](https://travis-ci.org/WMXPY/Barklang.svg?branch=master)](https://travis-ci.org/WMXPY/Barklang)
[![codecov](https://codecov.io/gh/WMXPY/Barklang/branch/master/graph/badge.svg)](https://codecov.io/gh/WMXPY/Barklang)
[![Gitter](https://badges.gitter.im/WMXPY/Barklang.svg)](https://gitter.im/Barklang?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![downloads](https://img.shields.io/npm/dm/bkc.svg)](https://www.npmjs.com/package/bkc)

:dog: Woof!

bkc is a simple programming language, based on javascript. All bkc lang will run in a sandbox environment, so bkc is safe for untrust user input.

## Install

```bash
npm install bkc --save
```

You can use bkc in nodeJS environment or browser (commonjs)

## Usage

Use bkc without external function.

```js
import bkc from 'bkc';
// es5
const bkc = require('bkc').default;

bkc("print 'hello world!'"); // hello world!
```

Use bkc with an external function.

```js
import bkc from 'bkc';
// es5
const bkc = require('bkc').default;

bkc("hello 'hello world!'", [
    {
        command: 'hello',
        func: (arg) => {
            console.log(arg);
        }
    }
]); // hello world!
```

## Documents

-   [Grammar and example](https://github.com/WMXPY/bkc/blob/master/doc/bkc.md)
-   [Develop](https://github.com/WMXPY/bkc/blob/master/doc/develop.md)

> Created by [Ghoti-CLI](https://github.com/WMXPY/Ghoti-CLI/) 3.3.8

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
