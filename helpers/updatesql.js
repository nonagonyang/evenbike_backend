const { BadRequestError } = require("../expressError");

/**querySql is a string
 * This is what sql upate syntax looks like
 *`UPDATE trip 
 SET end_dock = $1, end_time = $2  
 WHERE id = $3
 RETURNING *, [value1, value2, value3]
 * 
 setCols makes the string after SET keyword: "end_dock = $1,end_time = $2"

 dataToUpdate is an object looks like:
 {end_dock: "BikePoints_180"}
 {end_time: "2004-10-19 20:23:54"}
 *
 values look like this ["BikePoints_180","2004-10-19 20:23:54]
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);

  if (keys.length === 0) throw new BadRequestError("No data");

  // {username: 'testuser1', weight: 100} => ['"username"=$1', '"weight"=$2']

  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(","),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
