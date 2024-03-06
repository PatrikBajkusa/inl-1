import "./App.css";
import LogOutBtn from "./components/LogOutBtn";
import LogInBtn from "./components/LogInBtn";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { ShowSavedPics } from "./components/ShowSavedPics";
import Profile from "./components/Profile";

function App() {
  const [userInputValue, setUserInputValue] = useState("");
  const [items, setItems] = useState();
  const { isAuthenticated } = useAuth0();
  const [showSaved, setShowSaved] = useState(false);
  useEffect(() => {}, []);

  const handleClick = () => {
    const search = async() => {
      const response = await axios(
        `https://www.googleapis.com/customsearch/v1?key=&cx=05d1c58acdbb94299&num=10&searchType=image&q=${userInputValue}`
      );
      console.log(response.data.items);
      setItems(response.data.items);
    };
    search();
  };
  const home = () => {
    setShowSaved(false);
  };
  return (
    <>
      <header className="header">
        {!isAuthenticated ? (
          <LogInBtn />
        ) : (
          <div className="menu">
            <a onClick={home}>
              <p>Home</p>
            </a>
            <ShowSavedPics stateChanger={setShowSaved} />
            <LogOutBtn />
            <Profile />
          </div>
        )}
      </header>
      {!showSaved && (
        <main className="column">
          {isAuthenticated && (
            <form
              onSubmit={(e: FormEvent) => {
                e.preventDefault();
              }}
            >
              <input
                type="text"
                value={userInputValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setUserInputValue(e.target.value);
                }}
                className="input"
                placeholder="Enter a searchword"
              />
              <button onClick={handleClick}>Search</button>
            </form>
          )}

          <ul>
            {items.map((pic, i) => {
              return (
                <a className="atagg" >
                  <li key={i}>
                    <img src={pic.image.thumbnailLink} />
                  </li>
                </a>
              );
            })}
          </ul>
          <button>Spara bild</button>
        </main>
      )}
      {showSaved && <div>Hello world</div>}
    </>
  );
}

export default App;
