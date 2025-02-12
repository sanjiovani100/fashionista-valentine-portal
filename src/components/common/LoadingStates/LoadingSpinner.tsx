import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'white';
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4',
} as const;

const variantClasses = {
  primary: 'border-blue-600 border-t-transparent',
  secondary: 'border-gray-600 border-t-transparent',
  white: 'border-white border-t-transparent',
} as const;

export function LoadingSpinner({
  size = 'md',
  variant = 'primary',
  className = '',
}: LoadingSpinnerProps) {
  return (
    <div
      className={`
        inline-block rounded-full animate-spin
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      role="status"
      aria-label="Loading"
    />
  );
}

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  spinnerSize?: LoadingSpinnerProps['size'];
  spinnerVariant?: LoadingSpinnerProps['variant'];
  className?: string;
}

export function LoadingOverlay({
  isLoading,
  children,
  spinnerSize = 'lg',
  spinnerVariant = 'white',
  className = '',
}: LoadingOverlayProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
          role="alert"
          aria-busy="true"
        >
          <LoadingSpinner size={spinnerSize} variant={spinnerVariant} />
        </div>
      )}
    </div>
  );
}

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  spinnerSize?: LoadingSpinnerProps['size'];
  spinnerVariant?: LoadingSpinnerProps['variant'];
  loadingText?: string;
}

export function LoadingButton({
  isLoading = false,
  spinnerSize = 'sm',
  spinnerVariant = 'white',
  loadingText,
  children,
  disabled,
  className = '',
  ...props
}: LoadingButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={`
        relative inline-flex items-center justify-center
        ${isLoading ? 'cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25">
          <LoadingSpinner size={spinnerSize} variant={spinnerVariant} />
        </span>
      )}
      <span className={isLoading ? 'invisible' : ''}>
        {loadingText && isLoading ? loadingText : children}
      </span>
    </button>
  );
}

interface LoadingPageProps {
  message?: string;
}

export function LoadingPage({ message = 'Loading...' }: LoadingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <LoadingSpinner size="lg" />
      {message && (
        <p className="mt-4 text-lg text-gray-600 animate-pulse">{message}</p>
      )}
    </div>
  );
} 


