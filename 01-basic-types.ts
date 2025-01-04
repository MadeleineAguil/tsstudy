// Basic Types in TypeScript
// This file demonstrates the fundamental data types available in TypeScript

// Primitive Types
let isDone: boolean = false; // Boolean type - represents true/false values
let count: number = 42; // Number type - includes integers and floating-point numbers
let userName: string = "John Doe"; // String type - text data
let notDefined: undefined = undefined; // Undefined type
let empty: null = null; // Null type

// BigInt type - for large integers
let bigNumber: bigint = 100n;

// Symbol type - unique identifiers
let uniqueId: symbol = Symbol("id");

// Any type - disables type checking (use sparingly)
let anything: any = 42;
anything = "hello";
anything = true;

// Unknown type - safer alternative to any
let userInput: unknown = 4;
userInput = "hello";
// userInput.toUpperCase(); // Error: need type checking first

// Void type - typically used for functions that don't return a value
function logMessage(): void {
    console.log("This function returns nothing");
}

// Never type - represents values that never occur
function throwError(): never {
    throw new Error("Something went wrong");
}

// Array types
let numbers: number[] = [1, 2, 3, 4, 5]; // Array of numbers
let names: Array<string> = ["Alice", "Bob", "Charlie"]; // Generic array syntax

// Tuple types - arrays with fixed number of elements of specific types
let person: [string, number] = ["John", 30]; // Name and age
let coordinates: [number, number, number] = [10, 20, 30]; // x, y, z coordinates

// Object type
let user: object = {
    name: "Alice",
    age: 25
};

// Type assertions - telling TypeScript about the type when you know better
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length; // Angle bracket syntax alternative: <string>someValue

// Literal types - exact values as types
let direction: "left" | "right" | "up" | "down" = "left";
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6 = 3;

// Example usage
console.log(`User: ${userName}, Count: ${count}, Done: ${isDone}`);
console.log(`Array length: ${numbers.length}`);
console.log(`Person: ${person[0]} is ${person[1]} years old`);