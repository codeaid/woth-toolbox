/**
 * Check if the specified storage is both supported and available
 * Source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
 *
 * @param {string} type Storage type to check
 */
const isStorageAvailable = (type: 'localStorage' | 'sessionStorage') => {
    const storage: Storage = window[type];

    try {
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            // Everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // Test name field too, because code might not be present
                // Everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // Acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0
        );
    }
};

/**
 * Get available storage container
 */
export const getStorage = () => {
    if (isStorageAvailable('localStorage')) {
        // Use local storage first and foremost
        return window.localStorage;
    } else if (isStorageAvailable('sessionStorage')) {
        // Fall back to session storage
        return window.sessionStorage;
    }

    throw new Error('No storage container available');
};
