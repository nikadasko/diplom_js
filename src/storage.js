const KEY = 'leaderboard';

function getStore() {
    const value = localStorage.getItem(KEY);
    if (value) {
        return JSON.parse(value);
    }
    return [];
}

function setStore(store) {
    localStorage.setItem(KEY, JSON.stringify(store));
}

export function addToList(item) {
    let list = getStore();
    list.push(item);
    list.sort((a, b) => {
        return a.time < b.time ? -1 : 1;
    });
    list = list.slice(0, 9);
    setStore(list);
    return list;
}

export function getList() {
    return getStore();
}

