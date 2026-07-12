export interface Chapter {
  id: string;
  title: string;
  content: string[]; // List of paragraphs
  illustration?: string; // Optional illustration tag or image description
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  coverColor: string;     // Tailwind color class for book skin
  coverPattern: string;   // Tailwind color class for gold/silver ornaments
  textColor: string;      // Tailwind color for spine text
  iconName: string;       // Name of the Lucide icon to display on the cover
  chapters: Chapter[];
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  text: string;
}
