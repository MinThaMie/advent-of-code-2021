// BEGIN-SNIPPET array-helpers
export function windowed(array, size) {
  return Array.from({ length: array.length - size + 1 }, (_, i) =>
    array.slice(i, i + size)
  );
}
export function print(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[i].join(''));
  }
}
// END-SNIPPET
