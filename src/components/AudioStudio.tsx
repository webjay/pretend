import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { AnimatedFAB } from 'react-native-paper';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 40,
    right: 40,
  },
});

type Props = {
  handleSound: (sound: Audio.Sound) => void;
};

export default function AudioStudio({ handleSound }: Props) {
  const [recording, setRecording] = useState<Audio.Recording>();

  const recordingStart = useCallback(async () => {
    const permissionResponse = await Audio.requestPermissionsAsync();
    if (permissionResponse?.status !== 'granted') return;
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    const audioRecording = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY,
    );
    if (!audioRecording?.recording) return;
    setRecording(audioRecording.recording);
  }, []);

  const recordingStop = useCallback(async () => {
    if (!recording) return;
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    if (uri === null) return;
    const soundRecording = await Audio.Sound.createAsync({ uri });
    handleSound(soundRecording.sound);
    setRecording(undefined);
  }, [handleSound, recording]);

  return (
    <AnimatedFAB
      icon={recording ? 'stop' : 'record'}
      label="Record sound"
      extended={false}
      onPress={recording ? recordingStop : recordingStart}
      style={styles.fab}
    />
  );
}
