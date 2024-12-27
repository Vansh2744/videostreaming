import app from "./app.js";
import connectDB from "./db/database.js";

const port = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Unable to connect database", error.message);
  });
