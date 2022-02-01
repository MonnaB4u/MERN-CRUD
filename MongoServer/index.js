const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const { ObjectId } = require('mongodb');
require('dotenv').config()
const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_Password}@cluster0.doolq.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const app = express()
app.use(bodyParser.json());
app.use(cors())
const port = 5000


app.get('/', (req, res) => {
    res.send('Hello World!')
})

// console.log(process.env.DB_user + process.env.DB_Password+ process.env.DB_Name)


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("MongoCrud");
        const userCollection = database.collection("Database");
        console.log("Database Connected")
        // create a document to insert
        /// Add New User

        app.post('/addUser', async (req, res) => {
            const newUser = req.body
            const result = await userCollection.insertOne(newUser);
            console.log('New user found', req.body)
            console.log('New user added', result)
            res.json(result)
        })
        //////// Get User Collection

        app.get('/userCollection', async (req, res) => {
            const cursor = userCollection.find({});
            const user = await cursor.toArray();
            res.send(user);
        })


        ///// Delete One User
        app.delete('/userCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            console.log('delete user', result)
            res.json(result)
        })

        //////get Spacific user by ID

        app.get('/userCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            users = await userCollection.findOne(query);
            res.send(users)
        })

        ///Update user collection by id
        app.put('/userCollection/:id', async (req, res) => {
            const id = req.params.id;
            const UpdateUser = req.body
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: UpdateUser.name,
                    email: UpdateUser.email
                }
            };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.json(result)
        })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log("Local Host", port)
})
