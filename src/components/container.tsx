import { cn } from '@/lib/utils';

export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('container-py container', className)} {...props} />;
}
