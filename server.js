var express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
var app = express();
const path = require("path");
const uri =
  "mongodb+srv://pritsavani06:Admin0011@cluster0.jeooiqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var port = process.env.port || 3000;
let collection;
app.use(express.static(path.join(__dirname, "public_html")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function postCat(cat, callback) {
  collection.insertOne(cat, callback);
}

function getAllCats(callback) {
  collection.find({}).toArray(callback);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function runDBConnection() {
  try {
   
    await client.connect();
    collection = client.db().collection("heart");
    console.log(collection);
  } catch (ex) {
    console.error(ex);
  }
}
app.get("/", (req, res) => {
  res.render("index.html");
});
app.get("/api/heart", (req, res) => {
  getAllCats((err, result) => {
    if (!err) {
      res.json({
        statusCode: 200,
        data: result,
        message: "get all blood bags successful",
      });
    }
  });
});

// app.post("/api/project", (req, res) => {
//   let cat = req.body;
//   postCat(cat, (err, result) => {
//     if (!err) {
//       res.json({ statusCode: 201, data: result, message: "success" });
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  runDBConnection();
});