import React from 'react';
import { Text, View } from 'react-native';
import { KSpacer } from './KSpacer';

export function KInputError({ message }: { message: string }) {
  return (
    <View>
      <KSpacer height={8} />
      <Text style={{ color: 'red' }}>{message}</Text>
    </View>
  );
}
