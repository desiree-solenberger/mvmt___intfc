const videos = document.querySelectorAll('[data-vimeo-id]');

videos.forEach(video => {
  const thumb = video.dataset.thumb;
  if (thumb) {
    video.style.backgroundImage = `url("${thumb}")`;
  }
});

function loadVimeo(video) {
  if (video.dataset.loaded === 'true') return;

  const vimeoId = video.dataset.vimeoId;

  const iframe = document.createElement('iframe');
  iframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&controls=0&background=1`;
  iframe.allow = 'autoplay; fullscreen; picture-in-picture';
  iframe.loading = 'lazy';
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', '');

  video.appendChild(iframe);
  video.dataset.loaded = 'true';
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadVimeo(entry.target);
    }
  });
}, {
  threshold: 0.25
});

videos.forEach(video => observer.observe(video));


window.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("mvmt-title");

  if (!title) return;

  let underscoreCount = 1;
  let direction = 1;

  function animateTitle() {
    title.textContent = "MVMT" + "_".repeat(underscoreCount) + "INTFC";

    if (direction === 1 && underscoreCount >= 20) {
      direction = -1;
    } else if (direction === -1) {
      if (underscoreCount <= 1) {
        direction = 1;
      } else if (underscoreCount <= 5 && Math.random() < 0.3) {
        direction = 1;
      }
    }

    let speed;

    if (underscoreCount === 1 || underscoreCount === 20) {
      speed = 800 + Math.random() * 700;
    } else {
      speed = 40 + Math.random() * 90;
    }

    underscoreCount += direction;

    setTimeout(animateTitle, speed);
  }

  animateTitle();
});