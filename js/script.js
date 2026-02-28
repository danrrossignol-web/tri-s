// Function to fetch and insert HTML components
function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');
  elements.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error('Error loading file');
        return response.text();
      })
      .then(data => {
        el.innerHTML = data;
        // After inserting, we need to make sure the active link is correct
        highlightActiveLink();
      })
      .catch(err => {
        console.error(`Failed to include file: ${file}`, err);
        el.innerHTML = "Content not found.";
      });
  });
}

// Optional: Highlights the active page in the navigation
function highlightActiveLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call the function when the page is fully loaded
window.addEventListener('load', includeHTML);
