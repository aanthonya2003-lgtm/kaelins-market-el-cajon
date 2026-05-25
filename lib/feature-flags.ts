/**
 * Kaelin's Market — Feature Flags
 * Iron Law #1: NO VERIFIED EMAIL = NO FORM PAGE. PHONE CTA INSTEAD.
 * Unblock by confirming source data and flipping the flag.
 */

export const EMAIL_VERIFIED = false;

/**
 * Instagram handle @kaelinsmarket not yet confirmed.
 * Flip to true once owner verifies handle AND INSTAGRAM_ACCESS_TOKEN is set.
 */
export const INSTAGRAM_VERIFIED = false;

/**
 * Facebook page exists but vanity URL unconfirmed.
 * Currently linking to numeric ID. Flip when owner confirms /pagename URL.
 */
export const FACEBOOK_VERIFIED = false;

/** When set, the EngagementCTA shows the email form above the SMS option. */
export const FACEBOOK_NUMERIC_URL = 'https://www.facebook.com/182370475123389';

/** SMS-first fallback (always live — phone is verified). */
export const SMS_KEYWORD = 'DEALS';
