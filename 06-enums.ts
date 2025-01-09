// Enums in TypeScript
// Enums allow you to define a set of named constants

// Basic numeric enum
enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
}

// Using the enum
let userDirection: Direction = Direction.Up;
console.log(userDirection); // 0
console.log(Direction.Down); // 1
console.log(Direction[0]); // "Up" - reverse mapping

// Enum with explicit values
enum HttpStatus {
    OK = 200,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500
}

function handleResponse(status: HttpStatus): string {
    switch (status) {
        case HttpStatus.OK:
            return "Request successful";
        case HttpStatus.BadRequest:
            return "Bad request";
        case HttpStatus.NotFound:
            return "Resource not found";
        case HttpStatus.InternalServerError:
            return "Server error";
        default:
            return "Unknown status";
    }
}

console.log(handleResponse(HttpStatus.OK)); // "Request successful"
console.log(handleResponse(HttpStatus.NotFound)); // "Resource not found"

// String enums
enum Color {
    Red = "red",
    Green = "green",
    Blue = "blue",
    Yellow = "yellow"
}

function getColorCode(color: Color): string {
    const colorCodes: { [key in Color]: string } = {
        [Color.Red]: "#FF0000",
        [Color.Green]: "#00FF00",
        [Color.Blue]: "#0000FF",
        [Color.Yellow]: "#FFFF00"
    };
    return colorCodes[color];
}

console.log(getColorCode(Color.Red)); // "#FF0000"
console.log(getColorCode(Color.Blue)); // "#0000FF"

// Mixed enums (not recommended, but possible)
enum MixedEnum {
    No = 0,
    Yes = "YES"
}

// Computed enum members
enum FileAccess {
    None,
    Read = 1 << 1,        // 2
    Write = 1 << 2,       // 4
    ReadWrite = Read | Write  // 6
}

console.log(FileAccess.Read); // 2
console.log(FileAccess.Write); // 4
console.log(FileAccess.ReadWrite); // 6

// Const enums - removed during compilation for performance
const enum Sizes {
    Small = "small",
    Medium = "medium",
    Large = "large"
}

// This will be replaced with the literal value during compilation
let shirtSize = Sizes.Medium; // Becomes: let shirtSize = "medium";

// Enum as a type
enum Planet {
    Mercury,
    Venus,
    Earth,
    Mars,
    Jupiter,
    Saturn,
    Uranus,
    Neptune
}

function describePlanet(planet: Planet): string {
    switch (planet) {
        case Planet.Mercury:
            return "Closest to the sun";
        case Planet.Venus:
            return "Hottest planet";
        case Planet.Earth:
            return "Our home planet";
        case Planet.Mars:
            return "The red planet";
        default:
            return "A distant planet";
    }
}

console.log(describePlanet(Planet.Earth)); // "Our home planet"
console.log(describePlanet(Planet.Mars)); // "The red planet"

// Reverse mapping (only for numeric enums)
enum Language {
    JavaScript,
    TypeScript,
    Python,
    Java
}

console.log(Language.TypeScript); // 1
console.log(Language[1]); // "TypeScript"

// Enum with functions
enum LogLevel {
    Debug = "DEBUG",
    Info = "INFO",
    Warning = "WARNING",
    Error = "ERROR"
}

class Logger {
    static log(level: LogLevel, message: string): void {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${level}: ${message}`);
    }
}

Logger.log(LogLevel.Info, "Application started");
Logger.log(LogLevel.Warning, "This is a warning");
Logger.log(LogLevel.Error, "An error occurred");

// Using enums with interfaces
interface User {
    id: number;
    name: string;
    role: UserRole;
    status: UserStatus;
}

enum UserRole {
    Admin = "admin",
    Moderator = "moderator",
    User = "user",
    Guest = "guest"
}

enum UserStatus {
    Active = "active",
    Inactive = "inactive",
    Suspended = "suspended",
    Pending = "pending"
}

const users: User[] = [
    { id: 1, name: "Alice", role: UserRole.Admin, status: UserStatus.Active },
    { id: 2, name: "Bob", role: UserRole.User, status: UserStatus.Active },
    { id: 3, name: "Charlie", role: UserRole.Guest, status: UserStatus.Pending }
];

function filterUsersByRole(users: User[], role: UserRole): User[] {
    return users.filter(user => user.role === role);
}

function getUsersByStatus(users: User[], status: UserStatus): User[] {
    return users.filter(user => user.status === status);
}

console.log("Admin users:", filterUsersByRole(users, UserRole.Admin));
console.log("Active users:", getUsersByStatus(users, UserStatus.Active));

// Enum utility functions
function getAllEnumValues<T extends Record<string, string | number>>(enumObject: T): Array<T[keyof T]> {
    return Object.values(enumObject);
}

function getAllEnumKeys<T extends Record<string, string | number>>(enumObject: T): Array<keyof T> {
    return Object.keys(enumObject) as Array<keyof T>;
}

console.log("All colors:", getAllEnumValues(Color));
console.log("All color keys:", getAllEnumKeys(Color));

// Enum guards/validators
function isValidColor(value: string): value is Color {
    return Object.values(Color).includes(value as Color);
}

function isValidHttpStatus(value: number): value is HttpStatus {
    return Object.values(HttpStatus).includes(value as HttpStatus);
}

console.log(isValidColor("red")); // true
console.log(isValidColor("purple")); // false
console.log(isValidHttpStatus(200)); // true
console.log(isValidHttpStatus(999)); // false

// Ambient enums (declare enum) - used for existing JavaScript enums
declare enum ExternalEnum {
    A = 1,
    B,
    C = 2
}

// Using enums in generic constraints
function processEnumValue<T extends string | number>(enumObject: { [key: string]: T }, key: string): T | undefined {
    return enumObject[key];
}

const directionValue = processEnumValue(Direction, "Up");
const colorValue = processEnumValue(Color, "Red");

console.log(directionValue); // 0
console.log(colorValue); // "red"

// Enum iteration
function iterateEnum<T extends Record<string, string | number>>(enumObject: T): void {
    for (const key in enumObject) {
        if (isNaN(Number(key))) { // Skip numeric keys in numeric enums
            console.log(`${key}: ${enumObject[key]}`);
        }
    }
}

console.log("Iterating over Color enum:");
iterateEnum(Color);

console.log("Iterating over HttpStatus enum:");
iterateEnum(HttpStatus);

// Bitwise operations with enums
enum Permission {
    None = 0,
    Read = 1 << 0,    // 1
    Write = 1 << 1,   // 2
    Execute = 1 << 2, // 4
    Delete = 1 << 3   // 8
}

function hasPermission(userPermissions: Permission, requiredPermission: Permission): boolean {
    return (userPermissions & requiredPermission) === requiredPermission;
}

function addPermission(userPermissions: Permission, newPermission: Permission): Permission {
    return userPermissions | newPermission;
}

function removePermission(userPermissions: Permission, permissionToRemove: Permission): Permission {
    return userPermissions & ~permissionToRemove;
}

let userPermissions = Permission.Read | Permission.Write; // 3

console.log("Has read permission:", hasPermission(userPermissions, Permission.Read)); // true
console.log("Has execute permission:", hasPermission(userPermissions, Permission.Execute)); // false

userPermissions = addPermission(userPermissions, Permission.Execute);
console.log("After adding execute permission:", userPermissions); // 7

userPermissions = removePermission(userPermissions, Permission.Write);
console.log("After removing write permission:", userPermissions); // 5

console.log("Enums examples completed!");