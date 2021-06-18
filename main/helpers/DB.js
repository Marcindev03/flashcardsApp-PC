import { connect } from 'mongoose';

const URI = 'mongodb://localhost:27017/flashcardsApp';

const DBconnect = async () => {
  try {
    await connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err);
  }
};

export default DBconnect;
