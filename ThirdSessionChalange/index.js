import express from "express";
import { body, validationResult } from "express-validator";

const app = express();
app.use(express.json());

const router = express.Router();

router.post(
  "/calculate",
  [
    body("x")
      .exists("Data not exist.")
      .notEmpty("This filed is empty.")
      .isInt("This not a number."),
    body("y")
      .exists("Data not exist.")
      .notEmpty("This filed is empty.")
      .isInt("This not a number."),
    body("operation")
      .exists("No operations provided.")
      .notEmpty("Empty filed")
      .isIn(["+", "-", "*", "/"]),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (errors) {
      //   res.status(400).send(errors);
      console.log("Error: " + errors);
      return res.json({ errors: errors.message });
    }

    const x = parseInt(req.body.x);
    const y = parseInt(req.body.y);
    const operation = req.body.operation;

    let result;
    switch (operation) {
      case "+":
        result = x + y;
        break;
      case "-":
        result = x - y;
        break;
      case "*":
        result = x * y;
        break;
      case "/":
        result = x / y;
        break;
    }
    res.send(result);
  }
);

app.listen(3003, () => {
  console.log("Server is listening on http://localhost");
});