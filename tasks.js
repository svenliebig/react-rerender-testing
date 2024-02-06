console.log("Main 1");

setTimeout(() => console.log("Task 1"), 0);
queueMicrotask(() => {
  console.log("MicroTask 1")
  queueMicrotask(() => console.log("MicroTask 6"));
});

console.log("Main 2");

queueMicrotask(() => {
  const start = performance.now();

  while (performance.now() - start < 1000) {
    // simulate a heavy task
  }
    
  console.log("MicroTask 2")
});


queueMicrotask(() => {
  const start = performance.now();
  setTimeout(() => console.log("Task 2"), 0);

  while (performance.now() - start < 1000) {
    // simulate a heavy task
  }
    
  console.log("MicroTask 3")
  log();
});

console.log("Main 3");

for (let i = 3; i < 5; i++) {
  console.log("Main " + i);
}

(function() {
  console.log("Main 5");
  queueMicrotask(() => console.log("MicroTask 5"));
}())

function main() {
  console.log("Main 6");
}

main()

function log() {
  console.log("Microtask 4");
}
