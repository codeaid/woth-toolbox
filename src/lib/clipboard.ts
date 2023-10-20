/**
 * Check if copying and pasting text is supported
 */
const isClipboardAvailable = () =>
  typeof window !== 'undefined' &&
  window.isSecureContext &&
  navigator.clipboard;

/**
 * Copy text to clipboard
 *
 * @param text Text to place on the clipboard
 */
export const setClipboardValue = async (text: string) => {
  // Ensure copying and pasting text to/from clipboard is supported
  if (!isClipboardAvailable()) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    return false;
  }
};
