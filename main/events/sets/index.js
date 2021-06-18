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

export const editSet = async (e, { _id, data }) => {
  try {
    const set = await Set.findById({ _id });

    console.log(data);

    set.name = data.name || set.name;
    set.description = data.description || set.description;
    set.rate = data.rate || set.rate;
    set.flashcards = data.flashcards || set.flashcards;

    set.save();
  } catch (err) {
    e.sender.send(types.ERROR, `ERROR, set ${data.name} didn't edited`);
  }
};
