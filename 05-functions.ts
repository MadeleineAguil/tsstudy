// Functions in TypeScript
// This file demonstrates various ways to define and use functions in TypeScript

// Basic function declaration
function add(a: number, b: number): number {
    return a + b;
}

// Function expression
const multiply = function(a: number, b: number): number {
    return a * b;
};

// Arrow function
const subtract = (a: number, b: number): number => {
    return a - b;
};

// Arrow function with implicit return (single expression)
const divide = (a: number, b: number): number => a / b;

// Function with optional parameters
function greet(name: string, greeting?: string): string {
    return `${greeting || "Hello"}, ${name}!`;
}

// Function with default parameters
function createUser(name: string, age: number = 18, isActive: boolean = true): object {
    return { name, age, isActive };
}

// Function with rest parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

// Function overloads - multiple function signatures
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: any, b: any): any {
    return a + b;
}

// Usage examples
console.log(add(5, 3)); // 8
console.log(multiply(4, 7)); // 28
console.log(subtract(10, 4)); // 6
console.log(divide(15, 3)); // 5

console.log(greet("Alice")); // Hello, Alice!
console.log(greet("Bob", "Hi")); // Hi, Bob!

console.log(createUser("John")); // { name: "John", age: 18, isActive: true }
console.log(createUser("Jane", 25, false)); // { name: "Jane", age: 25, isActive: false }

console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum()); // 0

console.log(combine("Hello", " World")); // Hello World
console.log(combine(10, 20)); // 30

// Function types - defining the shape of a function
type MathOperation = (a: number, b: number) => number;

const operations: { [key: string]: MathOperation } = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b
};

// Function that takes another function as parameter (Higher-order function)
function calculate(operation: MathOperation, a: number, b: number): number {
    return operation(a, b);
}

console.log(calculate(operations.add, 5, 3)); // 8
console.log(calculate(operations.multiply, 4, 6)); // 24

// Function that returns another function
function createMultiplier(factor: number): (num: number) => number {
    return (num: number) => num * factor;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(4)); // 12

// Generic functions
function identity<T>(arg: T): T {
    return arg;
}

function wrapInArray<T>(value: T): T[] {
    return [value];
}

console.log(identity("hello")); // hello
console.log(identity(42)); // 42
console.log(wrapInArray("TypeScript")); // ["TypeScript"]
console.log(wrapInArray(123)); // [123]

// Function with destructuring parameters
interface Point {
    x: number;
    y: number;
}

function calculateDistance({ x: x1, y: y1 }: Point, { x: x2, y: y2 }: Point): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

const point1: Point = { x: 0, y: 0 };
const point2: Point = { x: 3, y: 4 };

console.log(calculateDistance(point1, point2)); // 5

// Function with tuple parameters and return
function swapElements<T>(tuple: [T, T]): [T, T] {
    return [tuple[1], tuple[0]];
}

console.log(swapElements([1, 2])); // [2, 1]
console.log(swapElements(["hello", "world"])); // ["world", "hello"]

// Async functions
async function fetchData(url: string): Promise<string> {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
}

async function processData(): Promise<void> {
    try {
        const data = await fetchData("https://api.example.com");
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function with conditional return types
function processValue<T extends string | number>(value: T): T extends string ? string : number {
    if (typeof value === "string") {
        return value.toUpperCase() as any;
    } else {
        return (value * 2) as any;
    }
}

// Callback function types
type EventCallback = (event: string, data: any) => void;

class EventEmitter {
    private listeners: { [event: string]: EventCallback[] } = {};
    
    on(event: string, callback: EventCallback): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    
    emit(event: string, data: any): void {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(event, data));
        }
    }
}

const emitter = new EventEmitter();
emitter.on("message", (event, data) => {
    console.log(`Received ${event}: ${data}`);
});

emitter.emit("message", "Hello World");

// Function with this context typing
interface Calculator {
    value: number;
}

function addToThis(this: Calculator, amount: number): number {
    return this.value + amount;
}

const calc: Calculator = { value: 10 };
const result = addToThis.call(calc, 5);
console.log(result); // 15

// Method decorators (experimental feature)
function logMethod(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function(...args: any[]) {
        console.log(`Calling ${propertyName} with arguments:`, args);
        const result = method.apply(this, args);
        console.log(`Method ${propertyName} returned:`, result);
        return result;
    };
}

class MathService {
    @logMethod
    power(base: number, exponent: number): number {
        return Math.pow(base, exponent);
    }
}

// Pure functions - functions without side effects
function isPure(input: string): boolean {
    return input.length > 0; // Only depends on input, no side effects
}

// Impure function - has side effects
let counter = 0;
function increment(): number {
    counter++; // Side effect: modifies external state
    return counter;
}

// Function composition
const addOne = (x: number): number => x + 1;
const multiplyByTwo = (x: number): number => x * 2;

function compose<T, U, V>(f: (x: U) => V, g: (x: T) => U): (x: T) => V {
    return (x: T) => f(g(x));
}

const addOneThenDouble = compose(multiplyByTwo, addOne);
console.log(addOneThenDouble(5)); // 12 (5 + 1 = 6, 6 * 2 = 12)

// Currying - transforming function with multiple arguments into sequence of functions
function curry<T, U, V>(fn: (a: T, b: U) => V): (a: T) => (b: U) => V {
    return (a: T) => (b: U) => fn(a, b);
}

const curriedAdd = curry((a: number, b: number) => a + b);
const addFive = curriedAdd(5);
console.log(addFive(3)); // 8

console.log("Functions examples completed!");