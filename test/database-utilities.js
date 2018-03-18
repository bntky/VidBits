const {mongoose, databaseUrl, options} = require('../database');

async function connectDatabase() {
  await mongoose.connect(databaseUrl, options);
  await mongoose.connection.db.dropDatabase();
}

async function disconnectDatabase() {
  await mongoose.disconnect();
}

const fakeId = (id) => {
  return mongoose.Types.ObjectId(id || 24601);
};

module.exports = {
  connectDatabase,
  disconnectDatabase,
  fakeId
}
