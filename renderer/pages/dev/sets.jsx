import { useEffect, useState } from 'react';
import electron from 'electron';
import * as types from '../types';

const ipcRenderer = electron.ipcRenderer || false;

const Sets = () => {
  const [message, setMessage] = useState('There is no message from ipcMain');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [rate, setRate] = useState('');
  const [id, setId] = useState('');
  const [ids, setIds] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    ipcRenderer.on(types.CREATE_SET, (e, data) => setMessage(data));

    return () => {
      ipcRenderer.removeAllListeners(types.CREATE_SET);
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Create set</h1>
        <p>Message: {message}</p>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="desc">Desc</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Rate</label>
          <input
            type="text"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div>
          <h2>Flashcards</h2>
          <ul>
            {ids.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <h3>Add flashcard id</h3>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button
            onClick={() => {
              const IDS = ids;
              IDS.push(id);
              setIds(IDS);
              setId('');
            }}
          >
            ADD
          </button>
        </div>
        <button
          type="submit"
          onClick={() =>
            ipcRenderer.send(types.CREATE_SET, {
              name,
              description: desc,
              rate,
              flashcards: ids,
            })
          }
        >
          CREATE
        </button>
      </form>
    </div>
  );
};

export default Sets;
