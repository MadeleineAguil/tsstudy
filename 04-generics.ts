// Generics in TypeScript
// Generics allow you to create reusable components that work with multiple types

// Basic generic function
function identity<T>(arg: T): T {
    return arg;
}

// Usage with different types
let numberResult = identity<number>(42);
let stringResult = identity<string>("Hello");
let booleanResult = identity(true); // Type inference - TypeScript can infer the type

console.log(numberResult, stringResult, booleanResult);

// Generic function with array
function getFirstElement<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[0] : undefined;
}

let firstNumber = getFirstElement([1, 2, 3, 4]);
let firstString = getFirstElement(["apple", "banana", "cherry"]);
let firstBoolean = getFirstElement([true, false]);

console.log(firstNumber, firstString, firstBoolean);

// Generic function with multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

let numberStringPair = pair(42, "hello");
let booleanNumberPair = pair(true, 100);

console.log(numberStringPair, booleanNumberPair);

// Generic interfaces
interface Container<T> {
    value: T;
    getValue(): T;
    setValue(value: T): void;
}

class Box<T> implements Container<T> {
    constructor(public value: T) {}
    
    getValue(): T {
        return this.value;
    }
    
    setValue(value: T): void {
        this.value = value;
    }
    
    toString(): string {
        return `Box containing: ${this.value}`;
    }
}

let numberBox = new Box<number>(123);
let stringBox = new Box<string>("TypeScript");

console.log(numberBox.toString());
console.log(stringBox.toString());

// Generic classes
class GenericRepository<T> {
    private items: T[] = [];
    
    add(item: T): void {
        this.items.push(item);
    }
    
    getAll(): T[] {
        return [...this.items]; // Return a copy
    }
    
    findById(id: keyof T, value: T[keyof T]): T | undefined {
        return this.items.find(item => item[id] === value);
    }
    
    count(): number {
        return this.items.length;
    }
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
}

let userRepo = new GenericRepository<User>();
userRepo.add({ id: 1, name: "Alice", email: "alice@example.com" });
userRepo.add({ id: 2, name: "Bob", email: "bob@example.com" });

let productRepo = new GenericRepository<Product>();
productRepo.add({ id: 101, name: "Laptop", price: 999.99 });
productRepo.add({ id: 102, name: "Mouse", price: 29.99 });

console.log(`Users: ${userRepo.count()}`);
console.log(`Products: ${productRepo.count()}`);

// Generic constraints - restricting generic types
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(`Length: ${arg.length}`);
    return arg;
}

logLength("Hello World"); // String has length property
logLength([1, 2, 3, 4]); // Array has length property
logLength({ length: 10, value: "test" }); // Object with length property
// logLength(123); // Error: number doesn't have length property

// Generic constraints using keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

let person = { name: "John", age: 30, city: "New York" };
let personName = getProperty(person, "name"); // Type is string
let personAge = getProperty(person, "age"); // Type is number
// let invalid = getProperty(person, "salary"); // Error: 'salary' is not a key of person

console.log(personName, personAge);

// Conditional types with generics
type IsArray<T> = T extends any[] ? true : false;

type Test1 = IsArray<string[]>; // true
type Test2 = IsArray<number>; // false

// Generic utility functions
function mapArray<T, U>(arr: T[], transform: (item: T) => U): U[] {
    return arr.map(transform);
}

let numbers = [1, 2, 3, 4, 5];
let doubled = mapArray(numbers, x => x * 2);
let strings = mapArray(numbers, x => `Number: ${x}`);

console.log(doubled);
console.log(strings);

// Generic with default type parameters
interface APIResponse<T = any> {
    data: T;
    success: boolean;
    message: string;
}

function createResponse<T = string>(data: T, success: boolean = true): APIResponse<T> {
    return {
        data,
        success,
        message: success ? "Success" : "Error"
    };
}

let stringResponse = createResponse("Hello"); // APIResponse<string>
let numberResponse = createResponse<number>(42); // APIResponse<number>
let userResponse = createResponse<User>({ id: 1, name: "Alice", email: "alice@example.com" });

console.log(stringResponse);
console.log(numberResponse);
console.log(userResponse);

// Generic type aliases
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type ArrayOrSingle<T> = T | T[];

let nullableString: Nullable<string> = "hello";
let optionalNumber: Optional<number> = undefined;
let arrayOrSingle: ArrayOrSingle<number> = [1, 2, 3];

// Generic mapped types
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Partial<T> = {
    [P in keyof T]?: T[P];
};

interface Configuration {
    host: string;
    port: number;
    ssl: boolean;
}

type ReadonlyConfig = Readonly<Configuration>; // All properties become readonly
type PartialConfig = Partial<Configuration>; // All properties become optional

let config: ReadonlyConfig = {
    host: "localhost",
    port: 3000,
    ssl: false
};

// config.host = "example.com"; // Error: Cannot assign to 'host' because it is read-only

let partialConfig: PartialConfig = {
    host: "localhost"
    // port and ssl are optional
};

// Generic factory function
class Animal {
    constructor(public name: string) {}
}

class Dog extends Animal {
    bark(): void {
        console.log(`${this.name} says Woof!`);
    }
}

class Cat extends Animal {
    meow(): void {
        console.log(`${this.name} says Meow!`);
    }
}

function createAnimal<T extends Animal>(
    AnimalClass: new (name: string) => T,
    name: string
): T {
    return new AnimalClass(name);
}

let dog = createAnimal(Dog, "Buddy");
let cat = createAnimal(Cat, "Whiskers");

dog.bark();
cat.meow();

console.log("Generics examples completed!");