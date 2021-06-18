import { Schema, model } from 'mongoose';

const stateSchema = new Schema({
  setId: {
    type: String,
    required: true,
  },
  state: {
    type: [[String], [String], [String], [String], [String]],
    required: true,
  },
});

const State = model('State', stateSchema);

export default State;
