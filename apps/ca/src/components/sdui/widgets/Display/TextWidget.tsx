import React from 'react';
import { Label } from 'ui-kit';

type Props = {
  text: string;
  variant?: 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'caption';
  journeyId: string;
};

export const TextWidget: React.FC<Props> = ({ text }) => {
  return <Label>{text}</Label>;
};
