function checkСountBrackets(str: string): boolean {
  let countBracket = 0;
  const bracketTypeOpen = '{';
  const bracketTypeClose = '}';
  str.split('').forEach((letter) => {
    if (letter === bracketTypeOpen) {
      countBracket += 1;
    }
    if (letter === bracketTypeClose) {
      countBracket -= 1;
    }
  });

  return countBracket === 0;
}

export default function validateGraphQLRequest(query: string | undefined): boolean {
  if (!query) return false;
  if (!query.match(/query/i)) {
    return false;
  }

  if (!checkСountBrackets(query)) {
    return false;
  }

  return true;
}
