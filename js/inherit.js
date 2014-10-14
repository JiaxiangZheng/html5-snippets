/* classical inheritance */
function Parent(name) {
    this.name = name || "Jiaxiang Zheng";
}
Parent.prototype.say = function () {
    console.log(this.name);
}
function Child(name) {}

inherit(Child, Parent);

// classical pattern #1: default pattern
//
// drawbacks: 
//  1. inherit both own properties added to this and prototype properties 
//  2. unable to pass parameters in inherit
function inherit(C, P) {
    C.prototype = new P();
}

// classical pattern #2: rent a constructor
//
// This enable us to use parent constructor code and pass arguments to the
// `Parent` function. However, it can only inherit the properties inside
// `Parent` function. Note in this pattern, `Parent` properties are copied
// directly to Child which means `child.hasOwnProperty(property)` will be true.
// This pattern enables us to implement multiple inheritance by using more than
// one parent constructors inside child constructor.
//
// drawbacks: 
//  1. prototype of parent could not be inherit by child
function Child(para1, para2) {
    Parent1.apply(this, arguments);
    Parent2.apply(this, arguments);
}

// classical pattern #3: rent and set prototype
//
// This pattern solved the drawbacks of previous one
//
// drawbacks:
//  1. inefficient because parent constructor will be called twice
function Child(para1, para2) {
    Parent.apply(this, arguments);
}
Child.prototype = new Parent();

// classical pattern #4: share the prototype
//
// This pattern just set parent constructor prototype to child constructor
// prototype, therefore, it require all the inherit property to be placed inside
// prototype
function inherit(C, P) {
    C.prototype = P.prototype;
}

// classical pattern #5: temporary constructor
//

