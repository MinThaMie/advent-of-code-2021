// BEGIN-SNIPPET array-helpers
export function windowed(array, size) {
  return Array.from({ length: array.length - size + 1 }, (_, i) =>
    array.slice(i, i + size)
  );
}
// END-SNIPPET
