# TypeScript Study

A comprehensive study project covering fundamental TypeScript concepts with practical examples and detailed explanations.

## Types

TypeScript provides a rich type system that helps catch errors at compile time and provides better development experience. This section covers the core type concepts demonstrated in this project.

### Basic Types

The fundamental building blocks of TypeScript's type system:

- **Primitive Types**: `boolean`, `number`, `string`, `undefined`, `null`
- **BigInt**: For handling large integers (`bigint`)
- **Symbol**: For unique identifiers (`symbol`)
- **Any**: Disables type checking (use sparingly)
- **Unknown**: Type-safe alternative to `any`
- **Void**: Represents absence of a value (typically function returns)
- **Never**: Represents values that never occur

**Example:**
```typescript
let isDone: boolean = false;
let count: number = 42;
let userName: string = "John Doe";
let userInput: unknown = 4; // Safer than any
```

### Array and Tuple Types

- **Arrays**: Collections of elements of the same type
  - `number[]` or `Array<number>`
- **Tuples**: Fixed-length arrays with specific types for each position
  - `[string, number]` for name and age

**Example:**
```typescript
let numbers: number[] = [1, 2, 3, 4, 5];
let person: [string, number] = ["John", 30];
```

### Literal Types

Exact values as types, useful for creating specific constraints:

```typescript
let direction: "left" | "right" | "up" | "down" = "left";
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6 = 3;
```

### Interfaces

Interfaces define the structure of objects and enforce contracts. They are one of TypeScript's core features for creating robust, maintainable code by establishing clear contracts between different parts of your application.

#### Basic Interface Definition

Interfaces define the shape of objects with required properties and their types:

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

const user1: User = {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    isActive: true
};
```

#### Optional Properties

Use the `?` modifier to make properties optional. Objects implementing the interface can omit these properties:

```typescript
interface Product {
    id: number;
    name: string;
    price: number;
    description?: string; // Optional
    category?: string;    // Optional
}

const laptop: Product = {
    id: 101,
    name: "Gaming Laptop",
    price: 1299.99
    // description and category can be omitted
};
```

#### Readonly Properties

Properties marked with `readonly` cannot be modified after object initialization:

```typescript
interface ReadonlyPoint {
    readonly x: number;
    readonly y: number;
}

const point: ReadonlyPoint = { x: 10, y: 20 };
// point.x = 5; // Error: Cannot assign to 'x' because it is read-only
```

#### Method Signatures

Interfaces can define function types and method signatures:

```typescript
interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
}

const basicCalculator: Calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b
};

// Alternative method definition syntax
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
```

#### Index Signatures

Index signatures allow objects to have dynamic properties with specific types:

```typescript
// String index signature
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
```

#### Interface Inheritance

Interfaces can extend other interfaces, inheriting their properties and methods:

```typescript
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
```

#### Multiple Inheritance

An interface can extend multiple interfaces simultaneously:

```typescript
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
```

#### Hybrid Types

Interfaces can describe objects that act as both functions and objects:

```typescript
interface Counter {
    (start: number): string; // Function signature
    interval: number;        // Property
    reset(): void;          // Method
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
console.log(myCounter(10));      // Function call
console.log(myCounter.interval); // Property access
myCounter.reset();               // Method call
```

#### Best Practices

- **Naming**: Use PascalCase for interface names
- **Specificity**: Create specific interfaces rather than overly generic ones
- **Composition**: Prefer composition over deep inheritance hierarchies
- **Optional vs Required**: Carefully consider which properties should be optional
- **Documentation**: Use JSDoc comments for complex interfaces

### Classes

Classes provide a way to create objects with shared properties and methods, implementing object-oriented programming concepts in TypeScript. They offer powerful features for encapsulation, inheritance, and abstraction.

#### Basic Class Definition

Classes define blueprints for creating objects with properties and methods:

```typescript
class Person {
    // Properties
    name: string;
    age: number;
    
    // Constructor - called when creating a new instance
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    // Method
    greet(): string {
        return `Hello, my name is ${this.name} and I'm ${this.age} years old`;
    }
    
    // Method with parameters
    celebrateBirthday(): void {
        this.age++;
        console.log(`Happy birthday! Now I'm ${this.age} years old`);
    }
}

// Creating instances
const person1 = new Person("Alice", 25);
const person2 = new Person("Bob", 30);

console.log(person1.greet());
person1.celebrateBirthday();
```

#### Access Modifiers

TypeScript provides three access modifiers to control property and method visibility:

```typescript
class BankAccount {
    public accountHolder: string;    // Accessible everywhere
    private balance: number;         // Only accessible within this class
    protected accountNumber: string; // Accessible in this class and subclasses
    
    constructor(accountHolder: string, initialBalance: number) {
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
        this.accountNumber = this.generateAccountNumber();
    }
    
