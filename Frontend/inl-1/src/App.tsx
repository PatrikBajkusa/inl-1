import "./App.css";
import LogOutBtn from "./components/LogOutBtn";
import LogInBtn from "./components/LogInBtn";
import Profile from "./components/Profile";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    const search = async () => {
      const response = await axios(
        `https://www.googleapis.com/customsearch/v1?key=${
          import.meta.env.VITE_GOOGLE_API_KEY
        }&cx=05d1c58acdbb94299&num=10&searchType=image&q=snus`
      );
      console.log(response.data);
    };
    search();
  }, []);

  return (
    <main className="column">
      <LogInBtn />
      <LogOutBtn />
      <Profile />
    </main>
  );
}

export default App;
