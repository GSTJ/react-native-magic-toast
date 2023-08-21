import React from 'react';
import { Path, Svg, SvgProps } from 'react-native-svg';

export const SuccessIcon = (props: Partial<SvgProps>) => (
  <Svg viewBox="0 0 256 256" {...props}>
    <Path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm45.66 85.66-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32Z" />
  </Svg>
);
