import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

const onPlay = function (data) {
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(data.seconds)
  );
};

let throttled = throttle(onPlay, 1000);
//player.on('timeupdate', throttle(onPlay, 1000));

player.on('timeupdate', throttled);

const getTime = localStorage.getItem('videoplayer-current-time');

if (!getTime) {
  return;
}

player
  .setCurrentTime(getTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
