import { Metadata } from "next";
import css from "./Profile.module.css"

export const metadata: Metadata = {
  title: "Profile",
  description: "Your own profile page",
  openGraph: {
    title: "Profile",
    description: "Your own profile page", 
    url: "https://localhost:3000/profile",
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

const Notes = () => {
    return (<main className={css.mainContent}>
    <div className={css.profileCard}>
        <div className={css.header}>
         <h1 className={css.formTitle}>Profile Page</h1>
         <a className={css.editProfileButton}>
           Edit Profile
         </a>
       </div>
       <div className={css.avatarWrapper}>
        <img
          src="Avatar"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
      </div>
      <div className={css.profileInfo}>
        <p>
          Username: your_username
        </p>
        <p>
          Email: your_email@example.com
        </p>
      </div>
    </div>
  </main>)
  ;
  };
  
export default Notes;
  