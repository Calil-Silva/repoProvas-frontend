const LOCAL_STORAGE_KEY = "testsCreation.params";

function storeTestCreationParams(params) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(params));
}

function getTestCreationParams() {
  const params = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (params) return JSON.parse(params);

  return null;
}

export { storeTestCreationParams, getTestCreationParams };
