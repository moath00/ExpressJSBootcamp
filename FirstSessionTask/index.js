import Task from './task.js';

import fs from 'fs';
import http from 'http';


// Data from local json file
const readJson = () => {
  try {
    const rowDataJson = fs.readFileSync('data.json', 'utf-8');
    const dataFromJson = JSON.parse(rowDataJson);
    return dataFromJson;
  } catch (err) {
    console.log("Error happened while reading");
    console.log(err.message);
    return {}; // Return an empty array if an error occurs
  }
};

const dataFromJson = readJson();
console.log("Data from JSON are:\n" + JSON.stringify(dataFromJson, null, 2));

const port = '8080';
const server = http.createServer((req, res) => {
    res.write(JSON.stringify(dataFromJson, null, 2), (err) => {
      if (err) {
        console.log(err.message);
        alert(err.message);
      }
    });
    res.end();
}).listen(port);