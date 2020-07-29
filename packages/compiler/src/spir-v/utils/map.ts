export function enumMap(map) {
  Object.keys(map).forEach((key) => {
    const value = map[key];
    map[value] = key;
  });
  return map;
}
