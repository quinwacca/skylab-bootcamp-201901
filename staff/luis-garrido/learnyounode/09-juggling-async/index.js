let bl = require("bl");
let http = require("http");

const { argv: [, , ...urls] } = process

let url1 = process.argv[2];
let url2 = process.argv[3];
let url3 = process.argv[4];

http.get(url1, response => {
  response.pipe(
    bl((err, data) => {
      console.log(data.toString());
      http.get(url2, response => {
        response.pipe(
          bl((err, data) => {
            console.log(data.toString());
            http.get(url3, response => {
              response.pipe(
                bl((err, data) => {
                  console.log(data.toString());
                })
              );
            });
          })
        );
      });
    })
  );
});

// let bl = require("bl");
// let http = require("http");

// let url1 = process.argv[2];
// let url2 = process.argv[3];
// let url3 = process.argv[4];

// http.get(url1, response => {
//   response.pipe(
//     bl((err, data) => {
//       console.log(data.toString());
//       http.get(url2, response => {
//         response.pipe(
//           bl((err, data) => {
//             console.log(data.toString());
//             http.get(url3, response => {
//               response.pipe(
//                 bl((err, data) => {
//                   console.log(data.toString());
//                 })
//               );
//             });
//           })
//         );
//       });
//     })
//   );
// });
