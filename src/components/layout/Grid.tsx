import { cx } from '@/lib/utils';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop: number;
  };
  gap?: {
    mobile?: number;
    tablet?: number;
    desktop: number;
  };
  children: React.ReactNode;
}

export const Grid = ({
  columns = { desktop: 12 },
  gap = { desktop: 6 },
  className,
  children,
  ...props
}: GridProps) => {
  const mobileColumns = columns.mobile || Math.min(1, columns.desktop);
  const tabletColumns = columns.tablet || Math.min(2, columns.desktop);
  
  const mobileGap = gap.mobile || Math.min(4, gap.desktop);
  const tabletGap = gap.tablet || Math.min(5, gap.desktop);

  return (
    <div
      className={cx(
        'grid',
        `grid-cols-${mobileColumns}`,
        `md:grid-cols-${tabletColumns}`,
        `lg:grid-cols-${columns.desktop}`,
        `gap-${mobileGap}`,
        `md:gap-${tabletGap}`,
        `lg:gap-${gap.desktop}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: {
    mobile?: number;
    tablet?: number;
    desktop: number;
  };
  children: React.ReactNode;
}

export const GridItem = ({
  span = { desktop: 1 },
  className,
  children,
  ...props
}: GridItemProps) => {
  const mobileSpan = span.mobile || Math.min(1, span.desktop);
  const tabletSpan = span.tablet || Math.min(2, span.desktop);

  return (
    <div
      className={cx(
        `col-span-${mobileSpan}`,
        `md:col-span-${tabletSpan}`,
        `lg:col-span-${span.desktop}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}; 


