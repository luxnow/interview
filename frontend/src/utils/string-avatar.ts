export default function stringToAvatarChars(name: string): string {
  if (name.length < 2) {
    return name && name.toUpperCase();
  }

  return `${name.charAt(0).toUpperCase()}${name.charAt(name.length - 1).toUpperCase()}`
}
