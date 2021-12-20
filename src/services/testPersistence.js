const LOCAL_STORAGE_KEY = "tests";

function storeTestsArray(tests) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tests));
}

function getTestsArray() {
  const tests = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (tests) return JSON.parse(tests);
  return null;
}

export { storeTestsArray, getTestsArray };
