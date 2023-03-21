import { useState } from 'react'
import Veniveci from './Components/Veni-veci';
import Banlist from './Components/Ban-list';
import Gallery from './Components/Gallery';
import './App.css'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [currentImage, setCurrentImage] = useState(null);
  const [currentName, setCurrentName] = useState("")
  const [currentBredFor, setCurrentBredFor] = useState("")
  const [currentLifespan, setCurrentLifespan] = useState("")
  const [currentBreedGroup, setCurrentBreedGroup] = useState("")
  const [bannedAttribute, setBannedAttribute] = useState([])
  const [prevImages, setPrevImages] = useState([]);

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    console.log(json)
    if (json[0].url == null){
      alert("Oops! Something went wrong with that query, let's try again!")
      }
    else if ((bannedAttribute.includes(json[0].breeds[0].name)) || 
    (bannedAttribute.includes(json[0].breeds[0].bred_for)) ||
    (bannedAttribute.includes(json[0].breeds[0].life_span)) ||
    (bannedAttribute.includes(json[0].breeds[0].breed_group))) {
      makeQuery()
    }
    else {
      setCurrentImage(json[0].url);
      setCurrentName(json[0].breeds[0].name)
      setCurrentBredFor(json[0].breeds[0].bred_for)
      setCurrentLifespan(json[0].breeds[0].life_span)
      setCurrentBreedGroup(json[0].breeds[0].breed_group)
      setPrevImages((prevImages) => [...prevImages, json[0].url]);
    }
  }

  const makeQuery = () => {
    let query = `https://api.thedogapi.com/v1/images/search?api_key=${ACCESS_KEY}&include_breeds=true`
    callAPI(query).catch(console.error);
  }
  
  const submitForm = () => {
    makeQuery()
  }

  const banName = () => {
    setBannedAttribute((bannedAttribute) => [...bannedAttribute, currentName])
  }

  const banBredFor = () => {
    setBannedAttribute((bannedAttribute) => [...bannedAttribute, currentBredFor])
  }

  const banLifespan = () => {
    setBannedAttribute((bannedAttribute) => [...bannedAttribute, currentLifespan])
  }

  const banBreedGroup = () => {
    setBannedAttribute((bannedAttribute) => [...bannedAttribute, currentBreedGroup])
  }

  return (
    <div>
      <div className='cat-page'>
        <h1>We love Dogs</h1>
        <p>Discover cool dogs that will make your day</p>
        <div className='list-page'>
          {currentImage ? (
            <div>
              <input className='attr-btn' type="button" onClick={banName} value={currentName}/>
              <input className='attr-btn' type="button" onClick={banBredFor} value={currentBredFor}/>
              <input className='attr-btn' type="button" onClick={banLifespan} value={currentLifespan}/>
              <input className='attr-btn' type="button" onClick={banBreedGroup} value={currentBreedGroup}/>
            </div>
          ) : (
            <div> </div>
          )}
          {currentImage ? (
            <img
              className="screenshot"
              src={currentImage} height="300px" width="300px"
              alt="Screenshot returned"
            />
          ) : (
            <div> </div>
          )}
        </div>
        <Veniveci onSubmit={submitForm}/>
      </div>
      <div className="banned-container">
        <Banlist bannedAttribute={bannedAttribute} />
      </div>
      <div className='history'>
        <Gallery images={prevImages} name={currentName} breed={currentBreedGroup}/>
      </div>
    </div>
  )
}

export default App
