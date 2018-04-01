const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', function(req, res){
  res.json({
    cascadeCompatible: true,
    id: 'cjfdxdmnjk82q0b9171i4gq9c',
  });
});

app.listen(3000);
