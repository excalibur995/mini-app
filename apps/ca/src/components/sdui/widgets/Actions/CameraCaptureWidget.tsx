import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { Button } from 'ui-kit';
import { useJourneyStore } from '../../../../store/useJourneyStore';
import {
  NavigateActionPayload,
  ScreenAction,
  SduiBinding,
} from '../../../../types/screen';

type Props = {
  mode: 'document' | 'selfie' | 'barcode';
  overlayShape: 'rectangle' | 'oval';
  overlayAspect: number;
  overlayHint: string;
  binding: SduiBinding;
  onComplete: { action: ScreenAction };
  journeyId: string;
  onNavigate: (payload: NavigateActionPayload) => void;
};

export const CameraCaptureWidget: React.FC<Props> = ({
  mode,
  binding,
  onComplete,
  journeyId,
  onNavigate,
  overlayHint,
}) => {
  const updateSession = useJourneyStore(state => state.updateSession);
  const session = useJourneyStore(state => state.getSession(journeyId));

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice(mode === 'selfie' ? 'front' : 'back');
  const cameraRef = useRef<Camera>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const handleCapture = async () => {
    if (!cameraRef.current || isCapturing) return;

    setIsCapturing(true);
    try {
      const photo = await cameraRef.current.takePhoto({
        enableShutterSound: true,
      });

      // Saving as local file URI for performance, avoiding massive base64 in MMKV
      const uri = `file://${photo.path}`;

      updateSession(journeyId, {
        journeyState: {
          ...session?.journeyState,
          [binding.path]: uri,
        },
      });

      if (onComplete?.action?.type === 'navigate') {
        onNavigate(onComplete.action.payload as NavigateActionPayload);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsCapturing(false);
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.cameraPlaceholder}>
        <Text style={styles.hintText}>Camera Permission Required</Text>
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.container}>
        <View style={styles.cameraPlaceholder}>
          <Text style={styles.hintText}>No Camera Found</Text>
        </View>
        <Button
          title={'Next'}
          onPress={() => {
            if (onComplete?.action?.type === 'navigate') {
              onNavigate(onComplete.action.payload as NavigateActionPayload);
            }
          }}
          variant="primary"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrapper}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          ref={cameraRef}
          photo={true}
        />
        <View style={styles.overlay}>
          <Text style={styles.hintText}>{overlayHint || `Scan ${mode}`}</Text>
        </View>
      </View>
      <Button
        title={isCapturing ? 'Capturing...' : 'Capture Photo'}
        onPress={() => {
          if (!isCapturing) handleCapture();
        }}
        variant="primary"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  cameraPlaceholder: {
    height: 300,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
  },
  cameraWrapper: {
    height: 400,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  hintText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
