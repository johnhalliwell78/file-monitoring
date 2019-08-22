const ObserveClass = require('./modules/observe');

let Observe = new ObserveClass();

let manage = (target, event) => {
    Observe.on(event, (logData) => {
        console.log(logData.message);
    });
    Observe.watchFolder(target);
};
let targetFolder = '../java/storage/logs';
let targetFile = "../java/storage/logs/java.log";

manage(targetFolder, 'new-file-has-been-added');
manage(targetFile, "file-has-been-updated");
