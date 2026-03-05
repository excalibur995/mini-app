import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useJourneyStore } from '../../../../store/useJourneyStore';

type Props = {
  source: { path: string; scope: string };
  altText?: string;
  journeyId: string;
};

export const ImagePreviewWidget: React.FC<Props> = ({
  source,
  altText,
  journeyId,
}) => {
  const session = useJourneyStore(state => state.getSession(journeyId));
  const base64Data = session?.journeyState[source.path] as string | undefined;

  if (!base64Data) return null;

  const uri =
    base64Data.startsWith('data:image') || base64Data.startsWith('file://')
      ? base64Data
      : `data:image/jpeg;base64,${base64Data}`;

  return (
    <Image
      source={{ uri }}
      accessibilityLabel={altText}
      style={styles.image}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
});
