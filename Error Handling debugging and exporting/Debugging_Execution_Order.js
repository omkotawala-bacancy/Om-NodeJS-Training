console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");

/*
    a) What will be the exact output order?

    Output: Start, End, Promise, Timeout

    b) Explain why this order occurs in Node.js.

    Answer: This is becuase of the event loop in node js. Firstly the synchronous code will work so Start and the End will be printed first and callback of the timers will be queued into the macrotask queue while the callbacks of the promises will be queued into th emicrotask and the microtask executes first so the promise will be printes and at the last Timeout is printed

    c) Which mechanism executes first: microtasks or callbacks?

    Answer : In Node.js (and JavaScript event loop), the Microtask Queue executes before the Callback Queue.
*/