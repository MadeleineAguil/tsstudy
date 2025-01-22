// Modules in TypeScript
// Modules help organize code into separate files and manage dependencies

// ====== EXPORTING ======

// Named exports - export individual items
export const PI = 3.14159;
export const E = 2.71828;

export function add(a: number, b: number): number {
    return a + b;
}

export function multiply(a: number, b: number): number {
    return a * b;
}

// Export class
export class Calculator {
    add(a: number, b: number): number {
        return a + b;
    }
    
    subtract(a: number, b: number): number {
        return a - b;
    }
}

// Export interface
export interface User {
    id: number;
    name: string;
    email: string;
}

// Export type alias
export type Status = "active" | "inactive" | "pending";

// Export enum
export enum Color {
    Red = "red",
    Green = "green",
    Blue = "blue"
}

// ====== DEFAULT EXPORTS ======

// Default export - one per module
class MathUtils {
    static square(x: number): number {
        return x * x;
    }
    
    static cube(x: number): number {
        return x * x * x;
    }
    
    static factorial(n: number): number {
        if (n <= 1) return 1;
        return n * MathUtils.factorial(n - 1);
    }
}

export default MathUtils;

// ====== RE-EXPORTS ======

// You can re-export from other modules
// export { someFunction } from './other-module';
// export * from './another-module';
// export { default as AliasedDefault } from './third-module';

// ====== MODULE EXAMPLES ======

// Namespace-like organization using modules
export namespace StringUtils {
    export function capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    export function reverse(str: string): string {
        return str.split('').reverse().join('');
    }
    
    export function truncate(str: string, length: number): string {
        return str.length > length ? str.substring(0, length) + '...' : str;
    }
}

export namespace ArrayUtils {
    export function chunk<T>(array: T[], size: number): T[][] {
        const chunks: T[][] = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }
    
    export function unique<T>(array: T[]): T[] {
        return [...new Set(array)];
    }
    
    export function shuffle<T>(array: T[]): T[] {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

// ====== IMPORTING EXAMPLES (commented because this is a single file) ======

/*
// Named imports
import { add, multiply, Calculator, User, Status } from './math-module';
import { PI, E } from './constants-module';

// Default import
import MathUtils from './math-utils-module';

// Import with alias
import { add as addNumbers, Calculator as Calc } from './math-module';

// Import everything as namespace
import * as MathModule from './math-module';

// Import for side effects only
import './polyfills';

// Dynamic imports (ES2020)
const mathModule = await import('./math-module');
const { add, multiply } = await import('./math-module');

// Conditional dynamic import
if (condition) {
    const { specialFunction } = await import('./special-module');
    specialFunction();
}
*/

// ====== MODULE TYPES ======

// Declare module for existing JavaScript libraries
declare module "external-library" {
    export function doSomething(param: string): number;
    export interface Config {
        apiKey: string;
        timeout: number;
    }
}

// Module augmentation - extending existing modules
declare module "./08-modules" {
    namespace StringUtils {
        function slugify(str: string): string;
    }
}

// ====== GLOBAL DECLARATIONS ======

// Declare global variables/types available everywhere
declare global {
    interface Window {
        myCustomProperty: string;
    }
    
    var globalUtility: {
        log: (message: string) => void;
    };
}

// ====== AMBIENT MODULES ======

// Declare external modules that don't have TypeScript definitions
declare module "*.json" {
    const value: any;
    export default value;
}

declare module "*.css" {
    const classes: { [key: string]: string };
    export default classes;
}

// ====== EXAMPLE USAGE IN THIS FILE ======

// Using the exported functions and classes
const calc = new Calculator();
console.log("Calculator add:", calc.add(5, 3));

console.log("Math constants:", { PI, E });
console.log("Add function:", add(10, 20));
console.log("Multiply function:", multiply(4, 5));

// Using default export
console.log("Square of 5:", MathUtils.square(5));
console.log("Factorial of 5:", MathUtils.factorial(5));

// Using namespace exports
console.log("Capitalize:", StringUtils.capitalize("hello world"));
console.log("Reverse:", StringUtils.reverse("typescript"));
console.log("Truncate:", StringUtils.truncate("This is a long string", 10));

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log("Chunked array:", ArrayUtils.chunk(numbers, 3));
console.log("Unique array:", ArrayUtils.unique([1, 2, 2, 3, 3, 3]));
console.log("Shuffled array:", ArrayUtils.shuffle([1, 2, 3, 4, 5]));

// Using types and interfaces
const user: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com"
};

const status: Status = "active";
const color: Color = Color.Blue;

console.log("User:", user);
console.log("Status:", status);
console.log("Color:", color);

// ====== ADVANCED MODULE PATTERNS ======

// Factory pattern with modules
export function createLogger(prefix: string) {
    return {
        log: (message: string) => console.log(`[${prefix}] ${message}`),
        error: (message: string) => console.error(`[${prefix}] ERROR: ${message}`),
        warn: (message: string) => console.warn(`[${prefix}] WARNING: ${message}`)
    };
}

// Singleton pattern with modules
class ConfigManager {
    private static instance: ConfigManager;
    private config: { [key: string]: any } = {};
    
    private constructor() {}
    
    static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }
    
    set(key: string, value: any): void {
        this.config[key] = value;
    }
    
    get(key: string): any {
        return this.config[key];
    }
}

export { ConfigManager };

// Using the patterns
const logger = createLogger("APP");
logger.log("Application started");

const config = ConfigManager.getInstance();
config.set("apiUrl", "https://api.example.com");
console.log("API URL:", config.get("apiUrl"));

// ====== MODULE RESOLUTION EXAMPLES ======

// TypeScript looks for modules in this order:
// 1. Relative imports: ./module, ../module
// 2. Non-relative imports: lodash, @types/node
// 3. baseUrl + paths configuration in tsconfig.json
// 4. node_modules directory

// Example paths in tsconfig.json:
/*
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"],
      "@/components/*": ["components/*"],
      "@/utils/*": ["utils/*"]
    }
  }
}
*/

// Then you can import like:
// import { Button } from '@/components/Button';
// import { formatDate } from '@/utils/date';

console.log("Modules examples completed!");

// ====== MODULE DOCUMENTATION ======

/**
 * This module demonstrates various TypeScript module features:
 * 
 * - Named exports and default exports
 * - Namespace organization
 * - Type exports (interfaces, types, enums)
 * - Module declarations and augmentations
 * - Global declarations
 * - Advanced patterns (factory, singleton)
 * 
 * Key concepts:
 * - Each file is a module if it has exports/imports
 * - Modules create their own scope
 * - TypeScript supports ES6 modules natively
 * - CommonJS and other module systems are also supported
 * - Module resolution follows specific rules
 * - Declaration files (.d.ts) provide type information for JavaScript libraries
 */