// import logo from './logo.svg';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const searchData = useRef(null);
  const [searchText, setSearchText] = useState("mountains");
  const [imageData, setImageData] = useState([]);
  const handleSearch = () => {
    setSearchText(searchData.current);
    searchData.current = '';
  };
  
  useEffect(() => {
    const params = {
      method: "flickr.photos.search",
      api_key: "832fee831bbfde0e8db22f3ccf240607",
      text: searchText,
      sort: "",
      per_page: 40,
      license: "4",
      extras: "owner_name,license",
      format: "json",
      nojsoncallback: 1

    }
    const parameters = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest/?${parameters}`
    axios.get(url).then((res) => {
      console.log(res.data);
      const arr = res.data.photos.photo.map((imgData) => {
        return fetchFlickrImageUrl(imgData, 'q')
      });
      setImageData(arr);
    }).catch(() => {

    })
  }, [searchText])

  const fetchFlickrImageUrl = (photo, size) => {
    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if (size) {
      url += `_${size}`;
    }
    url += '.jpg';
    return url;
  }
  return (
    <>
      <h1>Snapshot</h1>
      <section className='search-elements'>
        <input onChange={(e) => { searchData.current = e.target.value }} placeholder='Search...'></input>
        <button onClick={handleSearch} className='search-button'>Search</button>
        {/* <button onClick={() => { setSearchText(searchData.current) }} className='search-button'>Search</button> */}
        <section>
          <button onClick={() => { setSearchText("mountains") }}>Mountains</button>
          <button onClick={() => { setSearchText("beaches") }}>Beaches</button>
          <button onClick={() => { setSearchText("birds") }}>Birds</button>
          <button onClick={() => { setSearchText("food") }}>Food</button>
        </section>
      </section>
      <h2>{searchText ? searchText : "Mountains"}</h2>
      <section className='image-container'>

        {imageData.map((imageurl, key) => {
          return (
            <article className='images'>
              <img src={imageurl} key={key} alt='images'/>
            </article>
          )

        })}

      </section>
    </>
  );
}

export default App;

