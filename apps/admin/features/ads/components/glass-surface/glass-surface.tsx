import type { GlassSurfaceProps } from './glass-surface.types';

export function GlassSurface({ children, className, as: Component = 'div' }: GlassSurfaceProps) {
  return (
    <Component className={['ads-surface', className].filter(Boolean).join(' ')}>
      {children}
    </Component>
  );
}
