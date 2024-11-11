import mongoose, { Schema } from "mongoose";
import { UserModel } from "../Types/DbTypes/Database.types";
import { generateHash } from "../utils/hashGen.util";
const userSchema = new Schema<UserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
      unique: false,
    },
    lastname: {
      type: String,
      unique: false,
      required: true,
    },
    password: {
      type: String,
      unique: false,
      required: true,
    },
    transaction: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
   
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const { hash, salt } = generateHash(this.password);
    this.password = `${hash}.${salt}`;
    next();
  }
});
const userModel = mongoose.model("User", userSchema);
export default userModel;
