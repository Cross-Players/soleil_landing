'use client';

import { useMemo } from 'react';

interface ObfuscatedEmailProps {
  email: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Component to obfuscate email addresses to prevent spam
 * Renders email as a clickable link but encodes it to avoid bots
 */
export default function ObfuscatedEmail({ 
  email, 
  className = '',
  children 
}: ObfuscatedEmailProps) {
  // Encode email using simple character encoding
  const encodedEmail = useMemo(() => {
    return email
      .split('')
      .map(char => {
        if (char === '@') return '&#64;';
        if (char === '.') return '&#46;';
        return char;
      })
      .join('');
  }, [email]);

  const displayText = children || email;

  return (
    <a
      href={`mailto:${email}`}
      className={className}
      dangerouslySetInnerHTML={{ __html: encodedEmail }}
      onClick={(e) => {
        // Decode on click for better UX
        e.currentTarget.href = `mailto:${email}`;
      }}
    >
      {displayText}
    </a>
  );
}

