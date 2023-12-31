const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 4000;

// middleware
app.use(cors())
app.use(express.json())


// mongo user and pass
// user: rejaulrasel05
// pass: P2QX7JEO7Ylr0Zy9


// mongo db code here



const uri = "mongodb+srv://rejaulrasel05:P2QX7JEO7Ylr0Zy9@cluster0.60rxy3y.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        console.log('uri=', uri)
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db('users-app')
        const usersCollection = database.collection("users")

        // get all user
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find();
            const result = await cursor.toArray();
            // console.log(result)
            res.send(result)
        })

        // get a user
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id : new ObjectId(id)}
            const result = await usersCollection.findOne(query);
            res.send(result)
        })

        app.get('/users/singleUser/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id)
            const query = { id : id}
            const result = await usersCollection.findOne(query)
            res.send(result)
        })


        // post all user
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user)
            res.send(result)
            console.log('post api hitted', user);
        })

        // delete a user
        app.delete('/delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id : new ObjectId(id)};
            const result = await usersCollection.deleteOne(query)
            res.send(result);
        })


        //update a user
        app.put('/updateProfile/:id', async (req, res) => {
            const id = req.params.id;
            const userData = req.body;
            const filter = { _id : new ObjectId(id)}
            const updatedData = {
                $set: {
                    name: userData.name,
                    address: userData.address
                }
            }
            const options = { upsert: true };
            const result = await usersCollection.updateOne(filter, updatedData, options)
            const user = await usersCollection.findOne(filter)
            res.send({result, user})
        })














        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");






    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send('This is simple crud server!!!');
})



app.listen(port, () => {
    console.log("Server is running at port", port);
})