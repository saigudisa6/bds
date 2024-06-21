import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "./components/header/Header";
import MainPage from "./components/welcome/main";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header/>
      <MainPage/>
    </>
  );
}
