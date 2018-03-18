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

function generateNewVideo(options = {}) {
  const title = options.title || 'A new train video';
  const description = options.description ||
        'Oooo Cool train!  Lets look at the train now...!';
  const url = options.url || 'https://www.youtube.com/embed/Yn5Ie1FSDqk';

  let video = {};
  if (options.title !== null) {
    video.title = title;
  }
  if (options.description !== null) {
    video.description = description;
  }
  if (options.url !== null) {
    video.url = url;
  }

  return video;
}

module.exports = {
  connectDatabase,
  disconnectDatabase,
  fakeId,
  generateNewVideo
}
