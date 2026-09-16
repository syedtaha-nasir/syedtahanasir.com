async function loadHead() {
    const response = await fetch("/components/head.html");
    if (!response.ok) return;
    const html = await response.text();
    document.head.insertAdjacentHTML("beforeend", html);
}

async function loadComponent(id, file) {
    const element = document.getElementById(id);
    if (!element) return;
    const response = await fetch(file);
    if (!response.ok) return;
    element.innerHTML = await response.text();
}

function setupMobileMenu() {
    const button = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-nav");

    if (!button || !navigation) return;

    button.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("active");
        button.setAttribute("aria-expanded", isOpen);
        button.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadHead();
    await loadComponent("site-header", "/components/header.html");
    await loadComponent("site-footer", "/components/footer.html");
    setupMobileMenu();
});
