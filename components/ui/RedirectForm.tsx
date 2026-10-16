'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface RedirectFormProps {
  className?: string;
  redirectTo?: string;
  children: React.ReactNode;
}

/** Form that redirects to the thank-you page after a valid submit. */
const RedirectForm = ({ className, redirectTo = '/thank-you', children }: RedirectFormProps) => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(redirectTo);
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default RedirectForm;
