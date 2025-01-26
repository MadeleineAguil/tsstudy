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

Object-oriented programming constructs with TypeScript enhancements:

- **Access Modifiers**: `public`, `private`, `protected`
- **Inheritance**: Extend classes with `extends`
- **Abstract Classes**: Base classes that cannot be instantiated
- **Static Members**: Properties and methods that belong to the class itself
- **Getters and Setters**: Property accessors with custom logic
- **Parameter Properties**: Shorthand constructor syntax

**Example:**
```typescript
class BankAccount {
    public accountHolder: string;
    private balance: number;
    protected accountNumber: string;
    
    constructor(accountHolder: string, initialBalance: number) {
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
    }
    
    public deposit(amount: number): void {
        this.balance += amount;
    }
}
```

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