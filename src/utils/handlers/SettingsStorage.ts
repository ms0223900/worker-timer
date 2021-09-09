export interface WorkerTimerSettings {
  volume: number
  selectedAudio: string
}

const SettingsStorage = {
  LSKey: 'WORKER_TIMER_SETTINGS',
  
  setLSData(payload: Partial<WorkerTimerSettings>) {
    let originData = {
      ...payload
    };
    const origin = this.getLSData();
    if(origin) {
      originData = {
        ...origin,
        ...originData,
      };
    }
    localStorage.setItem(this.LSKey, JSON.stringify(originData));
  },

  getLSData(): WorkerTimerSettings | undefined {
    const data = localStorage.getItem(this.LSKey);
    if(!data) return undefined;
    return JSON.parse(data);
  }
};

export default SettingsStorage;