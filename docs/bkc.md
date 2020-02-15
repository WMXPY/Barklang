# Grammar of bkc

## Grammar

### Variable

```bk
var a = 10
var b
a = 20
```

## Examples

### Variable and return

```bk
var a = 10
a = a + 5
return a
```

The above lang shall return 15

### Print to console

```bk
print '150'
```

The above lang shall log '150' in the console.

### External function

```bk
someFunction 15
```

The above lang shall call someFunction(15) in javascript.

## Error

bkc function will throw error global when one occurd if you are running code from an untrusted user, you can use try catch block response to them

```js
import bkc from 'bkc';
// es5
const bkc = require('bkc').default;

bkc("hahaha 'hello world!'"); // command is not defined exception
```

Use try catch block

```js
import bkc from 'bkc';
// es5
const bkc = require('bkc').default;

try {
    bkc("hahaha 'hello world!'"); // ~~~
}catch(err){
    console.log(err); // command is not defined exception
}
```
