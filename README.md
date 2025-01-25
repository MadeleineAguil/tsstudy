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

Interfaces define the structure of objects and enforce contracts:

- **Basic Structure**: Define object shapes with required properties
- **Optional Properties**: Use `?` for properties that may be undefined
- **Readonly Properties**: Use `readonly` for immutable properties
- **Method Signatures**: Define function types within interfaces
- **Index Signatures**: For dynamic property access
- **Inheritance**: Extend interfaces with `extends`

**Example:**
```typescript
interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    description?: string; // Optional
}

interface Employee extends User {
    employeeId: string;
    department: string;
}
```

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