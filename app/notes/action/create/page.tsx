import { Metadata } from "next";
import NoteForm from '@/components/NoteForm/NoteForm';
import css from "./CreateNote.module.css"

export const metadata: Metadata = {
    title: "Create note",
    description: "Creating new note",
    openGraph: {
      title: "Create note",
      description: "Creating new note", 
      url: "https://08-zustand-eight-cyan.vercel.app/notes/action/create",
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
};
  
const CreateNote = () => {
  return (<main className={css.main}>
    <div className={css.container}>
      <h1 className={css.title}>Create note</h1>
      <NoteForm />
    </div>
  </main>
  )
};

export default CreateNote