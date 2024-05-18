import React from 'react';
import { View } from 'react-native';

interface Props {
  height?: number;
  width?: number;
}

export function KSpacer({ height = 20, width = 20 }: Props) {
  return <View style={{ height, width }} />;
}
