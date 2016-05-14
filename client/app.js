const Webrtc2Images = require('webrtc2images');

const rtc = new Webrtc2Images({
    width: 200,
    height: 200,
    frames: 10,
    type: 'image/jpeg',
    quality: 0.4,
    interval: 200
}); 

rtc.startVideo(function(err){

});

const record = document.querySelector('#record');

record.addEventListener('click', function(e){
    e.preventDefault();

    rtc.recordVideo(function(err, frames){
        console.log(frames);
    });

}, false);
