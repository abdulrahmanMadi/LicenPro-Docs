export interface DocTopic {
  title: string;
  /** Optional subtitle (HTML allowed — static trusted strings only) */
  lead?: string;
  /** Main HTML (trusted static strings from repo) */
  body: string;
}
