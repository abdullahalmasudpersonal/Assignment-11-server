const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());





app.get('/', (req, res) =>{
    res.send('Running react server');
});

app.listen(port, () =>{
    console.log('Listening to port', port);
})
