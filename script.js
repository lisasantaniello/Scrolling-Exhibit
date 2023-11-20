document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('myVideo');
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let isScrolling;

    window.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Check if there is a change in the scroll position
        if (currentScroll !== lastScrollTop) {
            // User is actively scrolling
            if (video.paused) {
                video.play();
            }
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Update lastScrollTop to the current scroll position

            // Clear the timeout every time there is a scroll event
            clearTimeout(isScrolling);

            // Set a timeout that will pause the video when scrolling stops
            isScrolling = setTimeout(() => {
                if (!video.paused) {
                    video.pause();
                }
            }, 150); // Delay in milliseconds before the video pauses after scrolling stops
        }
    });
});
