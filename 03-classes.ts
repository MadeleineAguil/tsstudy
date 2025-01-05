// Classes in TypeScript
// Classes provide a way to create objects with shared properties and methods

// Basic class definition
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

// Access modifiers: public, private, protected
class BankAccount {
    public accountHolder: string; // Public - accessible everywhere
    private balance: number; // Private - only accessible within this class
    protected accountNumber: string; // Protected - accessible in this class and subclasses
    
    constructor(accountHolder: string, initialBalance: number) {
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
        this.accountNumber = this.generateAccountNumber();
    }
    
    // Public method
    public getBalance(): number {
        return this.balance;
    }
    
    // Public method
    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited $${amount}. New balance: $${this.balance}`);
        }
    }
    
    // Public method
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
console.log(`Current balance: $${account.getBalance()}`);
// console.log(account.balance); // Error: Property 'balance' is private

// Inheritance - extending classes
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

dog.makeSound();
dog.fetch();
cat.makeSound();
cat.purr();

// Abstract classes - cannot be instantiated directly
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

console.log(rectangle.describe());
console.log(circle.describe());

// Static properties and methods
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

// Getters and Setters
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

// Parameter properties - shorthand for constructor parameters
class Product {
    constructor(
        public id: number,
        public name: string,
        private price: number,
        protected category: string
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
console.log(product.getInfo());