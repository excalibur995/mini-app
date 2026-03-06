import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { theme } from 'ui-kit';

export interface StrapiMedia {
  id: number;
  url: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  alternativeText?: string;
}

interface Props {
  text: string;
  icon: StrapiMedia;
}

const STRAPI_BASE_URL = 'http://localhost:1337'; // Normally would come from env config

const getMediaUrl = (url: string) => {
  if (url.startsWith('http')) return url;
  return `${STRAPI_BASE_URL}${url}`;
};

export const IconTextWidget: React.FC<Props> = ({ text, icon }) => {
  if (!text) {
    return null;
  }

  const iconUrl = icon ? getMediaUrl(icon.url) : null;
  const isSvg = icon?.ext === '.svg' || icon?.mime?.includes('svg');

  return (
    <View style={styles.container}>
      {iconUrl && (
        <View style={styles.iconContainer}>
          {isSvg ? (
            <SvgUri width="24" height="24" uri={iconUrl} />
          ) : (
            <Image
              source={{ uri: iconUrl }}
              style={styles.rasterIcon}
              resizeMode="contain"
            />
          )}
        </View>
      )}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: theme.spacing.sm,
    gap: theme.spacing.md,
  },
  iconContainer: {
    marginTop: 2, // Minor optical tweak to align icon with first line of text
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rasterIcon: {
    width: '100%',
    height: '100%',
  },
  text: {
    flex: 1,
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.text,
    lineHeight: 24,
  },
});
