import "./App.css";
import LogOutBtn from "./components/LogOutBtn";
import LogInBtn from "./components/LogInBtn";

import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import Profile from "./components/Profile";
import { IPicture } from "./models/IPicture";
import { IShowImg } from "./models/IShowImg";

function App() {
  const [userInputValue, setUserInputValue] = useState("");
  const [items, setItems] = useState<IPicture[]>([]);
  const { isAuthenticated } = useAuth0();
  const [showSaved, setShowSaved] = useState(false);
  const [formattedTime, setFormattedTime] = useState();
  const [showSearchTime, setShowSearchTime] = useState(false);
  const [spelling, setSpelling] = useState("");
  const [showspelling, setShowSpelling] = useState(false);
  const { user } = useAuth0();
  const [showSavedImages, setShowSavedImages] = useState<IShowImg[]>([]);

  const handleClickCorrectedSpelling = () => {
    setUserInputValue(spelling);
  };

  const handleClick = () => {
    const search = async () => {
      const response = await axios(
        `https://www.googleapis.com/customsearch/v1?key=AIzaSyAS9NiW_c-CsQ1t1qc7q8kieuwT9TV8zuY&cx=05d1c58acdbb94299&num=10&searchType=image&q=${userInputValue}`
      );

      console.log(response.data);
      setItems(response.data.items);
      setFormattedTime(response.data.searchInformation.searchTime);
      setShowSearchTime(true);
      response.data.spelling &&
        setSpelling(response.data.spelling.correctedQuery);
      setShowSpelling(true);
      !response.data.spelling && setShowSpelling(false);
    };

    search();
  };
  const home = () => {
    setShowSaved(false);
    console.log(user?.sub);
  };
  const lookAtSavedImages = () => {
    const showFavouritePics = async () => {
      const response = await axios.get(
        `http://localhost:3000/users/${user?.sub}`
      );
      console.log(response.data);
      setShowSavedImages(response.data);
    };
    setShowSaved(true);
    showFavouritePics();
  };
  const handlePost = (pic: any) => {
    const sendImg = async () => {
      const response = await axios.post(
        `http://localhost:3000/users/${user?.sub}`,
        {
          userId: user?.sub,
          favoritePics: {
            title: pic.title,
            byteSize: pic.image.byteSize,
            imageUrl: pic.image.thumbnailLink,
          },
        }
      );
      console.log(response);
    };
    sendImg();
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
            <a onClick={lookAtSavedImages}>
              <p>Saved Images</p>
            </a>
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
          {showSearchTime && (
            <div>The search took: {formattedTime} seconds</div>
          )}
          {showspelling && (
            <div>
              Did you mean?:
              <a onClick={handleClickCorrectedSpelling}> {spelling}</a>
            </div>
          )}

          <ul>
            {items.map((pic, i) => {
              return (
                <a key={i} className="atagg" onClick={() => handlePost(pic)}>
                  <li>
                    <img src={pic.image.thumbnailLink} alt={`Thumbnail${i}`} />
                  </li>
                </a>
              );
            })}
          </ul>
        </main>
      )}
      {showSaved && (
        <ul>
          {showSavedImages.map((pic, i) => {
            return (
              <li key={i}>
                <img src={pic.favoritePics.imageUrl} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default App;
