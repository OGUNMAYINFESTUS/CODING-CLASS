// Load saved theme preference from localStorage
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    }
  });
  
  // Toggle theme and save to localStorage
  document.getElementById("themeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
  
  // Animate box on click
  const box = document.getElementById("box");
  box.addEventListener("click", () => {
    box.classList.add("animate");
    
    // Remove the class after animation ends so it can be re-triggered
    box.addEventListener("animationend", () => {
      box.classList.remove("animate");
    }, { once: true });
  });
  