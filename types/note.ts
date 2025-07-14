export interface Note {
  id: number,
  title: string,
  content: string,
  createdAt: string,    
  updatedAt: string,
  tag: Tags,
}

export interface NewNote {
  title: string
  content: string
  tag: Tags
}
export interface fetchNotesResponse {
  notes: Note[],
  totalPages: number,
}

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type ServerBoolResponse = {
  success: boolean
};

export type Tags = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo"