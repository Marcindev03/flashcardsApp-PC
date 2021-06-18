import { useEffect, useState } from 'react';
import Link from 'next/link';
import electron from 'electron';
import * as types from '../../types';

const ipcRenderer = electron.ipcRenderer || false;

const Delete = () => {
  const [message, setMessage] = useState('There is no message from ipcMain');

  const [idOfSet, setIdOfSet] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    ipcRenderer.on(types.DELETE_SET, (e, data) => setMessage(data));

    return () => {
      ipcRenderer.removeAllListeners(types.DELETE_SET);
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Delete set</h1>
        <p>Message: {message}</p>
        <div>
          <label htmlFor="name">ID of set</label>
          <input
            type="text"
            value={idOfSet}
            onChange={(e) => setIdOfSet(e.target.value)}
          />
        </div>

        <button
          type="submit"
          onClick={() => {
            ipcRenderer.send(types.DELETE_SET, {
              _id: idOfSet,
            });
          }}
        >
          DELETE
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

export default Delete;
