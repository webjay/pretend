import { Platform } from 'react-native';
import AudioRecorder from 'audio-recorder-polyfill';

export default function polyfill() {
  if (Platform.OS === 'web') {
    window.MediaRecorder = AudioRecorder;
  }
}
