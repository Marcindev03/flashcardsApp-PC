import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import * as types from './types';
import { createWindow, DBconnect } from './helpers';
import {
  createFlashcard,
  editFlashcard,
  deleteFlashcard,
} from './events/flashcards';
import { createSet } from './events/sets';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

  await DBconnect();
})();

app.on('window-all-closed', () => {
  app.quit();
});

// Flashcard events
ipcMain.on(types.CREATE_FLASHCARD, (e, data) => createFlashcard(e, data));

ipcMain.on(types.EDIT_FLASHCARD, (e, data) => editFlashcard(e, data));

ipcMain.on(types.DELETE_FLASHCARD, (e, data) => deleteFlashcard(e, data));

// Sets events
ipcMain.on(types.CREATE_SET, (e, data) => createSet(e, data));

// const types = {
//   flashcardsUser: 'flashcards',
//   flashcardsDB: 'flashcardsDB',
//   getFlashcard: 'getFlashcard',
//   getAllFlashcards: 'getAllFlashcards',
//   returnFlashcard: 'returnFlashcard',
//   createFlashcard: 'createFlashcard',
//   editFlashcard: 'editFlashcard',
//   deleteFlashcard: 'deleteFlashcard',
//   clearStore: 'clearStore',
// };

// const DBtypes = {
//   flashcards: 'flashcards',
//   flashcardsSets: 'flashcardsSets',
//   flashcardsSetsState: 'flashcardsSetsState',
//   user: 'user',
// };

// (async () => {
// if (!isProd) {
//   for (let i = 0; i < 1490; i++) {
//     const uuid = uuidv4();
//     const name = Math.random().toString(36).substring(7);
//     const translation = Math.random().toString(36).substring(7);
//     await Flashcard.create({
//       id: uuid,
//       name: name,
//       translation: translation,
//     });
//   }
// }
// })();

// (async () => {
//   if (!isProd) {
//     if (!store.get(DBtypes.flashcards)) {
//       const flashcards = [];

//       const {
//         flashcardsFunctions: { createFlashcard },
//       } = await import('./helpers');

//       for (let i = 0; i < 1500; i++) {
//         const name = Math.random().toString(36).substring(7);
//         const translation = Math.random().toString(36).substring(7);

//         flashcards.push(await createFlashcard(name, translation));
//       }

//       store.set(DBtypes.flashcards, flashcards);
//     }

//     if (!store.get(DBtypes.flashcardsSets)) {
//       const { FlashcardSet } = await import('./helpers');

//       const flashcardsIds = store.get(DBtypes.flashcards).map((e) => e.id);

//       const firstSet = new FlashcardSet({
//         flashcards: flashcardsIds.slice(0, 499),
//       });
//       const secondSet = new FlashcardSet({
//         flashcards: flashcardsIds.slice(500, 999),
//       });
//       const thirdSet = new FlashcardSet({
//         flashcards: flashcardsIds.slice(1000, 1499),
//       });
//       const flashcardsSets = [firstSet, secondSet, thirdSet];

//       store.set(DBtypes.flashcardsSets, flashcardsSets);
//     }

//     if (!store.get(DBtypes.flashcardsSetsState)) {
//       const { FlashcardsSetState } = await import('./helpers');

//       const flashcardsSetsIds = store
//         .get(DBtypes.flashcardsSets)
//         .map((e) => e.id);
//       const flashcardsSetsStates = [];

//       flashcardsSetsIds.forEach((e) => {
//         flashcardsSetsStates.push(
//           new FlashcardsSetState({ flashcardSetId: e })
//         );
//       });

//       store.set(DBtypes.flashcardsSetsState, flashcardsSetsStates);
//     }
//   }
// })();

// Flashcard events
// const flashcardTypes = {
//   addFlashcard: 'addFlashcard',
//   editFlashcard: 'editFlashcard',
//   deleteFlashcard: 'deleteFlashcard',
// };

// ipcMain.on(flashcardTypes.addFlashcard, (e, args) => {
//   const { id } = args;

//   const flashcards = store.get(DBtypes.flashcards);
// });

// ipcMain.on(types.getFlashcard, (e, args) => {
//   e.sender.send(types.getFlashcard, 'Your Flashcard');
// });

// ipcMain.on(types.getAllFlashcards, (e, args) => {
//   const flashcards = store.get(types.flashcards);
//   e.sender.send(types.getAllFlashcards, flashcards);
// });

// ipcMain.on(types.returnFlashcard, (e, args) => {
//   e.sender.send(types.returnFlashcard, 'Ty for ur flashcard');
// });

// ipcMain.on(types.createFlashcard, (e, args) => {
//   e.sender.send(
//     types.returnFlashcard,
//     'You have successfully created flashcard'
//   );
// });

// ipcMain.on(types.editFlashcard, (e, args) => {
//   e.sender.send(
//     types.returnFlashcard,
//     'You have successfully edited flashcard'
//   );
// });

// ipcMain.on(types.deleteFlashcard, (e, args) => {
//   e.sender.send(
//     types.returnFlashcard,
//     'You have successfully deleted flashcard'
//   );
// });

// ipcMain.on(types.clearStore, () => {
//   store.clear();
// });
