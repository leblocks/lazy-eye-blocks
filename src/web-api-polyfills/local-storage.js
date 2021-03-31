export const saveItem = (key, item) => {
    window.localStorage.setItem(key, item);
};

export const loadItem = (key) => window.localStorage.getItem(key);
