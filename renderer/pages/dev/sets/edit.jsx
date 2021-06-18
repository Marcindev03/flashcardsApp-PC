import { useEffect, useState } from 'react';
import Link from 'next/link';
import electron from 'electron';
import * as types from '../../types';

const ipcRenderer = electron.ipcRenderer || false;

const Edit = () => {
  const [message, setMessage] = useState('There is no message from ipcMain');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [rate, setRate] = useState('');
  const [idOfSet, setIdOfSet] = useState('');
  const [id, setId] = useState('');
  const [ids, setIds] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    ipcRenderer.on(types.EDIT_SET, (e, data) => setMessage(data));

    return () => {
      ipcRenderer.removeAllListeners(types.EDIT_SET);
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Edit set</h1>
        <p>Message: {message}</p>
        <div>
          <label htmlFor="name">ID of set</label>
          <input
            type="text"
            value={idOfSet}
            onChange={(e) => setIdOfSet(e.target.value)}
          />
        </div>
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
          onClick={() => {
            ipcRenderer.send(types.EDIT_SET, {
              _id: idOfSet,
              data: {
                name,
                description: desc,
                rate,
                flashcards: ids,
              },
            });

            console.log(name, desc, rate, ids);
          }}
        >
          EDIT
        </button>
      </form>
      <nav>
        <ul>
          <li>
            <Link href="/dev/sets">
              <a>Go to /sets</a>
            </Link>
          </li>
          <li>
            <Link href="/dev/sets/edit">
              <a>Go to /sets/delete</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Edit;
