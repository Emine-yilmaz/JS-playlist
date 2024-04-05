const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const pauseButton = document.getElementById("pause");
const playListButton = document.getElementById("playlist");
const closeButton = document.getElementById("close");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const playListSongs = document.getElementById("playlist-songs");
const currentProgress = document.getElementById("current-progress");

//sira
let index;

//dongu
let loop = true;

//sarki listesi

const songsList = [
  {
    name: "Aramam",
    link: "assets/aramam.mp3",
    artist: "Ibrahim Tatlises",
    image: "assets/ibrahim-tatlises.jpg",
  },
  {
    name: "Dinle",
    link: "assets/dinle.mp3",
    artist: "Mahsun Kirmizigul",
    image: "assets/mahsun.jpg",
  },
  {
    name: "Gelo Ew Ki Bu",
    link: "assets/gelo-ew-ki-bu.mp3",
    artist: "Aram Tigran",
    image: "assets/aram-tigran.jpg",
  },
  {
    name: "Gitme Kal",
    link: "assets/yara-bere-icindeyim.mp3",
    artist: "Hira-i Zerdust",
    image: "assets/hirai.jpg",
  },
  {
    name: "Ax Eman",
    link: "assets/ax-eman.mp3",
    artist: "Rewsan Celiker",
    image: "assets/rewsan-celiker.jpg",
  },
  {
    name: "Gozlerinin Yesilini Ozledim",
    link: "assets/gozlerinin-yesilini-ozledim.mp3",
    artist: "Tripkolik Seda",
    image: "assets/tripkolik-seda.jpg",
  },
];

//sarki atama

const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadeddata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };

  playAudio();

  playListContainer.classList.add("hide");
};

//oynatma listesini goster
playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});

//tekrar tiklanildiginda
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    audio.loop = true;
    console.log("tekrar kapatildi");
  } else {
    repeatButton.classList.add("active");
    audio.loop = false;
    console.log("tekrar acildi");
  }
});

//karistirici tiklanildiginda
shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    loop = false;
    console.log("karistirici kapali");
  } else {
    shuffleButton.classList.add("active");
    loop = true;
    console.log("karistirici acik");
  }
});

//ilerleme cubuguna tiklanildiginda
progressBar.addEventListener("click", (event) => {
  let coordStart = progressBar.getBoundingClientRect().left;
  console.log(coordStart);

  let coordEnd = event.clientX;
  console.log(coordEnd);

  console.log(progressBar.offsetWidth);
  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

  currentProgress.style.width = progress * 100 + "%";
  audio.currentTime = progress * audio.duration;

  playAudio();
});

//zaman tutucu
setInterval(() => {
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);

//sarkiyi oynat

const playAudio = () => {
  audio.play();
  playButton.classList.add("hide");
  pauseButton.classList.remove("hide");
};

//sarkiyi durdur

const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

//sonraki sarki
const nextSong = () => {
  if (loop) {
    //dongu aciksa
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
    setSong(index);
  } else {
    //karistirici aciksa
    let randIndex = Math.floor(Math.random() * songsList.length);
    setSong(randIndex);
  }
};

//onceki sarki
const previousSong = () => {
  pauseAudio();

  if (index > 0) {
    index = index - 1;
  } else {
    index = songsList.length - 1;
  }

  setSong(index);
};

//sarki bittiginde
audio.onended = () => {
  nextSong();
};

//zaman duzenlemesi
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

//sarki suresi degistikce
audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

//sarki listesini olustur
const initPlaylist = () => {
  for (const i in songsList) {
    playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container">
        <img src="${songsList[i].image}" />
        </div>
        <div class="playlist-song-details">
        <span id="playlist-song-name">
        ${songsList[i].name}
        </span>
        <span id="playlist-song-artist-album">
        ${songsList[i].artist}
        </span>
        </div>
        </li>`
  }
};

//oynata tiklanildiginda
playButton.addEventListener("click", playAudio);

//dur a tiklanildiginda
pauseButton.addEventListener("click", pauseAudio);

//sonrakine gec tiklanildiginda
nextButton.addEventListener("click", nextSong);

//onceki sarkiya gec tiklanildiginda
prevButton.addEventListener("click", previousSong);

window.onload = () => {
  index = 0;
  setSong(index);
  pauseAudio();
  initPlaylist()
};
