import React, { useState } from 'react';
import { Input } from './Input';
import { parseGermanDecimal, isValidGermanDecimal } from '../../utils/formatting';

interface DecimalInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  onValueChange?: (value: number) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

/**
 * Eingabefeld für deutsche Dezimalzahlen (mit Komma)
 * Beispiel: 12,99 oder 1.234,56
 */
export const DecimalInput: React.FC<DecimalInputProps> = ({
  label,
  value,
  onChangeText,
  onValueChange,
  error,
  placeholder = '0,00',
  required = false,
}) => {
  const [localError, setLocalError] = useState<string | undefined>();

  const handleTextChange = (text: string) => {
    // Erlaube leere Eingabe
    if (text === '') {
      onChangeText('');
      onValueChange?.(0);
      setLocalError(undefined);
      return;
    }

    // Erlaube Eingabe während des Tippens
    // Akzeptiere: Ziffern, Komma, Punkt
    const allowedChars = /^[\d.,]*$/;
    if (!allowedChars.test(text)) {
      return;
    }

    onChangeText(text);

    // Validiere nur wenn vollständig eingegeben
    if (text.endsWith(',') || text.endsWith('.')) {
      // User tippt noch
      setLocalError(undefined);
      return;
    }

    // Validiere deutsche Dezimalzahl
    if (isValidGermanDecimal(text)) {
      const numericValue = parseGermanDecimal(text);
      onValueChange?.(numericValue);
      setLocalError(undefined);
    } else {
      setLocalError('Bitte deutsche Zahlenformat verwenden (z.B. 12,99 oder 1.234,56)');
    }
  };

  return (
    <Input
      label={label}
      value={value}
      onChangeText={handleTextChange}
      error={error || localError}
      placeholder={placeholder}
      keyboardType="decimal-pad"
      required={required}
    />
  );
};
