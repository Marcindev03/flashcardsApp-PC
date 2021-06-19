import { useEffect, useState } from 'react';
import Link from 'next/link';
import electron from 'electron';
import * as types from '../../types';

const ipcRenderer = electron.ipcRenderer || false;

const State = () => {
  const [message, setMessage] = useState('There is no message from ipcMain');
  const [setId, setSetid] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    ipcRenderer.on(types.CREATE_STATE, (e, data) => setMessage(data));

    return () => {
      ipcRenderer.removeAllListeners(types.CREATE_STATE);
    };
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Create state</h1>
        <p>Message: {message}</p>
        <div>
          <label htmlFor="name">Set id</label>
          <input
            type="text"
            value={setId}
            onChange={(e) => setSetid(e.target.value)}
          />
        </div>
        <button
          type="submit"
          onClick={() => ipcRenderer.send(types.CREATE_STATE, { _id: setId })}
        >
          CREATE
        </button>
      </form>
      <nav>
        <ul>
          <li>
            <Link href="/dev/state/edit">
              <a>Go to /state/edit</a>
            </Link>
          </li>
          <li>
            <Link href="/dev/state/delete">
              <a>Go to /sets/delete</a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default State;
