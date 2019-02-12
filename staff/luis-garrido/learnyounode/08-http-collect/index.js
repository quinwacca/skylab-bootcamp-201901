// let bl = require('bl')
let http = require("http");

let string = "";

http.get(process.argv[2], response => {
  response.on("data", data => (string += data.toString()));
  response.on("end", data => {
    console.log(string.length);
    console.log(string);
  });
  // response.pipe(bl((err, data) => {
  //     console.log(data.toString())
  // }))
});
