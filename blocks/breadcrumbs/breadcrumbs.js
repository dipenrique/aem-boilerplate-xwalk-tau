/**
 * Decorates the breadcrumbs block
 * @param {Element} block The breadcrumbs block element
 */
export default function decorate(block) {
  // Create breadcrumbs container
  const breadcrumbsList = document.createElement('ul');
  
  // Get the current path and split it into segments
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  
  // Add home link
  const homeLi = document.createElement('li');
  const homeLink = document.createElement('a');
  homeLink.href = '/';
  
  // Add home icon
  const homeIcon = document.createElement('span');
  homeIcon.className = 'home-icon';
  homeIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  `;
  
  homeLink.appendChild(homeIcon);
  homeLi.appendChild(homeLink);
  breadcrumbsList.appendChild(homeLi);
  
  // Build breadcrumb trail
  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    const li = document.createElement('li');
    
    // If it's the last segment, it's the current page
    if (index === segments.length - 1) {
      const current = document.createElement('span');
      current.className = 'current';
      current.textContent = formatSegment(segment);
      li.appendChild(current);
    } else {
      const link = document.createElement('a');
      link.href = currentPath;
      link.textContent = formatSegment(segment);
      li.appendChild(link);
    }
    
    breadcrumbsList.appendChild(li);
  });
  
  // Clear the block and add the breadcrumbs list
  block.textContent = '';
  block.appendChild(breadcrumbsList);
}

/**
 * Format a URL segment to be more readable
 * @param {string} segment The URL segment
 * @returns {string} Formatted segment
 */
function formatSegment(segment) {
  // Replace hyphens and underscores with spaces
  let formatted = segment.replace(/[-_]/g, ' ');
  
  // Capitalize first letter of each word
  formatted = formatted.replace(/\b\w/g, (char) => char.toUpperCase());
  
  return formatted;
}
