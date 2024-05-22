export type Callback = () => void;

export class AppPopupInfo {
  private constructor(
    public type: 'confirmDialog' | 'errorWithRetryDialog',
    public message: string = '',
    public onPressed?: Callback,
    public onCancel?: Callback,
    public onRetryPressed?: Callback,
  ) {}

  static confirmDialog({
    message,
    onPressed,
    onCancel,
  }: {
    message: string;
    onPressed?: Callback;
    onCancel?: Callback;
  }): AppPopupInfo {
    return new AppPopupInfo('confirmDialog', message, onPressed, onCancel);
  }

  static errorWithRetryDialog({
    message,
    onRetryPressed,
    onCancel,
  }: {
    message: string;
    onRetryPressed?: Callback;
    onCancel?: Callback;
  }): AppPopupInfo {
    return new AppPopupInfo('errorWithRetryDialog', message, undefined, onCancel, onRetryPressed);
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
