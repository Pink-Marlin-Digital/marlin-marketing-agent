export enum SocialChannel {
  FACEBOOK = 'FACEBOOK',
  INSTAGRAM = 'INSTAGRAM',
}

export function parseChannels(input: string[] | undefined, defaults: string[]): SocialChannel[] {
  const source = (input && input.length ? input : defaults).map((c) => c.toUpperCase());
  const valid = new Set(Object.values(SocialChannel));
  return source.filter((c): c is SocialChannel => valid.has(c as SocialChannel));
}
