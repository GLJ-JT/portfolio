(function () {
  const currentScript = document.currentScript;
  const scriptUrl = currentScript ? new URL(currentScript.src, window.location.href) : new URL("shared/site-nav.js", window.location.href);
  const rootUrl = new URL("../", scriptUrl);

  const toRootHref = (path) => new URL(path, rootUrl).href;

  const links = [
    { className: "portfolio-nav__name", href: "index.html#who-i-am", label: "Joe Tao" },
    { href: "index.html#work", label: "Work" },
    { href: "index.html#experience", label: "Experience" },
    { href: "assets/Joe_Tao_Resume.pdf", label: "CV", download: true },
  ];

  const buildLink = (item) => {
    const link = document.createElement("a");
    link.href = item.href.startsWith("mailto:") ? item.href : toRootHref(item.href);
    link.textContent = item.label;
    if (item.className) link.className = item.className;
    if (item.download) link.setAttribute("download", "");
    return link;
  };

  const installNav = () => {
    if (document.querySelector(".portfolio-nav")) return;

    document.querySelectorAll(".site-header, .navbar, .topbar, body > nav.nav").forEach((node) => {
      node.remove();
    });

    const header = document.createElement("header");
    header.className = "portfolio-nav";
    header.setAttribute("aria-label", "Site navigation");

    header.appendChild(buildLink(links[0]));

    const nav = document.createElement("nav");
    nav.className = "portfolio-nav__links";
    nav.setAttribute("aria-label", "Primary navigation");
    links.slice(1).forEach((item) => nav.appendChild(buildLink(item)));
    header.appendChild(nav);

    const contact = document.createElement("a");
    contact.className = "portfolio-nav__contact";
    contact.href = toRootHref("index.html#contact");
    contact.textContent = "Contact";
    header.appendChild(contact);

    document.body.insertBefore(header, document.body.firstChild);
    document.body.classList.add("has-portfolio-nav");
  };

  if (document.body) {
    installNav();
  } else {
    document.addEventListener("DOMContentLoaded", installNav, { once: true });
  }
})();
