import {app, BrowserWindow, screen, ipcMain} from 'electron';
import * as path from 'path';
import * as url from 'url';

import LocalStorage from './lib/LocalStorage';

// Initialize remote module
require('@electron/remote/main').initialize();

let win: BrowserWindow = null;
const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

const store = new LocalStorage('data', {
  defaults: {
    windowBounds: {
      width: null,
      height: null
    },
    app: {
      repository: null,
      repositories: []
    }
  }
});

function createWindow(): BrowserWindow {

  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: store.get('windowBounds').width ?? size.width,
    height: store.get('windowBounds').height ?? size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,  // false if you want to run 2e2 test with Spectron
      enableRemoteModule: true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
    },
  });

  if (serve) {

    win.webContents.openDevTools();

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');

  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  win.on('resize', (event) => {
    store.set('windowBounds', {
      width: win.getSize()[0],
      height: win.getSize()[1],
    });
  });

  win.on('closed', () => {
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

ipcMain.handle('load:data', (event) => {
  return store.get('app');
});

ipcMain.on('save:app:repository', (event, repository) => {
  store.set('app', {
    ...store.get('app'), ...{
      repository: repository
    }
  });

  if (!store.get('app').repositories.filter(r => r.path === repository.path).length) {
    store.set('app', {
      ...store.get('app'), ...{repositories: [...store.get('app').repositories, repository]}
    });
  }

  event.reply('app:saved:repository', store.get('app').repository);
  event.reply('app:saved:repositories', store.get('app').repositories);
});

ipcMain.on('delete:app:repository', (event, repository) => {
  const repositories = store.get('app').repositories;

  store.set('app', {
    ...store.get('app'), ...{repositories: repositories.filter(r => r.path !== repository.path)}
  });

  event.reply('app:saved:repositories', store.get('app').repositories);
});
