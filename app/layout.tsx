
import "./globals.css";
import type { Metadata } from "next";
import 'highlight.js/styles/monokai-sublime.css';

import AuthContext from "@/libs/auth-context";

import LoginModal from "@/components/modals/login-modal";
import RegisterModal from "@/components/modals/registar-modal";
import AIModal from "@/components/modals/ai-modal";
import NewPostModal from "@/components/modals/new-post-modal";
import EditModal from "@/components/modals/edit-modal";
import CreateGroupModal from "@/components/modals/create-group-modal";
import NotificationDisplayModal from "@/components/modals/notification-display-modal";
import UserCardModal from "@/components/modals/user-cards-modal";
import GroupPostModal from "@/components/modals/group-post-modal";
import QuestionModal from "@/components/modals/question-modal";


export const metadata: Metadata = {
  title: "ScholarPal",
  description: "ScholarPal to make learning more interactive",
  creator: 'Mian Maaz Ullah Khan',
  authors: { name: 'Maaz Khan', url: 'http://mmaazkhan.vercel.app/' },
  icons: {
    icon: '/logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <LoginModal />
          <RegisterModal />
          <AIModal />
          <NewPostModal />
          <EditModal />
          <CreateGroupModal />
          <NotificationDisplayModal />
          <UserCardModal />
          <GroupPostModal />
          <QuestionModal />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
