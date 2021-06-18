import State from '../../models/State';
import * as types from '../../types';

export const createState = async (e, data) => {
  try {
    const state = new State(data);
    await state.save();

    e.sender.send(types.CREATE_STATE, `state was successfully created`);
  } catch (err) {
    e.sender.send(types.ERROR, `ERROR, state didn't create`);
  }
};

export const editState = async (e, { _id, data }) => {
  try {
    const state = await State.findById({ _id });

    state.setId = data.setId || state.setId;
    state.state = data.state || state.state;

    state.save();

    e.sender.send(types.EDIT_STATE, `${_id} state was successfully edited`);
  } catch (err) {
    e.sender.send(types.ERROR, `ERROR, state didn't edited`);
  }
};

export const deleteState = async (e, { _id }) => {
  try {
    const state = await State.findById({ _id });

    state.remove();
    e.sender.send(types.DELETE_STATE, `${_id} set was successfully deleted`);
  } catch (err) {
    e.sender.send(types.ERROR, `ERROR, set ${_id} didn't edited`);
  }
};
