const draggabilly = require('draggabilly');

const show = () => {
    $('body').append(html);
    const element = document.querySelector('.vhs-controls');
    new draggabilly(element);
};

const toggleRecordingState = () => {
    $('.vhs-record-circle').toggleClass('vhs-recording');
};

const togglePlayingState = () => {
    $('.vhs-play-button').toggleClass('vhs-playing');
};

const togglePausedState = () => {
    $('.vhs-play-button').toggleClass('inline-block');
    $('.vhs-resume-button').toggleClass('inline-block');
};

const styles = `<style>
    .vhs-controls {
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 99999;
    }
    .vhs-button {
        width: 30px;
        height: 30px;
        background: #FFF;
        border: 1px solid #DDD;
        border-radius: 5px;
        cursor: pointer;
        display: inline-block;
    }
    .vhs-record-circle {
        border-radius: 50%;
        width: 10px;
        height: 10px;
        margin: 10px;
        background: #FE3548;
        display: inline-block;
    }
    .vhs-recording {
        animation: vhs-recording-animation 2s infinite;
    }
    @keyframes vhs-recording-animation {
        0%   {opacity: 1}
        50%  {opacity: 0}
        100% {opacity: 1}
    }
    .vhs-play-button, .vhs-resume-button {
        display: none;
    }
    .vhs-playing {
        background: #00ADE9;
        border-color: #00ADE9;
    }
    .vhs-playing .vhs-play-triangle {
        background: #FFF;
    }
    .vhs-resume-button {
        background: #ffd590;
        border-color: #ffd590;
    }
    .vhs-play-triangle {
        background-color: #666;
        display: inline-block;
        margin: 12px;
    }
    .vhs-resume-button .vhs-play-triangle {
        background: #FFF;
    }
    .vhs-play-triangle:before,
    .vhs-play-triangle:after {
        content: '';
        position: absolute;
        background-color: inherit;
    }
    .vhs-play-triangle,
    .vhs-play-triangle:before,
    .vhs-play-triangle:after {
        width:  6px;
        height: 6px;
        border-top-right-radius: 30%;
    }
    .vhs-play-triangle {
        transform: rotate(30deg) skewX(-30deg) scale(1, .866);
    }
    .vhs-play-triangle:before {
        transform: rotate(-135deg) skewX(-45deg) scale(1.414, .707) translate(0, -50%);
    }
    .vhs-play-triangle:after {
        transform: rotate(135deg) skewY(-45deg) scale(.707, 1.414) translate(50%);
    }
    .vhs-save-icon {
        margin: 7.5px;
        vertical-align: bottom;
        display: inline-block;
    }
    .vhs-controls .inline-block {
        display: inline-block !important;
    }
</style>`;

const html = `
    <div class="vhs-controls">
        ${styles}
        <span class="vhs-button" onclick="vhs.toggleRecording()">
            <span class="vhs-record-circle"></span>
        </span>
        <span class="vhs-button vhs-play-button inline-block" onclick="vhs.setupPlayback()">
            <span class="vhs-play-triangle"></span>
        </span>
        <span class="vhs-button vhs-resume-button" onclick="vhs.resumePlayback()">
            <span class="vhs-play-triangle"></span>
        </span>
        <span class="vhs-button vhs-save-button" onclick="vhs.saveRecording()">
            <span class="vhs-save-icon">&#128190;</span>
        </span>
    </div>
`;

module.exports = {
    show,
    toggleRecordingState,
    togglePlayingState,
    togglePausedState
}
