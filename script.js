const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");

if (header && menuToggle && navigation) {
    menuToggle.hidden = false;

    function setMenuOpen(isOpen) {
        header.classList.toggle("menu-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    }

    menuToggle.addEventListener("click", () => {
        setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    navigation.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            setMenuOpen(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
            setMenuOpen(false);
            menuToggle.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.matchMedia("(min-width: 561px)").matches) {
            setMenuOpen(false);
        }
    });
}

const year = document.querySelector("#current-year");
if (year) {
    year.textContent = new Date().getFullYear();
}

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".about-content, .projects-heading, .project, .contact-inner").forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });

    const sectionLinks = new Map(
        [...document.querySelectorAll("#site-navigation a[href^='#']")].map((link) => [
            link.getAttribute("href").slice(1),
            link,
        ]),
    );

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting || !sectionLinks.has(entry.target.id)) {
                return;
            }

            sectionLinks.forEach((link) => link.removeAttribute("aria-current"));
            sectionLinks.get(entry.target.id).setAttribute("aria-current", "location");
        });
    }, { rootMargin: "-20% 0px -65% 0px" });

    document.querySelectorAll("main section[id]").forEach((section) => {
        sectionObserver.observe(section);
    });
}
