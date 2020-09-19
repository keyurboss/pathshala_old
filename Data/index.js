const csv = require("csv-parser");
const fs = require("fs");
const results = [];
// const qr
fs.createReadStream("./Script Filterd Data - new.csv")
  .pipe(csv())
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", () => {
    console.log(results[73]);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });
