const express = require("express");
const bodyParser = require("body-parser");
const expenseRouter = require("./routes/expenseRoute");
const cors = require("cors");

const sequelize = require("./util/database");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/expenses", expenseRouter);

sequelize
  .sync()
  .then(() => {
    const port = 3000;
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  })
  .catch((err) => console.log(err.message));