    // Public method
    public getBalance(): number {
        return this.balance;
    }
    
    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited $${amount}. New balance: $${this.balance}`);
        }
    }
    
    public withdraw(amount: number): boolean {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
            return true;
        }
        console.log("Insufficient funds or invalid amount");
        return false;
    }
    
    // Private method - only accessible within this class
    private generateAccountNumber(): string {
        return Math.random().toString(36).substr(2, 9).toUpperCase();
    }
}

const account = new BankAccount("John Doe", 1000);
account.deposit(500);
account.withdraw(200);
// account.balance; // Error: Property 'balance' is private
```

#### Inheritance

Classes can extend other classes to inherit their properties and methods:

```typescript
class Animal {
    protected name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    move(distance: number): void {
        console.log(`${this.name} moved ${distance} meters`);
    }
    
    makeSound(): void {
        console.log("Some generic animal sound");
    }
}

class Dog extends Animal {
    breed: string;
    
    constructor(name: string, breed: string) {
        super(name); // Call parent constructor
        this.breed = breed;
    }
    
    // Override parent method
    makeSound(): void {
        console.log(`${this.name} barks: Woof! Woof!`);
    }
    
    // New method specific to Dog
    fetch(): void {
        console.log(`${this.name} is fetching the ball`);
    }
}

class Cat extends Animal {
    constructor(name: string) {
        super(name);
    }
    
    // Override parent method
    makeSound(): void {
        console.log(`${this.name} meows: Meow!`);
    }
    
    // New method specific to Cat
    purr(): void {
        console.log(`${this.name} is purring`);
    }
}

const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers");

dog.makeSound(); // Buddy barks: Woof! Woof!
dog.fetch();     // Buddy is fetching the ball
cat.makeSound(); // Whiskers meows: Meow!
cat.purr();      // Whiskers is purring
```

#### Abstract Classes

Abstract classes cannot be instantiated directly and are meant to be extended by other classes:

```typescript
abstract class Shape {
    abstract getArea(): number; // Abstract method - must be implemented by subclasses
    
    // Concrete method that can be used by subclasses
    describe(): string {
        return `This shape has an area of ${this.getArea()}`;
    }
}

class Rectangle extends Shape {
    constructor(private width: number, private height: number) {
        super();
    }
    
    getArea(): number {
        return this.width * this.height;
    }
}

class Circle extends Shape {
    constructor(private radius: number) {
        super();
    }
    
    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

const rectangle = new Rectangle(10, 5);
const circle = new Circle(3);

console.log(rectangle.describe()); // This shape has an area of 50
console.log(circle.describe());    // This shape has an area of 28.27...
// const shape = new Shape(); // Error: Cannot create an instance of an abstract class
```

#### Static Properties and Methods

Static members belong to the class itself rather than instances:

```typescript
class MathUtils {
    static PI = 3.14159; // Static property
    
    // Static method - called on the class, not on instances
    static calculateCircleArea(radius: number): number {
        return MathUtils.PI * radius * radius;
    }
    
    static max(a: number, b: number): number {
        return a > b ? a : b;
    }
}

console.log(`PI: ${MathUtils.PI}`);
console.log(`Circle area: ${MathUtils.calculateCircleArea(5)}`);
console.log(`Max of 10 and 7: ${MathUtils.max(10, 7)}`);
```

#### Getters and Setters

Property accessors allow you to control how properties are accessed and modified:

```typescript
class Temperature {
    private _celsius: number;
    
    constructor(celsius: number) {
        this._celsius = celsius;
    }
    
    // Getter
    get celsius(): number {
        return this._celsius;
    }
    
    // Setter
    set celsius(value: number) {
        if (value < -273.15) {
            throw new Error("Temperature cannot be below absolute zero");
        }
        this._celsius = value;
    }
    
    // Getter for Fahrenheit
    get fahrenheit(): number {
        return (this._celsius * 9/5) + 32;
    }
    
    // Setter for Fahrenheit
    set fahrenheit(value: number) {
        this._celsius = (value - 32) * 5/9;
    }
}

const temp = new Temperature(25);
console.log(`${temp.celsius}°C is ${temp.fahrenheit}°F`);

temp.fahrenheit = 86;
console.log(`${temp.fahrenheit}°F is ${temp.celsius}°C`);
```

#### Parameter Properties

Shorthand syntax for constructor parameters that automatically creates and assigns properties:

```typescript
class Product {
    constructor(
        public id: number,           // Creates public property
        public name: string,         // Creates public property
        private price: number,       // Creates private property
        protected category: string   // Creates protected property
    ) {
        // Properties are automatically created and assigned
    }
    
    getPrice(): number {
        return this.price;
    }
    
    getInfo(): string {
        return `${this.name} (ID: ${this.id}) - $${this.price}`;
    }
}

const product = new Product(1, "Laptop", 999.99, "Electronics");
console.log(product.getInfo()); // Laptop (ID: 1) - $999.99
console.log(product.id);        // 1 (public property)
// console.log(product.price);  // Error: price is private
```

#### Best Practices

- **Encapsulation**: Use appropriate access modifiers to control visibility
- **Single Responsibility**: Each class should have one clear purpose
- **Inheritance**: Use inheritance judiciously; prefer composition when appropriate
- **Abstract Classes**: Use abstract classes for shared behavior with required implementations
- **Method Naming**: Use descriptive method names that clearly indicate their purpose
- **Constructor Validation**: Validate parameters in constructors to ensure object integrity

### Advanced Type Features

- **Generics**: Create reusable components that work with multiple types
- **Union Types**: Allow values to be one of several types (`string | number`)
- **Intersection Types**: Combine multiple types into one
- **Function Types**: Define the signature of functions
- **Enums**: Define named constants

## Project Structure

```
tsstudy/
├── 01-basic-types.ts       # Fundamental TypeScript types
├── 02-interfaces.ts        # Interface definitions and usage
├── 03-classes.ts          # Class-based object-oriented programming
├── 04-generics.ts         # Generic types and functions
├── 05-functions.ts        # Function types and signatures
├── 06-enums.ts           # Enumeration types
├── 07-union-intersection-types.ts # Advanced type combinations
└── 08-modules.ts         # Module system and imports/exports
```

Each file contains comprehensive examples with detailed comments explaining the concepts and practical usage patterns.