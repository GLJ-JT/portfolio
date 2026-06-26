(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const transitionDuration = 1240;
  const totalDuration = 1660;
  let isTransitioning = false;

  const seededNoise = (row, column, salt = 0) => {
    const value = Math.sin((row + 1) * 127.1 + (column + 1) * 311.7 + salt * 74.7) * 43758.5453;
    return value - Math.floor(value);
  };

  const createWipe = () => {
    const wipe = document.createElement("div");
    const plane = document.createElement("div");
    const tileSize = window.innerWidth < 700 ? 22 : 30;
    const columns = Math.ceil(window.innerWidth / tileSize);
    const rows = Math.ceil(window.innerHeight / tileSize);
    const maxDiagonal = columns + rows - 2;

    wipe.className = "load-wipe";
    wipe.setAttribute("aria-hidden", "true");
    plane.className = "load-wipe__plane";
    wipe.appendChild(plane);

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const pixel = document.createElement("span");
        const diagonalProgress = (row + column) / maxDiagonal;
        const islandNoise = seededNoise(row, column);
        const edgeNoise = (seededNoise(row, column, 2) - 0.5) * 260;
        const clusterNoise = (seededNoise(Math.floor(row / 2), Math.floor(column / 2), 4) - 0.5) * 170;
        const earlyIsland = islandNoise > 0.88 ? -210 : 0;
        const lateIsland = islandNoise < 0.12 ? 160 : 0;
        const roughDelay = edgeNoise + clusterNoise + earlyIsland + lateIsland;
        const entryDelay = Math.max(0, diagonalProgress * 780 + roughDelay);
        const exitDelay = Math.max(0, diagonalProgress * 620 + roughDelay * 0.82);

        pixel.className = "load-wipe__pixel";
        pixel.style.setProperty("--wipe-left", `${column * tileSize}px`);
        pixel.style.setProperty("--wipe-top", `${row * tileSize}px`);
        pixel.style.setProperty("--wipe-size", `${tileSize}px`);
        pixel.style.setProperty("--wipe-delay", `${entryDelay.toFixed(0)}ms`);
        pixel.style.setProperty("--wipe-exit-delay", `${exitDelay.toFixed(0)}ms`);
        plane.appendChild(pixel);
      }
    }

    document.body.appendChild(wipe);
    return wipe;
  };

  const runEnter = () => {
    const wipe = createWipe();

    wipe.classList.add("is-entering", "is-filled");
    document.documentElement.classList.remove("is-page-transitioning");

    window.setTimeout(() => {
      wipe.classList.add("is-leaving");
    }, 80);

    window.setTimeout(() => {
      wipe.classList.add("is-done");
      wipe.remove();
      document.documentElement.classList.remove("is-page-transitioning");
    }, totalDuration);
  };

  const runExit = (href) => {
    if (isTransitioning) return;
    isTransitioning = true;

    const wipe = createWipe();
    window.requestAnimationFrame(() => {
      wipe.classList.add("is-entering");
    });

    window.setTimeout(() => {
      wipe.classList.add("is-filled");
    }, transitionDuration);

    window.setTimeout(() => {
      window.location.href = href;
    }, transitionDuration + 220);
  };

  const shouldTransition = (link, event) => {
    if (!link || link.target || link.hasAttribute("download")) return false;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;

    const url = new URL(link.href, window.location.href);
    if (url.protocol !== window.location.protocol) return false;
    if (url.protocol !== "file:" && url.origin !== window.location.origin) return false;
    if (!url.pathname.endsWith(".html") && url.pathname !== "/" && url.pathname !== window.location.pathname) return false;
    if (url.pathname === window.location.pathname && url.hash) return false;

    return true;
  };

  if (document.body) {
    runEnter();
  } else {
    document.addEventListener("DOMContentLoaded", runEnter, { once: true });
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!shouldTransition(link, event)) return;

    event.preventDefault();
    event.stopPropagation();
    runExit(link.href);
  }, true);
})();
