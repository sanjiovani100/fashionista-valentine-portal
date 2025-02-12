import { cx } from '@/lib/utils';
import { theme } from '@/styles/theme';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'alternate' | 'highlight';
  spacing?: 'normal' | 'compact' | 'wide';
  containerWidth?: 'full' | 'content';
  children: React.ReactNode;
}

export const Section = ({
  variant = 'default',
  spacing = 'normal',
  containerWidth = 'content',
  className,
  children,
  ...props
}: SectionProps) => {
  return (
    <section
      className={cx(
        'w-full relative',
        {
          'bg-black/20': variant === 'alternate',
          'bg-gradient-to-b from-fashion-pink/10 to-transparent': variant === 'highlight',
          'py-24': spacing === 'normal',
          'py-12': spacing === 'compact',
          'py-32': spacing === 'wide'
        },
        className
      )}
      {...props}
    >
      <div
        className={cx(
          'mx-auto px-5 md:px-10',
          {
            'max-w-[1440px]': containerWidth === 'full',
            'max-w-[1280px]': containerWidth === 'content'
          }
        )}
      >
        {children}
      </div>
    </section>
  );
}; 


