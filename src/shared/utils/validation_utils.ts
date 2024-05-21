export class ValidationUtils {
  private constructor() {}

  /// Check if a string is empty value.
  /// Return true if it is not empty.
  static isNotEmpty(value: string): boolean {
    return value.trim().length !== 0;
  }

  /// Check if a string is a valid email.
  /// Return true if it is valid.
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailRegex.test(email.trim());
  }

  /// Check if a string is a valid password.
  /// Return true if it is valid.
  static isValidPassword(password: string): boolean {
    const minimumPasswordLength = 6;
    const whitespaceRegex = /\s/;

    return password.length >= minimumPasswordLength && !whitespaceRegex.test(password);
  }

  /// Check if a string is valid phone number.
  /// Return true if it is valid.
  static isValidPhoneNumber(phoneNumber: string): boolean {
    const phoneNumberRegex = /^\+?[0-9]{10,11}$/;
    return phoneNumberRegex.test(phoneNumber.replace(/\s/g, ''));
  }

  /// Check if a string is a valid date time.
  /// Return true if it is valid.
  static isValidDateTime(dateTime: string): boolean {
    const dateTimeRegex =
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    return dateTimeRegex.test(dateTime);
  }

  /// Check if a string is alphanumeric.
  /// Return true if it is valid.
  static isAlphanumeric(text: string): boolean {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(text.trim());
  }

  /// Check if string is link
  /// Return true if it is valid
  static isLink(text: string): boolean {
    const urlRegex = /^(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-?=%.]+$/;
    return urlRegex.test(text);
  }
}
