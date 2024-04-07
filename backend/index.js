const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));

const port = 3333;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
