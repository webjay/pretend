import type { Audio } from 'expo-av';
import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AudioStudio from '@src/components/AudioStudio';
import SoundPlayer from '@src/components/SoundPlayer';

const styles = StyleSheet.create({
  safeAreaView: {
    flexGrow: 1,
  },
  containerSounds: {
    margin: 10,
  },
});

export default function HomeScreen() {
  const [sounds, setSounds] = useState<Audio.Sound[]>([]);
  const handleSound = useCallback((sound: Audio.Sound) => {
    setSounds((prevSounds) => [...prevSounds, sound]);
  }, []);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.containerSounds}>
        {sounds.map((sound) => (
          // eslint-disable-next-line no-underscore-dangle
          <SoundPlayer key={Number(sound._key)} sound={sound} />
        ))}
      </View>
      <AudioStudio handleSound={handleSound} />
    </SafeAreaView>
  );
}
