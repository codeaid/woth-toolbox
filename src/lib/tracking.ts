/**
 * Send custom Google Analytics event
 *
 * @param event Event name
 * @param data Custom event data
 */
export const sendGoogleEvent = (
  event: GoogleEventName,
  data?: Record<string, unknown>,
) => {
  // Skip sending events if window object is not available
  if (typeof window === 'undefined' || !('gtag' in window)) {
    return;
  }

  // Send the event
  window.gtag('event', event, data);
};
