const express = require('express')
const app = express()
const cors = require('cors')
const {
    MongoClient
} = require('mongodb')
const {
    v4: uuidv4,
    validate: uuidValidate
} = require('uuid');
require("dotenv").config()
const client = new MongoClient(process.env.FINAL_URL)
app.use(express.urlencoded({
    extended: false
}));
app.use(cors())
app.use(express.json())

app.listen(3000);
console.log("app running at http://localhost:3000");

app.post("/register", async (req, res) => {
    if (!req.body.firstname || !req.body.lastname || !req.body.email ||
        !req.body.password || !req.body.confirmPassword) {
        res.status(401).send({
            status: false,
            message: "Gelieve alle velden invullen"
        })
        console.log(401);
        return;
    }
    try {
        await client.connect();
        let newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            userId: uuidv4()
        }
        const colli = client.db("kunstinhuis").collection("users")
        const query = {
            email: newUser.email
        };
        const user = await colli.findOne(query)
        if (user) {
            res.status(401).send({
                status: false,
                message: "Deze Gebruiker Bestaat Al"
            })
            console.log("Deze Gebruiker Bestaat Al error 401")
            return;
        }
        const insertedUser = await colli.insertOne(newUser)

        res.status(201).send({
            status: true,
            message: "Account succesvol aangemaakt",
            data: insertedUser
        })
        console.log(201)
    } catch (err) {
        res.status(500).send({
            status: "nop",
            message: "something went wrong",
        })
        console.log(500)
    } finally {
        await client.close();
    }
})
app.post("/login", async (req, res) => {

    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            status: false,
            message: "Gelieve alle velden invullen"
        })
        return;
    }
    try {
        await client.connect();
        let loginuser = {
            email: req.body.email,
            password: req.body.password
        }
        const colli = client.db("kunstinhuis").collection("users")
        const query = {
            email: loginuser.email
        };
        const user = await colli.findOne(query)

        if (user) {
            if (user.password == loginuser.password) {
                res.status(200).send({
                    status: true,
                    message: "Je bent ingelogd",
                    login: true,
                    data: {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        userId: user.userId
                    }
                })
            } else {
                res.status(400).send({
                    status: false,
                    message: "Wachtwoord is niet correct",
                })
            }
        } else {
            res.status(400).send({
                status: false,
                message: "Geen enkele gebruiker met dit e-mailadres heeft gevonden!"
            })
        }
    } catch (err) {
        res.status(500).send('something went wrong')
    } finally {
        await client.close();
    }
})
app.post("/saveUserInterest", async (req, res) => {
    if (!req.body.colorsInterest || !req.body.categoriesInterest) {
        res.status(401).send({
            status: "Bad Request",
            message: "some fields are missing"
        });
        return
    }


    try {
        await client.connect();
        const colliUserId = client.db("kunstinhuis").collection("users")
        const query = {
            userId: req.query.id
        };
        const userId = await colliUserId.findOne(query);

        const interest = {
            colorsInterest: req.body.colorsInterest,
            categoriesInterest: req.body.categoriesInterest,
            interestId: uuidv4(),
            userId: userId.userId

        };
        const colli = client.db('kunstinhuis').collection("userInterest");
        const insertInterest = await colli.insertOne(interest);

        res.status(201).send({
            status: "saved",
            message: "Interest has been saved",
            data: insertInterest
        });

    } catch (error) {
        res.status(500).send({
            error: "Something went wrong",
            value: error
        });

    } finally {
        await client.close();
    }
});
app.get("/getUserInterest", async (req, res) => {
    try {
        await client.connect();
        const colli = client.db("kunstinhuis").collection("userInterest")
        const query = {
            userId: req.query.id
        };
        const find = await colli.findOne(query);

        res.status(200).send(find);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: 'Something went wrong!',
            value: error
        });
    } finally {
        await client.close();
    }
})
app.post("/saveCollection", async (req, res) => {
    if (!req.body.collectionName || !req.body.listOfArtworks || !req.body.userFirstname || !req.body.userLastname) {
        res.status(401).send({
            status: false,
            message: "Gelieve alle velden invullen"
        })
        console.log(401);
        return;
    }
    try {
        await client.connect();
        const colliUserId = client.db("kunstinhuis").collection("users")
        const query = {
            userId: req.query.id
        };
        const userId = await colliUserId.findOne(query);

        let newCollection = {
            collectionName: req.body.collectionName,
            listOfArtworks: req.body.listOfArtworks,
            public: req.body.public,
            userFirstname: req.body.userFirstname,
            userLastname: req.body.userLastname,
            collectionId: uuidv4(),
            userId: userId.userId
        }
        const colli = client.db("kunstinhuis").collection("artworkCollections")
        const insertCollection = await colli.insertOne(newCollection);

        res.status(201).send({
            status: true,
            message: "Succesvol opgeslagen"
        });
    } catch (error) {
        res.status(500).send({
            error: "Something went wrong",
            value: error
        });
    } finally {
        await client.close();
    }
})
app.patch("/updateCollection", async (req, res) => {
    try {
        await client.connect();
        const colli = client.db("kunstinhuis").collection("artworkCollections")
        const database = client.db("kunstinhuis");
        const movies = database.collection("artworkCollections");
        const filter = {
            collectionId: req.query.id
        };

        let updateDoc = {
            $push: {
                listOfArtworks: req.body.listOfArtworks,
            }
        };
        const result = await movies.updateMany(filter, updateDoc);

        res.status(200).send({
            status: true,
            message: "Deze collectie is succesvol bijgewerkt"
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            error: 'Something went wrong!',
            value: error
        });
    } finally {
        await client.close();
    }
})
app.delete("/deleteCollection", async (req, res) => {
    try {
        await client.connect();
        const colli = client.db("kunstinhuis").collection("artworkCollections")
        const query = {
            collectionId: req.query.id
        };
        const deleteCollection = await colli.deleteOne(query);
        res.status(200).send({
            status: true,
            message: "De collectie is succesvol verwijderd"
        });
    } catch (error) {
        res.status(500).send({
            error: 'Something went wrong!',
            value: error
        });
    } finally {
        await client.close();
    }
})
app.get("/getAllCollections", async (req, res) => {
    try {
        await client.connect();
        const colli = client.db("kunstinhuis").collection("artworkCollections")

        const find = await colli.find({}).toArray();

        res.status(200).send(find);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: 'Something went wrong!',
            value: error
        });
    } finally {
        await client.close();
    }
})
app.get("/getUserName", async (req, res) => {
    try {
        await client.connect();
        const colli = client.db("kunstinhuis").collection("users")
        const query = { userId: req.query.id };
        const find = await colli.find({}).toArray;
        res.status(200).send({
            status: true,
            data: {
                firstname: find.firstname,
                lastname: find.lastname,
            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: 'Something went wrong!',
            value: error
        });
    } finally {
        await client.close();
    }
})
app.get("/getCollectionByID", async (req, res) => {
    try {
        await client.connect();
        const colli = client.db("kunstinhuis").collection("artworkCollections")
        const query = { collectionId: req.query.id };
        const find = await colli.findOne(query);
        res.status(200).send({
            status: true,
            data: find,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: 'Something went wrong!',
            value: error
        });
    } finally {
        await client.close();
    }
})
app.get("/getCollectionsByUserID", async (req, res) => {
    try {
        await client.connect();
        const colli = client.db("kunstinhuis").collection("artworkCollections")
        const query = { userId: req.query.id };
        const find = await colli.find(query).toArray();
        res.status(200).send({
            status: true,
            data: find
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: 'Something went wrong!',
            value: error
        });
    } finally {
        await client.close();
    }
})
app.post("/deleteArtwork", async (req, res) => {
    try {
        await client.connect();
        const colli = client.db("kunstinhuis").collection("artworkCollections")
        const database = client.db("kunstinhuis");
        const coll = database.collection("artworkCollections");
        const filter = {
            collectionId: req.query.id
        };

        let updateDoc = {
            $pull: {
                listOfArtworks: req.body.listOfArtworks,
            }
        };
        const result = await coll.updateMany(filter, updateDoc);

        res.status(200).send({
            status: true,
            message: "Deze kunstwerk is succesvol bijgewerkt"
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            error: 'Something went wrong!',
            value: error
        });
        console.log(error)
    } finally {
        await client.close();
    }
})