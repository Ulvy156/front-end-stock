/**
 * Format phone number for display
 * Example: '+0823424' => '+855 23 43 24'
 */
export function formatPhoneDisplay(phone: string): string {
  if (!phone) return '';

  // Remove any non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, '');

  // Replace leading 0 with +855 if needed
  if (cleaned.startsWith('0')) {
    cleaned = '+855' + cleaned.slice(1);
  }

  // Insert spaces every 3 digits after country code
  const countryCode = '+855';
  const numberPart = cleaned.replace(countryCode, '');
  const chunks = numberPart.match(/.{1,3}/g) || [];
  return [countryCode, ...chunks].join(' ');
}
