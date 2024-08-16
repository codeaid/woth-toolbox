import { customAlphabet } from 'nanoid';

// noinspection SpellCheckingInspection
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');

/**
 * Generate a new user identifier
 */
export const createUserId = () => {
  const id = nanoid(10);
  return id + calculateCheckDigits(id);
};

/**
 * Check if the specified user identifier is valid
 *
 * @param userId Identifier to validate
 */
export const validateUserId = (userId?: string): userId is string =>
  typeof userId === 'string' && hasValidCheckDigits(userId);

/**
 * Calculate check digits for the specified string
 *
 * @param input Input to generate check digits for
 */
const calculateCheckDigits = (input: string) => {
  if (input.length === 0) {
    throw new Error('Input string cannot be empty');
  }

  let sum = 0;
  const modulus = 36;

  for (let i = 0; i < input.length; i++) {
    sum += parseInt(input[i], 36);
  }

  // Calculate the first check digit
  const checkDigit1Value = sum % modulus;
  const checkDigit1 = checkDigit1Value.toString(36).toUpperCase();

  // Add the first check digit to the sum for the second check digit calculation
  sum += checkDigit1Value;

  // Calculate the second check digit
  const checkDigit2Value = sum % modulus;
  const checkDigit2 = checkDigit2Value.toString(36).toUpperCase();

  return checkDigit1 + checkDigit2;
};

/**
 * Validate check digits of the specified string
 *
 * @param input Input to validate
 */
const hasValidCheckDigits = (input: string) => {
  // Input string must be longer than the length of check digits
  if (input.length <= 2) {
    return false;
  }

  // Separate the original string and the check digits
  const originalString = input.slice(0, -2);
  const providedCheckDigits = input.slice(-2);

  // Calculate the expected check digits for the original string
  const expectedCheckDigits = calculateCheckDigits(originalString);

  // Compare the expected check digits with the provided check digits
  return providedCheckDigits === expectedCheckDigits;
};
