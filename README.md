
# Node-MongoDb

#Getting Started
 ```
install json

-->npm init
--> npm install --save --dev nodemon
--> npm install express mongodb
--> npm install --save cors body parser

or

--> npm install nodemon express mongodb cors body-parser

then go to package.json -> replace scripts

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  },
  ```
  # Basic Structure
```
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_Password}@cluster0.doolq.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const app = express()
app.use(bodyParser.json());
app.use(cors())
const port =process.env.PORT ||  5000


app.get('/', (req, res) => {
    res.send('Hello World!')
})

console.log(process.env.DB_user + process.env.DB_Password + process.env.DB_Name)


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("ReservationSystem");
        const CruisesCollection  = database.collection("Cruises");;


        // create a document to insert


        /// Add New User

        app.post('/addCruisesr', async (req, res) => {
            const newData = req.body
            const result = await projectCollection.insertOne(newData
            );
            console.log('New user found', req.body)
            console.log('New user added', result)
            res.json(result)
        })


        //////// Get All Project and Display

        app.get('/CruisesCollection', async (req, res) => {
            const cursor = CruisesCollection.find({});
            const user = await cursor.toArray();
            res.send(user);
        })


        ///// Delete One Project
        app.delete('/CruisesCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await CruisesCollection.deleteOne(query);
            console.log('delete user', result)
            res.json(result)
        })

        //////get Spacific user by ID

        app.get('/CruisesCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            users = await CruisesCollection.findOne(query);
            res.send(users)
        })

        

    } finally {
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log("Local Host", port)
})


```
# React Form
## npm install react-hook-form
```
const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {

        fetch('http://localhost:5000/addGuide', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(success => {
                if (success) {
                    alert("Uploaded successfully");
                }
            }
........
 <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <select {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input type="submit" />
    </form>
```




