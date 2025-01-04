// Interfaces in TypeScript
// Interfaces define the structure of objects and enforce contracts

// Basic interface definition
interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

// Using the interface
const user1: User = {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    isActive: true
};

// Optional properties - marked with ?
interface Product {
    id: number;
    name: string;
    price: number;
    description?: string; // Optional property
    category?: string; // Optional property
}

const laptop: Product = {
    id: 101,
    name: "Gaming Laptop",
    price: 1299.99
    // description and category are optional
};

// Readonly properties - cannot be changed after initialization
interface ReadonlyPoint {
    readonly x: number;
    readonly y: number;
}

const point: ReadonlyPoint = { x: 10, y: 20 };
// point.x = 5; // Error: Cannot assign to 'x' because it is a read-only property

// Function types in interfaces
interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
}

const basicCalculator: Calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b
};

// Interface with method signatures
interface Animal {
    name: string;
    makeSound(): void;
    move(distance: number): string;
}

const dog: Animal = {
    name: "Buddy",
    makeSound(): void {
        console.log("Woof! Woof!");
    },
    move(distance: number): string {
        return `${this.name} moved ${distance} meters`;
    }
};

// Index signatures - for objects with dynamic properties
interface StringDictionary {
    [key: string]: string;
}

const translations: StringDictionary = {
    "hello": "hola",
    "goodbye": "adiós",
    "thank you": "gracias"
};

// Number index signature
interface NumberArray {
    [index: number]: string;
}

const fruits: NumberArray = {
    0: "apple",
    1: "banana",
    2: "orange"
};

// Extending interfaces - inheritance
interface Person {
    name: string;
    age: number;
}

interface Employee extends Person {
    employeeId: string;
    department: string;
    salary: number;
}

const employee: Employee = {
    name: "John Smith",
    age: 30,
    employeeId: "EMP001",
    department: "Engineering",
    salary: 75000
};

// Multiple inheritance
interface Flyable {
    fly(): void;
}

interface Swimmable {
    swim(): void;
}

interface Duck extends Flyable, Swimmable {
    quack(): void;
}

const duck: Duck = {
    fly(): void {
        console.log("Flying in the sky");
    },
    swim(): void {
        console.log("Swimming in the pond");
    },
    quack(): void {
        console.log("Quack quack!");
    }
};

// Hybrid types - objects that act as both function and object
interface Counter {
    (start: number): string; // Function signature
    interval: number; // Property
    reset(): void; // Method
}

function getCounter(): Counter {
    let counter = function(start: number) {
        return `Count from ${start}`;
    } as Counter;
    
    counter.interval = 123;
    counter.reset = function() {
        console.log("Counter reset");
    };
    
    return counter;
}

const myCounter = getCounter();
console.log(myCounter(10)); // Function call
console.log(myCounter.interval); // Property access
myCounter.reset(); // Method call

// Example usage
console.log(`User: ${user1.name} (${user1.email})`);
console.log(`Product: ${laptop.name} - $${laptop.price}`);
console.log(basicCalculator.add(5, 3));
dog.makeSound();
console.log(duck.quack());
console.log(translations["hello"]);