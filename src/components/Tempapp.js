import React, {useEffect, useState} from "react";
import "./css/style.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";

const Tempapp = () => {
    const [searchHistory,setSearchHistory] = useState([]);
    const [unit,setUnit] = useState('celsius');
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Mumbai");
    
    const handleUnitChange = (e) => {
      setUnit(e.target.value);
    }
    useEffect( () => {
        const fetchApi = async () => {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=b7adfe0ae0e19fcba82efc9903298b4c
            `;
            const response = await fetch(url);
            const resJson = await response.json(); 
            // console.log(resJson);
            setCity(resJson.main);
        };

        fetchApi();
    },[search] )

    useEffect(()=>{
      const storedHistory = JSON.parse(localStorage.getItem('searchHistory'))
      if(storedHistory){
        setSearchHistory(storedHistory)
      }
    },[])

const handleSearch = ()=>{
    if(search.trim()=== "") return;

    const updatedHistory = [search,setSearchHistory].slice(0,5)
    setSearchHistory(updatedHistory)

    localStorage.setItem('searchHistory',JSON.stringify(updatedHistory))
}
    return(
        <>
            <div className="box">
                <div className="inputData">
                    <input 
                    type="search"
                    value={search}
                    className="inputFeild"
                    onChange={ (event) => { setSearch(event.target.value) } } />
                    <button className="my-button" onClick={handleSearch}>Search</button>
                    </div>
                    <div className="recent-search">
                    <h2>Recent Searches</h2>
                    <ul>
                        {searchHistory.map((citys)=>(
                            <li className="list-container">{citys}</li>
                        ))}</ul>
                        
                </div>
         
        {!city ? (
            <p className="errorMsg"> No Data Found </p>
        )  : (
            <div>
                <div >
       <select className="dropdownbutton" value={unit} onChange={handleUnitChange}>
        <option className="dropdownText" value="celsius">Celsius</option>
        <option className="dropdownText" value="fahrenheit">Fahrenheit</option>
       </select>
        </div>
            <div className="info">
            <h2 className="location">
            <i className="fas fa-street-view"> </i>{search}
            </h2>
            <h1 className="temp">
                {/* {convertTemp()} */}
           {unit === 'celsius' ?city.temp+'°Cel'  :(city.temp * 9 / 5) + 32+'°F' }
            </h1>
            {/* <h3 className="tempmin_max"> Min : {city.temp_min}°Cel | Max : {city.temp_min}°Cel </h3> */}
        </div>
     
       
        
        <div className = "wave -one"></div>
        <div className = "wave -two"></div>
        <div className = "wave -three"></div>
        </div>
        )}
            </div>
        </>
    )
}

export default Tempapp;