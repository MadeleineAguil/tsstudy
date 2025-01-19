// Union and Intersection Types in TypeScript
// These allow you to combine types in powerful ways

// UNION TYPES (|) - A value can be one of several types

// Basic union types
type StringOrNumber = string | number;
type BooleanOrNull = boolean | null;

let value1: StringOrNumber = "hello";
value1 = 42; // Also valid

let value2: BooleanOrNull = true;
value2 = null; // Also valid

// Function with union parameter types
function printId(id: string | number): void {
    console.log(`ID: ${id}`);
}

printId("abc123"); // Valid
printId(456); // Valid

// Union types with type guards
function processValue(value: string | number): string {
    if (typeof value === "string") {
        // TypeScript knows value is string here
        return value.toUpperCase();
    } else {
        // TypeScript knows value is number here
        return value.toString();
    }
}

console.log(processValue("hello")); // "HELLO"
console.log(processValue(123)); // "123"

// Union of object types
interface Car {
    type: "car";
    wheels: 4;
    engine: string;
}

interface Bicycle {
    type: "bicycle";
    wheels: 2;
    pedals: boolean;
}

type Vehicle = Car | Bicycle;

function describeVehicle(vehicle: Vehicle): string {
    // Discriminated union using the 'type' property
    if (vehicle.type === "car") {
        // TypeScript knows this is a Car
        return `Car with ${vehicle.engine} engine and ${vehicle.wheels} wheels`;
    } else {
        // TypeScript knows this is a Bicycle
        return `Bicycle with ${vehicle.wheels} wheels${vehicle.pedals ? " and pedals" : ""}`;
    }
}

const myCar: Car = { type: "car", wheels: 4, engine: "V6" };
const myBike: Bicycle = { type: "bicycle", wheels: 2, pedals: true };

console.log(describeVehicle(myCar));
console.log(describeVehicle(myBike));

// Union with literal types
type Size = "small" | "medium" | "large";
type Color = "red" | "green" | "blue";

function createButton(size: Size, color: Color): string {
    return `A ${size} ${color} button`;
}

console.log(createButton("large", "blue")); // "A large blue button"

// Arrays with union types
type MixedArray = (string | number | boolean)[];
let mixedData: MixedArray = ["hello", 42, true, "world", false];

// Function return union types
function getRandomValue(): string | number {
    return Math.random() > 0.5 ? "random string" : 42;
}

let randomResult = getRandomValue();
console.log(typeof randomResult, randomResult);

// INTERSECTION TYPES (&) - Combines multiple types into one

// Basic intersection types
interface Person {
    name: string;
    age: number;
}

interface Employee {
    employeeId: string;
    department: string;
}

type PersonEmployee = Person & Employee;

const worker: PersonEmployee = {
    name: "John Doe",
    age: 30,
    employeeId: "EMP001",
    department: "Engineering"
};

console.log(`${worker.name} works in ${worker.department}`);

// Intersection with methods
interface Flyable {
    fly(): void;
}

interface Swimmable {
    swim(): void;
}

type FlyingFish = Flyable & Swimmable;

const flyingFish: FlyingFish = {
    fly(): void {
        console.log("Flying through the air!");
    },
    swim(): void {
        console.log("Swimming in the water!");
    }
};

flyingFish.fly();
flyingFish.swim();

// Intersection of function types
type Logger = (message: string) => void;
type Formatter = (message: string) => string;

type LoggerWithFormatter = Logger & Formatter & {
    logLevel: string;
};

// This doesn't work as expected because you can't have a function that returns both void and string
// Better to use intersection with objects containing functions

interface LoggingService {
    log: (message: string) => void;
    format: (message: string) => string;
    level: string;
}

interface TimestampService {
    addTimestamp: (message: string) => string;
    getCurrentTime: () => Date;
}

type EnhancedLogger = LoggingService & TimestampService;

