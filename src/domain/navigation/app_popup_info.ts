import {VoidCallback} from 'shared/shared';

export class AppPopupInfo {
  private constructor(
    public type: 'confirmDialog' | 'errorWithRetryDialog',
    public message: string = '',
    public onPressed?: VoidCallback,
    public onCancel?: VoidCallback,
    public onRetryPressed?: VoidCallback,
  ) {}

  static confirmDialog({
    message,
    onPressed,
    onCancel,
  }: {
    message: string;
    onPressed?: VoidCallback;
    onCancel?: VoidCallback;
  }): AppPopupInfo {
    return new AppPopupInfo('confirmDialog', message, onPressed, onCancel);
  }

  static errorWithRetryDialog({
    message,
    onRetryPressed,
    onCancel,
  }: {
    message: string;
    onRetryPressed?: VoidCallback;
    onCancel?: VoidCallback;
  }): AppPopupInfo {
    return new AppPopupInfo('errorWithRetryDialog', message, undefined, onCancel, onRetryPressed);
  }

  get toString(): string {
    return `AppPopupInfo: type:${this.type}, message:${this.message}, onPressed:${JSON.stringify(
      this.onPressed,
    )}, onCacel:${JSON.stringify(this.onCancel)}, onRetry:${JSON.stringify(this.onRetryPressed)}`;
  }
}

// Usage examples:
// const confirmDialog = AppPopupInfo.confirmDialog('Are you sure?', {
//   onPressed: () => console.log('Confirmed'),
//   onCancel: () => console.log('Cancelled'),
// });

// const errorDialog = AppPopupInfo.errorWithRetryDialog('An error occurred', {
//   onRetryPressed: () => console.log('Retry'),
//   onCancel: () => console.log('Cancelled'),
// });
