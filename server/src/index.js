import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is runnig");
});

app.listen(8080, () => {
    console.log("Server Started");
});