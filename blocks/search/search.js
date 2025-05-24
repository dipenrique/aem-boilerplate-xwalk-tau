/**
 * Decorates the search block
 * @param {Element} block The search block element
 */
export default function decorate(block) {
  // Create search form
  const searchForm = document.createElement('form');
  searchForm.className = 'search-form';
  searchForm.setAttribute('role', 'search');
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      // For demonstration purposes, we'll just show the overlay
      // In a real implementation, this would trigger a search request
      showSearchOverlay(query);
    }
  });
  
  // Create input wrapper
  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'search-input-wrapper';
  
  // Create search input
  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.className = 'search-input';
  searchInput.placeholder = 'Search...';
  searchInput.setAttribute('aria-label', 'Search');
  
  // Create search button
  const searchButton = document.createElement('button');
  searchButton.type = 'submit';
  searchButton.className = 'search-button';
  searchButton.setAttribute('aria-label', 'Submit search');
  searchButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
  `;
  
  // Assemble search form
  inputWrapper.appendChild(searchInput);
  inputWrapper.appendChild(searchButton);
  searchForm.appendChild(inputWrapper);
  
  // Create search overlay
  const searchOverlay = createSearchOverlay();
  
  // Add search form and overlay to block
  block.textContent = '';
  block.appendChild(searchForm);
  document.body.appendChild(searchOverlay);
  
  // Add event listener to open overlay on input focus
  searchInput.addEventListener('focus', () => {
    showSearchOverlay();
  });
}

/**
 * Creates the search overlay
 * @returns {HTMLElement} The search overlay element
 */
function createSearchOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.id = 'search-overlay';
  
  const container = document.createElement('div');
  container.className = 'search-overlay-container';
  
  const input = document.createElement('input');
  input.type = 'search';
  input.className = 'search-overlay-input';
  input.placeholder = 'Search...';
  input.setAttribute('aria-label', 'Search');
  
  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'search-overlay-button';
  button.setAttribute('aria-label', 'Submit search');
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
  `;
  
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'search-overlay-close';
  closeButton.setAttribute('aria-label', 'Close search');
  closeButton.innerHTML = '×';
  closeButton.addEventListener('click', hideSearchOverlay);
  
  // Add event listener to close overlay on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideSearchOverlay();
    }
  });
  
  // Add event listener to submit search from overlay
  container.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
      // In a real implementation, this would trigger a search request
      console.log(`Search query: ${query}`);
      // For demonstration, we'll just hide the overlay
      hideSearchOverlay();
    }
  });
  
  container.appendChild(input);
  container.appendChild(button);
  overlay.appendChild(container);
  overlay.appendChild(closeButton);
  
  return overlay;
}

/**
 * Shows the search overlay
 * @param {string} [initialQuery] Optional initial query to set in the search input
 */
function showSearchOverlay(initialQuery = '') {
  const overlay = document.getElementById('search-overlay');
  if (overlay) {
    const input = overlay.querySelector('.search-overlay-input');
    if (input && initialQuery) {
      input.value = initialQuery;
    }
    
    overlay.classList.add('active');
    
    // Focus the input after a short delay to ensure the overlay is visible
    setTimeout(() => {
      if (input) {
        input.focus();
      }
    }, 100);
    
    // Prevent scrolling of the body
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Hides the search overlay
 */
function hideSearchOverlay() {
  const overlay = document.getElementById('search-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    
    // Re-enable scrolling of the body
    document.body.style.overflow = '';
  }
}
