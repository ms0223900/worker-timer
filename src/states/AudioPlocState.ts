import { AUDIO_PATH } from "config";
import PlocState from "./PlocState";

export type AudioNameType = 
  'maracaDance' |
  'clearQuiz'|
  'clearStage'|
  'yahaha'|
  'heyListen'

const AUDIO_NAME_URL_LIST: SingleAudioNameUrl[] = [
  { name: 'maracaDance', url: AUDIO_PATH + '/maracadance.mp3'},
  { name: 'clearQuiz', url: AUDIO_PATH + '/clear-quiz.mp3'},
  { name: 'clearStage', url: AUDIO_PATH + '/clear-stage.mp3'},
  { name: 'yahaha', url: AUDIO_PATH + '/yahaha.mp3'},
  { name: 'heyListen', url: AUDIO_PATH + '/zelda-navi-listen.mp3'},
];

const defaultPlayTimeout = 1500;

export interface SingleAudioNameUrl {
  name: AudioNameType
  url: string
}

export interface AudioState {
  repeatTimes?: number
  playTimeout?: number // ms
  volume: number
  selectedAudio: AudioNameType
  audioNameUrlList: SingleAudioNameUrl[]
}

export const defaultAudioState: AudioState = {
  volume: 0.4,
  selectedAudio: AUDIO_NAME_URL_LIST[0].name,
  audioNameUrlList: AUDIO_NAME_URL_LIST
};

class AudioPlocState extends PlocState<AudioState> {
  audio: HTMLAudioElement

  constructor(initS?: Partial<AudioState>) {
    super({
      ...defaultAudioState,
      ...initS,
    });
    this.audio = new Audio(this.getSelectedAudio());
    this.audio.volume = this.state.volume;
  }

  private getAudioUrl = (name: string) => {
    return this.state.audioNameUrlList.find(a => a.name === name);
  }
  private getSelectedAudio = () => {
    return this.getAudioUrl(this.state.selectedAudio)?.url;
  }

  handleAsyncPlay = () => {
    this.audio.play();
    return new Promise(res => {
      this.audio.addEventListener('ended', () => {
        // console.log('audio ended');
        res('ended');
      });
    });
  }

  handlePlay = () => {
    // this.audio.play();
    this.handleRepeatPlay();
    // setTimeout(() => {
    //   this.handlePause();
    // }, this.state.playTimeout || defaultPlayTimeout);
  }

  handleRepeatPlay = () => {
    (async () => {
      const repeatTimes = this.state.repeatTimes || 3;
      for await (const iterator of Array(repeatTimes)) {
        await this.handleAsyncPlay();
      }
    })();
  }

  handlePause = () => {
    this.audio.pause();
  }
}

export default AudioPlocState;