export default function humanReadableErrorFirebase(err: Error): string {
  switch (err.message) {
    case 'Firebase: Error (auth/email-already-in-use).':
      return 'emailAlreadyInUse';
    case 'Firebase: Error (auth/wrong-password).':
      return 'IncorrectPassword';
    case 'Firebase: Error (auth/user-not-found).':
      return 'userNotFound';
    default:
      return err.message;
  }
}
