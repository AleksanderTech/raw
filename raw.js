globalThis.html = (strings, ...params) => {
  params = params.map((param) => {
    if (typeof param == "object") return btoa(JSON.stringify(param));
    return param;
  });

  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += i + 1 == strings.length ? strings[i] : strings[i] + params[i];
  }

  return result;
};

export function parseObjAttribute(value) {
    return JSON.parse(atob(value));
}

export function stringifyObjAttribute(value) {
    return btoa(JSON.stringify(value));
}
