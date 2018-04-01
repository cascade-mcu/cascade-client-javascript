const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const moment = require('moment');
const _ = require('lodash');

const app = express();
app.use(cors());

app.get('/', function(req, res){
  res.json({
    cascadeCompatible: true,
    id: 'cjfdxdmnjk82q0b9171i4gq9c',
  });
});

app.listen(3001);

const createLog = async (variables) => {
  const body = {
    query: `
      mutation($sensorId: ID!, $readingTime: DateTime!, $value: Float!) {
        createLog(
          data: {
            sensor: {
              connect: {
                id: $sensorId,
              }
            },
            readingTime: $readingTime,
            value: $value
          }
        ) {
          id
          readingTime
          value
        }
      }
    `,
    variables,
  };

  const response = await fetch('http://localhost:4000', {
    method: 'POST',
    body:    JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json());

  console.log(response);
  console.log("Log created!");
};

const sensorIds = {
  temperature: "cjfdxdmnjk82r0b91zbx87l4o",
  humidity: "cjfdxdmnjk82t0b91orh1g9dh",
};

setInterval(() => {
  createLog({
    sensorId: sensorIds.temperature,
    readingTime: moment().toISOString(),
    value: _.random(0, 200),
  });
}, 10000);

setInterval(() => {
  createLog({
    sensorId: sensorIds.humidity,
    readingTime: moment().toISOString(),
    value: _.random(0, 100),
  });
}, 12000);
