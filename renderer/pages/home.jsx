import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import electron from 'electron';
import * as types from './types';

const ipcRenderer = electron.ipcRenderer || false;

// const types = {
//   getFlashcard: 'getFlashcard',
//   getAllFlashcards: 'getAllFlashcards',
//   returnFlashcard: 'returnFlashcard',
//   createFlashcard: 'createFlashcard',
//   editFlashcard: 'editFlashcard',
//   deleteFlashcard: 'deleteFlashcard',
//   clearStore: 'clearStore',
// };

function Home() {
  const [message, setMessage] = useState('There is no massage from ipcMain');
  const [name, setName] = useState('');
  const [translation, setTranslation] = useState('');
  const [_id, setID] = useState('');
  useEffect(() => {
    ipcRenderer.on(types.CREATE_FLASHCARD, (e, data) => setMessage(data));
    ipcRenderer.on(types.EDIT_FLASHCARD, (e, data) => setMessage(data));
    ipcRenderer.on(types.DELETE_FLASHCARD, (e, data) => setMessage(data));
    ipcRenderer.on(types.ERROR, (e, data) => setMessage(data));
    // ipcRenderer.on(types.getFlashcard, (e, data) => setMessage(data));
    // ipcRenderer.on(types.getAllFlashcards, (e, data) => console.log(data));
    // ipcRenderer.on(types.returnFlashcard, (e, data) => setMessage(data));
    // ipcRenderer.on(types.createFlashcard, (e, data) => setMessage(data));
    // ipcRenderer.on(types.editFlashcard, (e, data) => setMessage(data));
    // ipcRenderer.on(types.deleteFlashcard, (e, data) => setMessage(data));

    return () => {
      ipcRenderer.removeAllListeners(types.CREATE_FLASHCARD);
      ipcRenderer.removeAllListeners(types.EDIT_FLASHCARD);
      ipcRenderer.removeAllListeners(types.DELETE_FLASHCARD);
      ipcRenderer.removeAllListeners(types.ERROR);
      // ipcRenderer.removeAllListeners(types.getFlashcard);
      // ipcRenderer.removeAllListeners(types.getAllFlashcards);
      // ipcRenderer.removeAllListeners(types.returnFlashcard);
      // ipcRenderer.removeAllListeners(types.createFlashcard);
      // ipcRenderer.removeAllListeners(types.editFlashcard);
      // ipcRenderer.removeAllListeners(types.deleteFlashcard);
    };
  }, []);

  const clearFields = () => {
    setID('');
    setName('');
    setTranslation('');
  };

  const createFlashcard = (e) => {
    ipcRenderer.send(types.CREATE_FLASHCARD, { name, translation });

    clearFields();
  };

  const editFlashcard = () => {
    ipcRenderer.send(types.EDIT_FLASHCARD, {
      _id,
      data: { name, translation },
    });

    clearFields();
  };

  const deleteFlashcard = () => {
    ipcRenderer.send(types.DELETE_FLASHCARD, {
      _id,
    });

    clearFields();
  };

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript)</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </p>
        <p>{message}</p>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="name">ID</label>
          <input
            type="text"
            onChange={(e) => setID(e.target.value)}
            value={_id}
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="name">Translation</label>
          <input
            type="text"
            onChange={(e) => setTranslation(e.target.value)}
            value={translation}
          />
        </div>
        <div>
          <button onClick={() => createFlashcard()}>Create Flashcard</button>
        </div>
        <div>
          <button onClick={() => editFlashcard()}>Edit Flashcard</button>
        </div>
        <div>
          <button onClick={() => deleteFlashcard()}>Delete Flashcard</button>
        </div>
      </form>

      {/* <div>
        <button onClick={() => ipcRenderer.send(types.getFlashcard)}>
          GetFlashcard
        </button>
      </div>
      <div>
        <button onClick={() => ipcRenderer.send(types.getAllFlashcards)}>
          Get All Flashcards
        </button>
      </div>
      <div>
        <button onClick={() => ipcRenderer.send(types.returnFlashcard)}>
          Return Flashcard
        </button>
      </div>
      <div>
        <button onClick={() => ipcRenderer.send(types.createFlashcard)}>
          Create Flashcard
        </button>
      </div>
      <div>
        <button onClick={() => ipcRenderer.send(types.editFlashcard)}>
          Edit Flashcard
        </button>
      </div>
      <div>
        <button onClick={() => ipcRenderer.send(types.deleteFlashcard)}>
          Delete Flashcard
        </button>
      </div>
      <div>
        <button onClick={() => ipcRenderer.send(types.clearStore)}>
          Clear Store
        </button>
      </div> */}
    </React.Fragment>
  );
}

export default Home;
