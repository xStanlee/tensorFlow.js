//Webkit for moz/edge/opera

navigator.getUserMedia =   (navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia);

const video = document.querySelector('.js-video');
const canvas = document.querySelector('.js-canvas');
const result = document.querySelector('.js-result');

const displaySize = { width: video.width, height: video.height };

const emotions = { 
    'neutral': 'Neutral 😐',
    'surprised': 'Surprised 😮',
    'disgusted': 'Disgusted 👹',
    'afraid': 'Afraid 😱',
    'sad': 'Sad 😰',
    'angry': 'Angry 👺',
    'happy': 'Happy 😄'
}

function startVideo() {
    navigator.getUserMedia({ video: true },
        (stream) => {
            video.srcObject = stream;
        },
        (err) => console.error(err)
    );
}

startVideo();

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/model'),
    faceapi.nets.faceExpressionNet.loadFromUri('/model'),
]).then(startVideo)

video.addEventListener('play', detectFace);

async function detectFace() {
    const options = new faceapi.TinyFaceDetectorOptions();

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, options).withFaceExpression();

        if(detection[0]) {
            console.log(detection[0]);
        }

    }, 200);
}