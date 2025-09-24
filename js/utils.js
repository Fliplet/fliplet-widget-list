/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} The debounced function
 */
function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Iterates over elements of collection and invokes iteratee for each element.
 * @param {Array} collection - The collection to iterate over
 * @param {Function} iteratee - The function invoked per iteration
 * @returns {void}
 */
function forEach(collection, iteratee) {
  if (!Array.isArray(collection)) {
    return;
  }

  for (let i = 0; i < collection.length; i++) {
    iteratee(collection[i], i, collection);
  }
}

/**
 * Iterates over elements of collection, returning the first element predicate returns truthy for.
 * @param {Array} collection - The collection to inspect
 * @param {Function|Object} predicate - The function invoked per iteration or object to match
 * @returns {*} The matched element, else undefined
 */
function find(collection, predicate) {
  if (!Array.isArray(collection)) {
    return undefined;
  }

  const predicateFunc = typeof predicate === 'function'
    ? predicate
    : (item) => {
      for (const key in predicate) {
        if (item[key] !== predicate[key]) {
          return false;
        }
      }

      return true;
    };

  for (let i = 0; i < collection.length; i++) {
    if (predicateFunc(collection[i], i, collection)) {
      return collection[i];
    }
  }

  return undefined;
}

/**
 * Removes all elements from array that predicate returns truthy for.
 * @param {Array} array - The array to modify
 * @param {Function|Object} predicate - The function invoked per iteration or object to match
 * @returns {Array} The array of removed elements
 */
function remove(array, predicate) {
  if (!Array.isArray(array)) {
    return [];
  }

  const predicateFunc = typeof predicate === 'function'
    ? predicate
    : (item) => {
      for (const key in predicate) {
        if (item[key] !== predicate[key]) {
          return false;
        }
      }

      return true;
    };

  const removed = [];

  for (let i = array.length - 1; i >= 0; i--) {
    if (predicateFunc(array[i], i, array)) {
      removed.unshift(array.splice(i, 1)[0]);
    }
  }

  return removed;
}

/**
 * Creates an array of elements, sorted in ascending order by the results of running each element
 * in a collection through each iteratee.
 * @param {Array} collection - The collection to iterate over
 * @param {Function} iteratee - The function invoked per iteration
 * @returns {Array} The new sorted array
 */
function sortBy(collection, iteratee) {
  if (!Array.isArray(collection)) {
    return [];
  }

  return collection.slice().sort((a, b) => {
    const aVal = iteratee(a);
    const bVal = iteratee(b);

    if (aVal < bVal) return -1;
    if (aVal > bVal) return 1;

    return 0;
  });
}

window.FlipletListUtils = {
  debounce,
  forEach,
  find,
  remove,
  sortBy
};