const enhancedLogger: EnhancedLogger = {
    log(message: string): void {
        console.log(this.addTimestamp(this.format(message)));
    },
    format(message: string): string {
        return `[${this.level}] ${message}`;
    },
    level: "INFO",
    addTimestamp(message: string): string {
        return `${this.getCurrentTime().toISOString()} ${message}`;
    },
    getCurrentTime(): Date {
        return new Date();
    }
};

enhancedLogger.log("Application started");

// Complex union and intersection combinations
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;

// Intersection with additional properties
type NamedShape = Shape & { name: string };

const namedShapes: NamedShape[] = [
    { kind: "square", size: 10, name: "Small Square" },
    { kind: "circle", radius: 5, name: "Medium Circle" },
    { kind: "rectangle", width: 8, height: 12, name: "Large Rectangle" }
];

function calculateArea(shape: Shape): number {
    switch (shape.kind) {
        case "square":
            return shape.size * shape.size;
        case "rectangle":
            return shape.width * shape.height;
        case "circle":
            return Math.PI * shape.radius * shape.radius;
        default:
            // Exhaustive check - TypeScript will error if we miss a case
            const exhaustiveCheck: never = shape;
            return exhaustiveCheck;
    }
}

namedShapes.forEach(shape => {
    console.log(`${shape.name} has area: ${calculateArea(shape).toFixed(2)}`);
});

// Conditional types with unions
type NonNullable<T> = T extends null | undefined ? never : T;

type Test1 = NonNullable<string | null>; // string
type Test2 = NonNullable<number | undefined>; // number
type Test3 = NonNullable<boolean | null | undefined>; // boolean

// Utility function for narrowing types
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isNumber(value: unknown): value is number {
    return typeof value === "number";
}

function processUnknownValue(value: unknown): string {
    if (isString(value)) {
        return `String: ${value.toUpperCase()}`;
    } else if (isNumber(value)) {
        return `Number: ${value.toFixed(2)}`;
    } else {
        return "Unknown type";
    }
}

console.log(processUnknownValue("hello")); // "String: HELLO"
console.log(processUnknownValue(42.7)); // "Number: 42.70"
console.log(processUnknownValue(true)); // "Unknown type"

// Union types with arrays
type StringArray = string[];
type NumberArray = number[];
type StringOrNumberArray = StringArray | NumberArray;

function processArray(arr: StringOrNumberArray): void {
    if (typeof arr[0] === "string") {
        // TypeScript infers this is a string array
        console.log("String array:", arr.join(", "));
    } else {
        // TypeScript infers this is a number array
        console.log("Number array:", arr.join(", "));
    }
}

processArray(["a", "b", "c"]);
processArray([1, 2, 3]);

// Mapped types with unions
type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

type UserWithOptionalEmail = OptionalKeys<User, "email">;
// Result: { id: number; name: string; age: number; email?: string; }

// Tagged unions for state management
interface LoadingState {
    status: "loading";
}

interface SuccessState {
    status: "success";
    data: string;
}

interface ErrorState {
    status: "error";
    error: string;
}

type RequestState = LoadingState | SuccessState | ErrorState;

function handleRequestState(state: RequestState): string {
    switch (state.status) {
        case "loading":
            return "Loading...";
        case "success":
            return `Success: ${state.data}`;
        case "error":
            return `Error: ${state.error}`;
        default:
            const exhaustiveCheck: never = state;
            return exhaustiveCheck;
    }
}

console.log(handleRequestState({ status: "loading" }));
console.log(handleRequestState({ status: "success", data: "User data loaded" }));
console.log(handleRequestState({ status: "error", error: "Network timeout" }));

// Advanced type manipulation
type ExtractArrayType<T> = T extends (infer U)[] ? U : never;

type StringArrayType = ExtractArrayType<string[]>; // string
type NumberArrayType = ExtractArrayType<number[]>; // number

// Union to intersection conversion
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type Union = { a: string } | { b: number };
type Intersection = UnionToIntersection<Union>; // { a: string } & { b: number }

console.log("Union and Intersection types examples completed!");