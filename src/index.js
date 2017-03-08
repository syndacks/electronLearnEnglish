var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var app = electron.app
var ipc = electron.ipcMain;

app.on('ready', function(){
  var appWindow, infoWindow;
  appWindow = new BrowserWindow({
    show: false
  }); //appWindow

  appWindow.loadURL('file://'+__dirname + '/index.html')

  infoWindow = new BrowserWindow({
    width: 400,
    height: 300,
    transparent: false,
    show: false,
    frame: true
  }); //infoWindow

  appWindow.once('ready-to-show', function() {
    appWindow.show();
  }); //ready-to-show

  infoWindow.loadURL('file://'+__dirname + '/info.html')

  ipc.on('openInfoWindow', function(event, arg){
    event.returnValue='';
    infoWindow.show();
  }); //openInfoWindow

  ipc.on('closeInfoWindow', function(event, arg){
    event.returnValue='';
    infoWindow.hide();
  }); //closeInfoWindow
}); //app is ready
