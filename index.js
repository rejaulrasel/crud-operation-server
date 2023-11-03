const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(cors())
app.use(express.json())


// mongo user and pass
// user: rejaulrasel05
// pass: P2QX7JEO7Ylr0Zy9


// mongo db code here


const { MongoClient, ServerApiVersion } = require('mongodb');
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