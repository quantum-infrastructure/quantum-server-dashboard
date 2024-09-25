export class FileValidator {
  constructor(private permittedTypes: string[]) {}

  public validateMime(mime: string) {
    return this.permittedTypes.indexOf(mime) >= 0;
  }
}
