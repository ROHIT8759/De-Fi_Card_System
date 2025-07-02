// Performance optimization utilities
import { useState } from 'react';

// Debounce function for search inputs
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Lazy loading utility for images
export const lazyLoadImage = (img) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = image.dataset.src;
        image.classList.remove('opacity-0');
        image.classList.add('opacity-100');
        observer.unobserve(image);
      }
    });
  });
  
  observer.observe(img);
};

// Memory usage monitor (development only)
export const monitorMemory = () => {
  if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
    const memInfo = performance.memory;
    console.log({
      usedJSHeapSize: `${(memInfo.usedJSHeapSize / 1048576).toFixed(2)} MB`,
      totalJSHeapSize: `${(memInfo.totalJSHeapSize / 1048576).toFixed(2)} MB`,
      jsHeapSizeLimit: `${(memInfo.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
    });
  }
};

// Virtual scrolling utility for large lists
export const useVirtualScroll = (items, containerHeight, itemHeight) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight),
    items.length
  );
  
  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;
  
  return {
    visibleItems,
    offsetY,
    setScrollTop,
    totalHeight: items.length * itemHeight
  };
};

// Resource preloader
export const preloadResources = (resources) => {
  resources.forEach(resource => {
    if (resource.type === 'image') {
      const img = new Image();
      img.src = resource.url;
    } else if (resource.type === 'font') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.href = resource.url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  });
};
