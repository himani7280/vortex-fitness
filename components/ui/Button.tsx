import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

type ButtonVariant = 'primary' | 'video';

interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const Button = ({ variant = 'primary', children, href, onClick, className = '' }: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300";
  
  let variantClasses = "";
  if (variant === 'primary') {
    variantClasses = "bg-[#f05a22] hover:bg-[#d4501a] text-white px-7 py-3 rounded text-[15px]";
  } else if (variant === 'video') {
    variantClasses = "text-white hover:text-[#f05a22] gap-3 text-[15px]";
  }

  const content = (
    <>
      {variant === 'video' && (
        <span className="flex items-center justify-center w-12 h-12 rounded-full border border-white group-hover:border-[#f05a22] transition-colors">
          <Play className="w-5 h-5 fill-current ml-1" />
        </span>
      )}
      {children}
      {variant === 'primary' && <ArrowRight className="w-4 h-4 ml-2" />}
    </>
  );

  const finalClasses = `${baseClasses} ${variantClasses} group ${className}`;

  if (href) {
    return (
      <Link href={href} className={finalClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={finalClasses}>
      {content}
    </button>
  );
};

export default Button;
