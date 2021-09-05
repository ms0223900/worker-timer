const self = this;
class WorkerSideTickWorker {
  constructor() {
    this.timer = undefined;
  }

  registerEvents() {
    self.addEventListener("message", (e) => {
      switch (e.data) {
        case "start":
          if (!this.timer) {
            this.timer = setInterval(() => {
              // console.log("tick-from-worker");
              self.postMessage("tick-from-worker");
            }, 1000);
          }
          break;

        case "stop":
          this.timer && clearInterval(this.timer);
          this.timer = undefined;
          break;

        default:
          break;
      }
    });
  }
}

const worker = new WorkerSideTickWorker();
worker.registerEvents();
