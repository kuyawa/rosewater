interface File extends Blob {
  readonly lastModified: number;
  /** @deprecated */
  readonly lastModifiedDate: Date;
  readonly name: string;
  readonly webkitRelativePath: string;
}

declare var File: {
  prototype: File;
  new (parts: (ArrayBuffer | ArrayBufferView | Blob | string)[], filename: string, properties?: FilePropertyBag): File;
}

