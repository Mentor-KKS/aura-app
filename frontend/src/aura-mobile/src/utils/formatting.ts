/**
 * Deutsche Formatierungsfunktionen für Zahlen und Währungen
 */

/**
 * Formatiert einen Betrag als deutsche Währung (€)
 * Beispiel: 1234.56 → "1.234,56 €"
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

/**
 * Formatiert ein Datum im deutschen Format
 * Beispiel: 2025-10-22 → "22.10.2025"
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

/**
 * Konvertiert deutsche Dezimalzahl-Eingabe (mit Komma) zu Number
 * Beispiel: "12,99" → 12.99
 * Beispiel: "1.234,56" → 1234.56
 */
export const parseGermanDecimal = (value: string): number => {
  if (!value) return 0;

  // Entferne Tausendertrennzeichen (Punkte)
  let cleaned = value.replace(/\./g, '');

  // Ersetze Komma durch Punkt
  cleaned = cleaned.replace(',', '.');

  return parseFloat(cleaned) || 0;
};

/**
 * Formatiert eine Zahl für deutsche Eingabe
 * Beispiel: 12.99 → "12,99"
 * Beispiel: 1234.56 → "1.234,56"
 */
export const formatGermanDecimal = (value: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

/**
 * Validiert deutsche Dezimalzahl-Eingabe
 * Erlaubt: 12,99 oder 1.234,56
 */
export const isValidGermanDecimal = (value: string): boolean => {
  // Regex für deutsches Zahlenformat
  // Erlaubt: 12,99 oder 1.234,56 oder 1234,56
  const germanDecimalRegex = /^(\d{1,3}(\.\d{3})*|\d+)(,\d{1,2})?$/;
  return germanDecimalRegex.test(value);
};

/**
 * Formatiert Billing Cycle Label auf Deutsch
 */
export const getBillingCycleLabel = (cycle: string): string => {
  const labels: Record<string, string> = {
    monthly: 'Monatlich',
    yearly: 'Jährlich',
    quarterly: 'Quartalsweise',
    weekly: 'Wöchentlich',
  };
  return labels[cycle] || cycle;
};

/**
 * Formatiert Status Label auf Deutsch
 */
export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    active: 'Aktiv',
    cancelled: 'Gekündigt',
    paused: 'Pausiert',
    expired: 'Abgelaufen',
  };
  return labels[status] || status;
};

/**
 * Berechnet monatliche Kosten basierend auf Billing Cycle
 */
export const calculateMonthlyCost = (costPerCycle: number, billingCycle: string): number => {
  switch (billingCycle) {
    case 'monthly':
      return costPerCycle;
    case 'yearly':
      return costPerCycle / 12;
    case 'quarterly':
      return costPerCycle / 3;
    case 'weekly':
      return costPerCycle * 4;
    default:
      return 0;
  }
};
