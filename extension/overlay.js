const videoEl = document.getElementById('asl-video');
const spinnerEl = document.getElementById('loading-spinner');
let currentVideos = [];
let videoIndex = 0;
let isPlaying = false;

window.addEventListener("message", (event) => {
    if (event.data && event.data.action === "translate") {
        document.getElementById('original-text').innerText = event.data.text;
        document.getElementById('subtitles').innerText = "Translating and fetching videos...";
        spinnerEl.style.display = 'block';
        videoEl.style.display = 'none';
        
        fetch("http://localhost:8000/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: event.data.text })
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('subtitles').innerText = data.gloss;
            spinnerEl.style.display = 'none';
            videoEl.style.display = 'block';
            
            if (data.animations && data.animations.length > 0) {
                playVideoSequence(data.animations);
            } else {
                document.getElementById('subtitles').innerText = data.gloss + " (No videos found)";
            }
        })
        .catch(err => {
            spinnerEl.style.display = 'none';
            document.getElementById('subtitles').innerText = "Error translating (Server Off?)";
            console.error(err);
        });
    }
});

function playVideoSequence(videos) {
    currentVideos = videos;
    videoIndex = 0;
    isPlaying = true;
    playNextVideo();
}

function playNextVideo() {
    if (videoIndex < currentVideos.length) {
        // Change source and play
        videoEl.src = currentVideos[videoIndex];
        videoEl.play().catch(e => {
            console.error("Autoplay failed:", e);
            // Move to next word if a specific video is broken
            videoIndex++;
            playNextVideo();
        });
    } else {
        isPlaying = false;
    }
}

// When a video ends, automatically play the next word's video
videoEl.addEventListener('ended', () => {
    videoIndex++;
    playNextVideo();
});

document.getElementById('play-btn').addEventListener('click', () => {
    if (currentVideos.length > 0 && !isPlaying && videoIndex >= currentVideos.length) {
        videoIndex = 0;
        playNextVideo();
    } else if (isPlaying && videoEl.paused) {
        videoEl.play();
    }
});

document.getElementById('pause-btn').addEventListener('click', () => {
    if (isPlaying) videoEl.pause();
});

document.getElementById('close-btn').addEventListener('click', () => {
    window.parent.postMessage({ action: "closeOverlay" }, "*");
});
