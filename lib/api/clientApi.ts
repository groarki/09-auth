import { EditUser, fetchNotesResponse, LoginRequest, NewNote, Note, RegisterRequest, ServerBoolResponse, User } from "@/types/note";
import nextServer from "./api";

export async function fetchNotes(searchText: string, page: number, tag?: string): Promise<fetchNotesResponse> {
    const res = await nextServer.get<fetchNotesResponse>("/notes", {
        params: {
            page,
            perPage: 12,
            ...(searchText && { search: searchText }),
            ...(tag && { tag }),
        }
    });
    return res.data
};

export const getSingleNote = async (id: string) => {
    const res = await nextServer.get<Note>(`/notes/${id}`);

    return res.data;
  };
  
  
export async function createNote(newNote: NewNote) {
    const res = await nextServer.post<Note>("/notes", newNote);
      return res.data
};
  
export async function deleteNote(id: string) {
    const res = await nextServer.delete<Note>(`/notes/${id}`);
     return res.data
};


export const register = async (data: RegisterRequest) => {
    const res = await nextServer.post<User>('/auth/register', data);
    return res.data;
};
  
export const login = async (data: LoginRequest) => {
    const res = await nextServer.post<User>('/auth/login', data);
    return res.data;
};
  
export const logOut = async () => {
    await nextServer.post<ServerBoolResponse>(`/auth/logout`)
};

export const checkSession = async () => {
    const { data } = await nextServer<ServerBoolResponse>(`/auth/session`)
    return data.success
};

export const getMe = async () => {
    const { data } = await nextServer<User>(`/users/me`)
    return data
};

export const editUser = async (user: EditUser): Promise<User> => {
  const response = await nextServer.patch<User>("/users/me", user);
  return response.data;
};