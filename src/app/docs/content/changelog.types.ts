export interface ChangelogEntry {
  version: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  highlights: string[];
  changes: {
    category: 'added' | 'improved' | 'fixed' | 'security' | 'deprecated';
    items: string[];
  }[];
}

export type ChangelogCategory = ChangelogEntry['changes'][number]['category'];
