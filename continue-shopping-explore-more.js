<script>
  
  (function() {
  function updateButtonText() {
    const buttons = document.querySelectorAll('.hl-continue-btn');
    if (!buttons.length) return false;

    buttons.forEach(btn => {
      // Find the text node inside the button and replace its text only
      const img = btn.querySelector('img');
      if (img) {
        // Remove all text nodes and add "Explore More"
        btn.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) node.remove();
        });
        btn.appendChild(document.createTextNode(' Explore More'));
      } else {
        // If no image, just replace the text
        btn.textContent = 'Explore More';
      }
    });

    return true;
  }

  // Try immediately
  if (updateButtonText()) return;

  // Watch for late-loaded GHL content
  const observer = new MutationObserver((_, obs) => {
    if (updateButtonText()) obs.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Fallback polling for ~10s
  let tries = 0;
  const interval = setInterval(() => {
    if (updateButtonText() || ++tries > 20) clearInterval(interval);
  }, 500);
})();

  
  
  
</script>
