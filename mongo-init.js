print("Started Adding the Users.");

db = db.getSiblingDB(process.env.MONGO_DB);

db.createUser({
  user: process.env.MONGO_USER,
  pwd: process.env.MONGO_PASSWORD,
  roles: [{ role: "readWrite", db: process.env.MONGO_DB }],
});

print("End Adding the User.");