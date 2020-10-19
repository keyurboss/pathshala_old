const csv = require("csv-parser");
const fs = require("fs");
const results = [];
let currentIndex = 0;
let fileindex = 0;
// const qr
fs.createReadStream("./Script Filterd Data - new.csv")
  .pipe(csv())
  .on("data", (data) => {
    if (!results[fileindex]) {
      results[fileindex] = [];
    }
    results[fileindex].push(data);
    currentIndex++;
    if (currentIndex === 40) {
      currentIndex = 0;
      fileindex++;
    }
  })
  .on("end", () => {
    // console.log(results[0].length);
    results.forEach((element,i) => {
      fs.writeFileSync(`./Script Filterd Data - new -${i+1} .csv`,f(element))
    });
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });
const f = (items) => {
  const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
  const header = Object.keys(items[0]);
  let csv = items.map((row) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(",")
  );
  csv.unshift(header.join(","));
  csv = csv.join("\r\n");
  return csv;
};
