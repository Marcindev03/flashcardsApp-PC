import Set from '../../models/Set';
import * as types from '../../types';

export const createSet = async (e, data) => {
  try {
    const set = new Set(data);
    await set.save();

    e.sender.send(
      types.CREATE_SET,
      `${data.name} set was successfully created`
    );
  } catch (err) {
    e.sender.send(types.ERROR, `ERROR, set ${data.name} didn't created`);
  }
};
