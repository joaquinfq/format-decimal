# @jf/format-decimal [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Format thousands and decimals with custom separator: 1.000.000,00

## Options

You can pass a configuration object as second parameter with the following keys:

* **decimal:** Symbol to use for decimal point (default: `,`).
* **precision:** Number of decimal digits to show (default: `2`).
* **thousands:** Symbol to use for thousands separator (default: `.`).

## Usage

[![npm install @jf/format-decimal](https://nodei.co/npm/@jf/format-decimal.png?mini=true)](https://npmjs.org/package/@jf/format-decimal/)

```js
const formatDecimal = require('format-decimal');

console.log(formatDecimal(123456.789)); // 123.456,79
console.log(
    formatDecimal(
        123456.789,
        {
            decimal   : '.',
            precision : 1,
            thousands : ','
        }
    )
); // 123,456.8
```
