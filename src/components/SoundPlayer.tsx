import React, { useState, useCallback, useEffect } from 'react';
import { Audio } from 'expo-av';
import { IconButton } from 'react-native-paper';

type Props = {
  sound: Audio.Sound;
  autoplay?: boolean;
};

function SoundPlayer({ sound, autoplay = false }: Props) {
  const [isPlaying, setIsPlaying] = useState<boolean>();

  const soundPlay = useCallback(() => {
    if (!sound) return;
    sound.replayAsync();
    setIsPlaying(true);
  }, [sound]);

  const soundStop = useCallback(() => {
    if (!sound) return;
    sound.stopAsync();
    setIsPlaying(false);
  }, [sound]);

  useEffect(() => {
    if (autoplay) soundPlay();
  }, [autoplay, soundPlay]);

  useEffect(() => {
    if (!sound) return;
    sound.setOnPlaybackStatusUpdate((status) => {
      // @ts-ignore
      if (status.didJustFinish) setIsPlaying(false);
    });
  }, [sound]);

  return (
    <IconButton
      disabled={!sound}
      icon={isPlaying ? 'stop' : 'play'}
      onPress={isPlaying ? soundStop : soundPlay}
    />
  );
}

SoundPlayer.defaultProps = {
  autoplay: false,
};

export default SoundPlayer;
