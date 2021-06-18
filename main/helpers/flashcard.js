import { v4 as uuidv4 } from 'uuid';

class Flashcard {
  id = uuidv4();

  constructor({
    name,
    translation,
    description = '',
    examples = [],
    synonyms = [],
    antonyms = [],
    changeByTimes = [],
  }) {
    this.name = name;
    this.translation = translation;
    this.description = description;
    this.examples = examples;
    this.synonyms = synonyms;
    this.antonyms = antonyms;
    this.changeByTimes = changeByTimes;
  }
}

export default Flashcard;
