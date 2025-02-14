console.log("Welcome to Spotify");

// Initialize Variables
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let pause = document.getElementById('pause');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Let me Love You", filePath: "1.mp3", coverPath: "1.jpg"},
    {songName: "7 years", filePath: "2.mp3", coverPath: "2.jpg"},
    {songName: "Faded", filePath: "3.mp3", coverPath: "3.jpg"},
    {songName: "On the floor", filePath: "4.mp3", coverPath: "4.jpg"},
    {songName: "Die with a smile", filePath: "5.mp3", coverPath: "5.jpg"},
    {songName: "Da Da Da", filePath: "6.mp3", coverPath: "6.jpg"}
];

// Update song list with names and covers
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

// Play Button
masterPlay.addEventListener('click', () => {
    audioElement.play();
    masterPlay.style.display = 'none';
    pause.style.display = 'inline';
    gif.style.opacity = 1;
});

// Pause Button
pause.addEventListener('click', () => {
    audioElement.pause();
    masterPlay.style.display = 'inline';
    pause.style.display = 'none';
    gif.style.opacity = 0;
});

// Listen to Events
audioElement.addEventListener('timeupdate', ()=> {
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Handle Seekbar Change
myProgressBar.addEventListener('input', ()=> {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Make all play buttons to pause (helper function)
const makeAllPlays = ()=> {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}

// Song Item Play Click Event
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.style.display = 'none';
        pause.style.display = 'inline';
    });
});

// Next Button
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= songs.length - 1){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.style.display = 'none';
    pause.style.display = 'inline';
});

// Previous Button
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = songs.length - 1;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.style.display = 'none';
    pause.style.display = 'inline';
});
