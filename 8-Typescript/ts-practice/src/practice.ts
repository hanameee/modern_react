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
