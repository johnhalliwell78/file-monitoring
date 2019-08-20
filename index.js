const ObserveClass = require('./modules/observe');

let Observe = new ObserveClass();

let targetFolder = '../java/storage/logs';

Observe.on("new-file-has-been-added",(logData)=>{
    console.log(logData.message);
});

Observe.watchFolder(targetFolder);