// ById transforms an array where the array contains object
// with an id field and a delete field into an object of the
// form { [id]: object } of objects with the deleted field set to false
export const ById = (data) => data.filter(p => !p.deleted).reduce((p, c) => {
  p[c.id] = c;
  return p;
}, {});
