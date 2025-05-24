/**
 * Decorates the events section block
 * @param {Element} block The events section block element
 */
export default function decorate(block) {
  // Add header and items container
  const header = document.createElement('div');
  header.className = 'events-section-header';
  
  // Add items container
  const itemsContainer = document.createElement('div');
  itemsContainer.className = 'events-section-items';
  
  // Add footer
  const footer = document.createElement('div');
  footer.className = 'events-section-footer';
  
  // Process block content
  const rows = [...block.children];
  
  // First row is the header
  if (rows.length > 0) {
    const headerRow = rows.shift();
    header.append(...headerRow.children);
    block.append(header);
  }
  
  // Last row might be the footer with "View All" link
  let footerRow = null;
  if (rows.length > 0) {
    const lastRow = rows[rows.length - 1];
    const lastRowLink = lastRow.querySelector('a');
    if (lastRowLink && lastRow.children.length === 1) {
      footerRow = rows.pop();
      footer.append(...footerRow.children);
    }
  }
  
  // Process event items
  rows.forEach((row) => {
    const eventItem = document.createElement('div');
    eventItem.className = 'event-item';
    
    // Process event item content
    const cells = [...row.children];
    
    // Create date display (from first cell)
    if (cells.length > 0) {
      const dateText = cells[0].textContent.trim();
      if (dateText) {
        const dateDisplay = document.createElement('div');
        dateDisplay.className = 'event-date';
        
        // Parse date (expected format: DD/MM/YYYY)
        let day = '';
        let month = '';
        let year = '';
        
        const dateParts = dateText.split('/');
        if (dateParts.length === 3) {
          day = dateParts[0];
          month = getMonthName(parseInt(dateParts[1], 10));
          year = dateParts[2];
        } else {
          // Try to parse as a date string
          try {
            const date = new Date(dateText);
            if (!isNaN(date.getTime())) {
              day = date.getDate();
              month = getMonthName(date.getMonth() + 1);
              year = date.getFullYear();
            }
          } catch (e) {
            // If parsing fails, use the text as is
            day = dateText;
          }
        }
        
        // Create day element
        const dayElem = document.createElement('div');
        dayElem.className = 'event-date-day';
        dayElem.textContent = day;
        dateDisplay.append(dayElem);
        
        // Create month element
        if (month) {
          const monthElem = document.createElement('div');
          monthElem.className = 'event-date-month';
          monthElem.textContent = month;
          dateDisplay.append(monthElem);
        }
        
        // Create year element
        if (year) {
          const yearElem = document.createElement('div');
          yearElem.className = 'event-date-year';
          yearElem.textContent = year;
          dateDisplay.append(yearElem);
        }
        
        eventItem.append(dateDisplay);
      }
    }
    
    // Create content wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'event-content';
    
    // Add title (from second cell)
    if (cells.length > 1) {
      const titleText = cells[1].textContent.trim();
      if (titleText) {
        const title = document.createElement('h3');
        title.className = 'event-title';
        title.textContent = titleText;
        contentWrapper.append(title);
      }
    }
    
    // Add time and location info
    const timeLocationWrapper = document.createElement('div');
    timeLocationWrapper.className = 'event-time-location';
    
    // Add time (from third cell)
    if (cells.length > 2) {
      const timeText = cells[2].textContent.trim();
      if (timeText) {
        const time = document.createElement('div');
        time.className = 'event-time';
        time.textContent = timeText;
        timeLocationWrapper.append(time);
      }
    }
    
    // Add location (from fourth cell)
    if (cells.length > 3) {
      const locationText = cells[3].textContent.trim();
      if (locationText) {
        const location = document.createElement('div');
        location.className = 'event-location';
        location.textContent = locationText;
        timeLocationWrapper.append(location);
      }
    }
    
    // Add time-location wrapper if it has children
    if (timeLocationWrapper.children.length > 0) {
      contentWrapper.append(timeLocationWrapper);
    }
    
    // Add description (from fifth cell)
    if (cells.length > 4) {
      const descriptionContent = cells[4].innerHTML.trim();
      if (descriptionContent) {
        const description = document.createElement('div');
        description.className = 'event-description';
        description.innerHTML = descriptionContent;
        contentWrapper.append(description);
      }
    }
    
    // Add link if available
    const link = row.querySelector('a');
    if (link) {
      const linkWrapper = document.createElement('div');
      linkWrapper.className = 'event-link';
      
      // Clone the link to avoid removing it from its original location
      const linkClone = link.cloneNode(true);
      if (!linkClone.textContent.trim()) {
        linkClone.textContent = 'Event Details';
      }
      
      linkWrapper.append(linkClone);
      contentWrapper.append(linkWrapper);
    }
    
    eventItem.append(contentWrapper);
    itemsContainer.append(eventItem);
  });
  
  block.append(itemsContainer);
  
  // Add footer if it exists
  if (footerRow) {
    block.append(footer);
  }
}

/**
 * Helper function to get month name from month number
 * @param {number} monthNum Month number (1-12)
 * @returns {string} Month name abbreviation
 */
function getMonthName(monthNum) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  
  return months[Math.max(0, Math.min(11, monthNum - 1))];
}
