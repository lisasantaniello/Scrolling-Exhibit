document.addEventListener('DOMContentLoaded', function () {
    let printDialogTriggered = false;

    function checkScrollBottomAndPrint() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const atBottom = (window.innerHeight + scrollTop) >= document.body.offsetHeight;

        if (atBottom && !printDialogTriggered) {
            // Randomly choose between v3 and v4
            const videoId = Math.random() < 0.5 ? 'v3' : 'v4';
            const video = document.getElementById(videoId);
            const frameTimes = [0, 20, 30, 15]; // Timestamps in seconds for frames

            // Introduce a delay before preparing the print layout
            setTimeout(() => {
                preparePrintLayout(video, frameTimes);
            }, 3000); // 5000 milliseconds delay (5 seconds)

            printDialogTriggered = true;
        }
    }

    function preparePrintLayout(video, frameTimes) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const frameWidth = 200; // Set the width of each frame
        canvas.width = frameTimes.length * frameWidth;
        canvas.height = 200; // Set the height of the canvas

        Promise.all(frameTimes.map((time, index) => 
            captureFrame(video, time, ctx, frameWidth, canvas.height, index * frameWidth)))
        .then(() => {
            const dataUrl = canvas.toDataURL('image/png');
            const printWindow = window.open('', '_blank');
            printWindow.document.write('<img src="' + dataUrl + '" onload="window.print();window.close()" />');
        });
    }

    function captureFrame(video, time, ctx, width, height, offsetX) {
        return new Promise((resolve) => {
            video.currentTime = time;
            video.addEventListener('seeked', function onSeeked() {
                ctx.drawImage(video, offsetX, 0, width, height);
                video.removeEventListener('seeked', onSeeked);
                resolve();
            });
        });
    }

    window.addEventListener('scroll', checkScrollBottomAndPrint);

    window.onload = function() {
        printDialogTriggered = false;
    };

    var playbackConstants = [150, 400, 300, 300, 160, 150, 100, 250, 120, 70, 150, 50, 50];
    var vids = ['v0', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10', 'v11'].map(id => document.getElementById(id));
    var setHeight = document.getElementById("set-height0");

    vids[0].addEventListener('loadedmetadata', function() {
        setHeight.style.height = Math.floor(vids[0].duration) * playbackConstants[0] + "px";
    });

    let lastScrollTop = 0;
    function scrollPlay() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if (Math.abs(scrollTop - lastScrollTop) > 10) {
            vids.forEach((vid, index) => {
                if (vid && vid.readyState >= 2) {
                    var frameNumber = scrollTop / playbackConstants[index];
                    vid.currentTime = Math.min(frameNumber, vid.duration);
                }
            });
            lastScrollTop = scrollTop;
        }

        window.requestAnimationFrame(scrollPlay);
    }

    window.requestAnimationFrame(scrollPlay);

    const text = document.getElementById('scroll-text');
    const words = text.innerText.split(' ');

    text.innerHTML = '';

    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.transitionDelay = `${index * 100}ms`;
        text.appendChild(span);
    });

    const isInView = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const revealOnScroll = () => {
        document.querySelectorAll('#scroll-text span').forEach(span => {
            if (isInView(span)) {
                span.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
});
