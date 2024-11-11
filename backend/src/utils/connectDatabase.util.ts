import mongoose from "mongoose";
import "dotenv/config";
export default function connectDatabase() {
  mongoose
    .connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
    .then((res) => {
      console.log(
        "connected to database",
        res.connection.host,
        res.connection.port
      );
    })
    .catch((error) => {
      console.error(error);
    });
}
