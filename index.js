const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const jwt = require('jsonwebtoken');
//const { config } = require('dotenv');
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xwpgf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const inventoriesCollection = client.db('computerWarehouse').collection('inventories');
        const orderCollection = client.db('computerWarehouse').collection('order');

        app.get('/inventories', async (req, res) => {
            const query = {};
            const cursor = inventoriesCollection.find(query);
            const inventories = await cursor.toArray();
            res.send(inventories);
        });

        app.get('/inventories/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const inventories = await inventoriesCollection.findOne(query);
            res.send(inventories);
        });

        // post 
        app.post('/inventories', async (req, res) => {
            const newInventories = req.body;
            const result = await inventoriesCollection.insertOne(newInventories);
            res.send(result);
        });

        // Delete 
        app.delete('/inventories/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await inventoriesCollection.deleteOne(query);
            res.send(result);
        });

        // order collection api 

        app.get('/order', async(req,res) =>{
            const email = req.query.email;
            const query ={email: email};
            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);

        })


        app.post('/order', async(req, res) =>{
            const order =req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        })

    }
    finally {
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running warehouse server');
});
app.get('/hero', (req, res) =>{
    res.send('Horo meets heroku')
})

app.listen(port, () => {
    console.log('Listening to port', port);
})
