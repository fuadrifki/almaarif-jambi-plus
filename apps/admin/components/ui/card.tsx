import { ComponentProps } from 'react';

import { Surface } from './surface';

export type CardProps = ComponentProps<typeof Surface>;

export function Card(props: CardProps) {
  return <Surface {...props} />;
}
