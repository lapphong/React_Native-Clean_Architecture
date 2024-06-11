export class DebounceUtils {
  private milliseconds: number;
  private timer: NodeJS.Timeout | undefined;
  private static instance: DebounceUtils | null = null;

  private constructor(milliseconds: number = 500) {
    this.milliseconds = milliseconds;
    this.timer = undefined;
  }

  static getInstance(milliseconds: number = 500): DebounceUtils {
    if (!DebounceUtils.instance) {
      DebounceUtils.instance = new DebounceUtils(milliseconds);
    }
    return DebounceUtils.instance;
  }

  run(action: () => void | Promise<void>) {
    if (this.timer !== undefined) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(async () => {
      await action();
      this.timer = undefined;
    }, this.milliseconds);
  }
}
