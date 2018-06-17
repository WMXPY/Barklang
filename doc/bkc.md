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

The above lang shall log '150' in console

### External function

```bk
someFunction 15
```

The above lang shall call someFunction(15) in javascript