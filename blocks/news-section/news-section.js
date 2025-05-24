import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Decorates the news section block
 * @param {Element} block The news section block element
 */
export default function decorate(block) {
  // Add header and items container
  const header = document.createElement('div');
  header.className = 'news-section-header';
  
  // Add items container
  const itemsContainer = document.createElement('div');
  itemsContainer.className = 'news-section-items';
  
  // Add footer
  const footer = document.createElement('div');
  footer.className = 'news-section-footer';
  
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
  
  // Process news items
  rows.forEach((row, index) => {
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';
    if (index === 0) {
      newsItem.classList.add('featured');
    }
    
    // Process news item content
    const cells = [...row.children];
    
    // First cell might contain the image
    if (cells.length > 0) {
      const imageCell = cells[0];
      const picture = imageCell.querySelector('picture');
      
      if (picture) {
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'news-item-image';
        
        // Optimize image
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          picture.replaceWith(optimizedPic);
          imageWrapper.append(optimizedPic);
        } else {
          imageWrapper.append(picture);
        }
        
        // Add category tag if available
        const categoryText = cells.length > 3 ? cells[3].textContent.trim() : '';
        if (categoryText) {
          const category = document.createElement('div');
          category.className = 'news-item-category';
          category.textContent = categoryText;
          imageWrapper.append(category);
        }
        
        newsItem.append(imageWrapper);
      }
    }
    
    // Create content wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'news-item-content';
    
    // Add date if available (second cell)
    if (cells.length > 1) {
      const dateText = cells[1].textContent.trim();
      if (dateText) {
        const date = document.createElement('div');
        date.className = 'news-item-date';
        date.textContent = dateText;
        contentWrapper.append(date);
      }
    }
    
    // Add title and description (from second or third cell)
    if (cells.length > 2) {
      const contentCell = cells[2];
      const title = contentCell.querySelector('h1, h2, h3, h4, h5, h6');
      const paragraphs = contentCell.querySelectorAll('p');
      
      if (title) {
        const titleElem = document.createElement('h3');
        titleElem.className = 'news-item-title';
        titleElem.innerHTML = title.innerHTML;
        contentWrapper.append(titleElem);
        title.remove();
      }
      
      if (paragraphs.length > 0) {
        const description = document.createElement('div');
        description.className = 'news-item-description';
        description.innerHTML = contentCell.innerHTML;
        contentWrapper.append(description);
      }
    }
    
    // Add link if available
    const link = row.querySelector('a');
    if (link) {
      const linkWrapper = document.createElement('div');
      linkWrapper.className = 'news-item-link';
      
      // Clone the link to avoid removing it from its original location
      const linkClone = link.cloneNode(true);
      if (!linkClone.textContent.trim()) {
        linkClone.textContent = 'Read More';
      }
      
      linkWrapper.append(linkClone);
      contentWrapper.append(linkWrapper);
    }
    
    newsItem.append(contentWrapper);
    itemsContainer.append(newsItem);
  });
  
  block.append(itemsContainer);
  
  // Add footer if it exists
  if (footerRow) {
    block.append(footer);
  }
}
