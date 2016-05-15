'use strict'

const os = require('os');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid')
const async = require('async')
const dataURIBuffer = require('data-uri-to-buffer');
const EventEmitter = require('events').EventEmitter;
const listFiles = require('./list');
const ffmpeg = require('./ffmpeg');

module.exports = function(images){
    let events = new EventEmitter();
    let count = 0;
    let baseName = uuid.v4();
    let tmpDir = os.tmpDir();

    async.series([
        decodeImages,
        createVideo,
        encodeVideo/*,
        cleanup*/
    ], convertFinished);

    function decodeImages(done){
        async.eachSeries(images, decodeImage, done);
    }

    function decodeImage(image, done){
        let fileName = `${baseName}-${count++}.jpg`;
        let buffer = dataURIBuffer(image);
        let ws = fs.createWriteStream(path.join(tmpDir, fileName));

        ws.on('error', done).end(buffer, done)
    }

    function createVideo(done){
        ffmpeg({
            baseName: baseName,
            folder: tmpDir,
        }, done);
    }

    function encodeVideo(done){
        done();
    }

    function cleanup(done){
        events.emit('log', 'Cleaning Up');

        listFiles(tmpDir, baseName, function(err, files){
            if (err) return done(err);

            deleteFiles(files, done);
        });
    }

    function deleteFiles(files, done){
        async.each(files, deleteFile, done);
    }

    function deleteFile(file, done){
        events.emit('log', `Deleting ${file}`);

        fs.unlink(path.join(tmpDir, file), function(err){
            //ignore error
            //
            done();
        });
    }

    function convertFinished(err){
        setTimeout(function(){
            events.emit('video', 'this will be the encoded video');
        });
    }

    return events;
}