// matchHeight.js

class MatchHeight {
/**
 * Create a MatchHeight instance.
 * @param {string} selector - CSS selector for elements with the data attribute (default: '[data-mh]').
 * @param {object} options - Configuration options.
 * @param {boolean} options.autoInit - Automatically run the match height on DOMContentLoaded (default: true).
 * @param {boolean} options.onResize - Recalculate heights on window resize (default: true).
 * @param {number} options.debounceDelay - Debounce delay in ms for the resize event (default: 100).
 */
constructor(selector = '[data-mh]', { autoInit = true, onResize = true, debounceDelay = 100 } = {}) {
    this.selector = selector;
    this.onResize = onResize;
    this.debounceDelay = debounceDelay;

    if (autoInit) {
    this.init();
    }
}

/**
 * Initializes the height matching process.
 */
init() {
    if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => this.matchHeightByDataAttr());
    } else {
    this.matchHeightByDataAttr();
    }

    if (this.onResize) {
    window.addEventListener('resize', this.debounce(() => {
        this.matchHeightByDataAttr();
    }, this.debounceDelay));
    }
}

/**
 * Finds groups of elements with the same data-mh attribute value and sets their heights to match the tallest element in each group.
 */
matchHeightByDataAttr() {
    const elements = document.querySelectorAll(this.selector);
    
    if (elements.length === 0) {
        console.log(`⛔ data-mh is missing, exclude if not needed.`);
        return; // Exit early if no elements are found
    }

    const groups = {};

    // Group elements by their data-mh value.
    elements.forEach(el => {
        const groupName = el.getAttribute('data-mh');
        if (!groups[groupName]) {
            groups[groupName] = [];
        }
        groups[groupName].push(el);
    });

    // For each group, determine the maximum height and apply it.
    Object.keys(groups).forEach(group => {
        let maxHeight = 0;

        groups[group].forEach(el => {
            el.style.height = 'auto'; // Reset to natural height.
            const elHeight = el.offsetHeight;
            if (elHeight > maxHeight) {
                maxHeight = elHeight;
            }
        });

        groups[group].forEach(el => {
            el.style.height = maxHeight + 'px';
        });
    });
}

/**
 * Debounce helper function to limit the rate at which a function is executed.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The debounce delay in milliseconds.
 * @param {boolean} immediate - Trigger on the leading edge.
 * @returns {Function} - The debounced function.
 */
    debounce(func, wait, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
        const context = this;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
        };
    }
}

export default MatchHeight;
