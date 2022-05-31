const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");

    //sounds
    const sounds = document.querySelectorAll(".sound-picker button");

    const timeDisplay = document.querySelector(".time-display");

    const timeselect = document.querySelectorAll(".timeselect button");

    //get the length of the outline
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength)

    //duration

    let duration = 10;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //pick sounds

    sounds.forEach(sound => {
        sound.addEventListener('click',function(){
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(song);
        })
    });



    //play sounds

    play.addEventListener('click', () => {
        checkPlaying(song);
    })

    //select sounds
    timeselect.forEach(option => {
        option.addEventListener('click', function() {
            duration = this.getAttribute("data-time");
            console.log(duration);
            timeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`;
        })
    })


    //stop and play sonds
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = 'svg/pause.svg';
        }
        else {
            song.pause();
            video.pause();
            play.src = 'svg/play.svg';
        }
    }

    // animate circle

    song.ontimeupdate = () => {
        let currTime = song.currentTime;
        let elasped = duration - currTime;
        let seconds = Math.floor(elasped % 60);
        let minutes = Math.floor(elasped / 60);

        let progress = outlineLength - (currTime / duration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //animate text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currTime>=duration) {
            song.pause();
            song.currentTime=0;
            play.src = 'svg/play.svg';
            video.pause();
        }
    }

}

app();