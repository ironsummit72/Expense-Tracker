import crypto from "crypto";

const generateHash = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex"); // Generate a random salt
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512") // Hash the password using PBKDF2
    .toString("hex");

  return { salt, hash };
};

const verifyPassword = (
  password: string,
  storedHash: string,
  storedSalt: string
) => {
  const hash = crypto
    .pbkdf2Sync(password, storedSalt, 10000, 64, "sha512") // Hash the input password with stored salt
    .toString("hex");

  return hash === storedHash;
};
export { generateHash, verifyPassword };
