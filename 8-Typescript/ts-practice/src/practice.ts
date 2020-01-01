let count = 0;
count += 1;
// count = "갑분문";

const message: string = "hello world";
const done: boolean = true;
const number: number[] = [1, 2, 3];
const messages: string[] = ["hello", "world"];
// messages.push(1);

let mightBeUndefined: string | undefined = undefined;
let nullableNumber: number | null = null;
let color: "red" | "orange" | "yellow" = "red";

function sum(x: number, y: number): number {
    // return null;
    return 3;
}

function sumArray(numbers: number[]): number {
    return numbers.reduce((acc, current) => acc + current, 0);
}

const total = sumArray([1, 2, 3, 4, 5]);
function returnNothing(): void {
    console.log("I am just saying hello world");
}

// Shape 라는 interface 선언
interface Shape {
    getArea(): number;
}

class Circle implements Shape {
    radius: number;
    constructor(radius: number) {
        this.radius = radius;
    }
    getArea() {
        return this.radius * this.radius * Math.PI;
    }
}

class Rectangle implements Shape {
    width: number;
    height: number;
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}

const shapes: Shape[] = [new Circle(5), new Rectangle(10, 5)];

shapes.forEach(shape => {
    console.log(shape.getArea());
});
