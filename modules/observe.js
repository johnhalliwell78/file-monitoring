const chokidar = require('chokidar');
const EventEmitter = require('events').EventEmitter;
const fsExtra = require('fs-extra');

let debug = console.log.bind(console);

class Observe extends EventEmitter {
    constructor() {
        super();
    }

    watchFolder(targetFolder) {
        try {
            debug(`[${new Date().toLocaleString()}] Watching for folder changes on: ${targetFolder}`);

            // initialize watcher
            let watcher = chokidar.watch(targetFolder, {persistent: true});

            //listen when a file has been added
            watcher.on("add", async (filepath) => {
                //if the new filename is exactly error.log
                if (filepath.includes("error.log")) {
                    debug(`[${new Date().toLocaleString()}] ${filePath} has been added.`);

                    //Read content of new file
                    let fileContent = await fsExtra.readFile(filepath);

                    //emit an event when new file has been added
                    this.emit('new-file-has-been-added', {message: fileContent.toString()});

                    // remove file error.log
                    await fsExtra.unlink(filepath);
                    debug(`[${new Date().toLocaleString()}] ${filePath} has been removed.`);
                }
            });
        } catch (error) {
            debug(error.toString());
        }
    }
}

module.exports = Observe;