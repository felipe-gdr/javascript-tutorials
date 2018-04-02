# Variable Hoisting

In some scenarios, the JavaScript engine brings variables and function declarations to the top of code blocks. This is called <strong>hoisting</strong>.

Hoisting is a subtle behavior of JavaScript that can lead to subtle bugs, however, it is not at all complicated to understand.
## Hoisting with "var"
This will throw an error:
```javascript
console.log(greeting); // ReferenceError: greeting is not defined
```

But this one will not:
```javascript 
console.log(greeting); // prints 'undefined'
var greeting = "hello";
```

Weird, right? Getting an error on our faces is definitely the most intuitively result here, but that didn't happen. That's because <strong>the variable declaration was hoisted to the top of the current scope</strong>, which in this case is the script itself.

In the last example, the JavaScript engine treats the code as it was written like this:

```javascript
var greeting; // declaration of 'greeting' is hoisted to the top of the scope
console.log(greeting); // prints 'undefined'
greeting = "hello"; // initialization of 'greeting' happens at the end
```

Notice that the <strong>variable initialization</strong> (when greeting gets assigned the "hello" value) is not hoisted

Let's look at an example involving a function scope:

```javascript
console.log(greeting); // This will throw ReferenceError: greeting is not defined
function greet() {
    console.log(greeting);// prints 'undefined'
    var greeting = "hello";
}
greet();
```
The declaration of  "greeting" is hoisted the the top of its scope, which is the function "greet". This means that the  first console.log(), the one outside the function greet, will thrown an Exception.
## Hoisting with "let" and "const"
<strong>Hoisting doesn't happen when we use ES6's "let" and "const"</strong>, giving us a somewhat more consistent behavior:

```javascript 
console.log(greeting);// ReferenceError: greeting is not defined
let greeting = "hello";
```
## Code
https://codepen.io/pipo_dev/pen/eMrvyL/

## Summary
Hoisting means "bringing variable declarations to the top of the their scopes", which feels a bit magic and counter intuitive. To keep our code clean and easy to understand we should resort to "let" and "const" whenever possible, otherwise, make sure our "vars" are explicitly declared on the top of their current scope to avoid them being used before their declaration.

[Hoisting on W3](https://www.w3schools.com/js/js_hoisting.asp)
