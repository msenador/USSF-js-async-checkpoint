const fetch = require("node-fetch");
const fs = require("fs");

const inputFileName = process.argv[2] ? process.argv[2] : "input.txt";
const outputFileName = process.argv[3] ? process.argv[3] : "output.txt";

fs.readFile(inputFileName, (err, data) => {
  data
    .toString()
    .split("\n")
    .map((str) => str.trim())
    .forEach((name) => {
      fetch(`http://pokeapi.co/api/v2/pokemon/${name}`)
        .then((res) => {
          return res.json();
        })
        .then((pokeData) => {
          return `${pokeData.name}: ${pokeData.types
            .map((type) => type.type.name)
            .join(",")}\n`;
        })
        .then((outputLine) => {
          fs.appendFile(outputFileName, outputLine, (err) => {
            if (err) throw new Error(err);
          });
        })
        .catch((err) => console.error(err));
    });
});
