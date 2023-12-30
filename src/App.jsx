import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSearch,
  FaPlusCircle,
  FaGlobeAmericas,
  FaUser,
} from "react-icons/fa";
import "./App.css";
import "./reset.css";
import DropDown from "./DropDown.jsx";
import Container from "./Container.jsx";

function App() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [lowPrice, setLowPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(10000000);
  const [lowProdYear, setLowProdYear] = useState(0);
  const [highProdYear, setHighProdYear] = useState(new Date().getFullYear());
  const [customsPassed, setCustomsPassed] = useState();
  const [colour, setColour] = useState();
  const [customsPassedTrueColour, setCustomsPassedTrueColour] = useState();
  const [customsPassedFalseColour, setCustomsPassedFalseColour] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get(
        "https://api2.myauto.ge/ka/products?TypeID=0&ForRent=0&Mans=41&CurrencyID=3&MileageType=1&Page=1&fbclid=IwAR2refR0eY1LBXLbpfA2wAxf8rQ11bM-ITXZ1N-HeSKwt4aGLkBaskLVWEU"
      )
      .then((response) => {
        setData(response.data.data.items);
        setOriginalData(response.data.data.items);
        console.log(response.data.data.items);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (!lowPrice || isNaN(lowPrice) || lowPrice === null || lowPrice === "") {
      setLowPrice(0);
    }

    if (
      !highPrice ||
      isNaN(highPrice) ||
      highPrice === null ||
      highPrice === "" ||
      highPrice === undefined
    ) {
      setHighPrice(100000000);
    }

    if (
      !lowProdYear ||
      isNaN(lowProdYear) ||
      lowProdYear === null ||
      lowProdYear === "" ||
      lowProdYear === undefined
    ) {
      setLowProdYear(0);
    }

    if (
      !highProdYear ||
      isNaN(highProdYear) ||
      highProdYear === null ||
      highProdYear === "" ||
      highProdYear === undefined
    ) {
      setHighProdYear(new Date().getFullYear());
    }
    console.log(lowPrice, highPrice, lowProdYear, highProdYear);
  }, [lowPrice, highPrice, lowProdYear, highProdYear]);

  const setColorByNumber = (number) => {
    if (number === 16) {
      return "black";
    } else if (number === 14) {
      return "blue";
    } else if (number === 13) {
      return "gray";
    } else if (number === 12) {
      return "silver";
    } else if (number === 1) {
      return "white";
    } else if (number === 8) {
      return "red";
    } else if (number === 5) {
      return "green";
    } else if (number === 6) {
      return "gold";
    }
  };

  const currencies = [
    <>{<FaGlobeAmericas />} ქართული ₾</>,
    <>{<FaGlobeAmericas />} American dollar $</>,
    <>{<FaGlobeAmericas />} British pound £</>,
  ];

  const colours = [
    "black",
    "blue",
    "gray",
    "white",
    "red",
    "silver",
    "green",
    "gold",
  ];

  const countDataLength = () => {
    return data.length;
  };

  const customsPassedTr = () => {
    setCustomsPassedTrueColour({ backgroundColor: "rgb(95, 235, 95)" });
    setCustomsPassedFalseColour({ backgroundColor: "white" });
    setCustomsPassed(true);
  };

  const customsPassedFl = () => {
    setCustomsPassedFalseColour({ backgroundColor: "rgb(95, 235, 95)" });
    setCustomsPassedTrueColour({ backgroundColor: "white" });
    setCustomsPassed(false);
  };

  const customsPassedCheck = (parameter) => {
    if (customsPassed === undefined || customsPassed === null) {
      return true;
    } else {
      return parameter.customs_passed === customsPassed;
    }
  };

  const colourCheck = (parameter) => {
    if (colour === undefined || colour === null) {
      return true;
    } else {
      return setColorByNumber(parameter.color_id) === colour;
    }
  };

  const searchButtonHandler = () => {
    setData(originalData);
    console.log("data: ", data);
    const filteredData = originalData.filter((parameter) => {
      return (
        parameter.price <= highPrice &&
        parameter.price >= lowPrice &&
        parameter.prod_year >= lowProdYear &&
        parameter.prod_year <= highProdYear &&
        customsPassedCheck(parameter) &&
        colourCheck(parameter)
      );
    });
    setData(filteredData);
    console.log("data", data);
    console.log("originaldata", originalData);
    setCurrentPage(1);
  };

  const handleColourSelection = (selectedValue) => {
    setColour(selectedValue);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="myAuto">
      <header>
        <div className="title">
          <img className="myAutoLogo" src="./src/images/myAuto.png" />
          <div className="searchContainer">
            <button className="searchIconButton">
              <FaSearch className="searchIcon" />
            </button>
            <input className="searchInput" type="text" placeholder="ძებნა" />
          </div>
          <button className="addButton">
            <FaPlusCircle /> დამატება
          </button>
          <DropDown
            classNm="currencyDownToggle"
            name={<>{<FaGlobeAmericas />} ქართული ₾</>}
            massive={currencies}
          />
          <button className="userLogIn">
            <FaUser /> შესვლა
          </button>
        </div>
        <div className="catalogue">
          <a href="https://myauto.ge/ka/calculator">განბაჟება/გაფორმება</a>
          <a href="https://myauto.ge/ka/vin">VIN-ის შემოწმება</a>
          <a href="https://myauto.ge/ka/dealers/1">დილერები</a>
          <a href="https://myauto.ge/ka/autosalons">ავტოსალონები</a>
          <a href="https://auction.myauto.ge/">აუქციონი</a>
          <a href="https://myparts.ge/ka/">ავტონაწილები</a>
          <a href="https://myauto.ge/ka/catalog">კატალოგი</a>
          <a href="https://blog.myauto.ge/ka/">ბლოგი</a>
          <a href="https://www.myauto.ge/ka/help">დახმარება</a>
          <a href="https://myauto.ge/ka/contact">კონტაქტი</a>
        </div>
      </header>
      <div className="searchBox">
        <div className="searchBoxBox">
          <div className="searchInputs">
            <div className="priceInputs">
              <p>ფასი:</p>
              <input
                type="text"
                placeholder="-დან"
                onChange={(e) => setLowPrice(e.target.value)}
              />
              <input
                type="text"
                placeholder="-მდე"
                onChange={(e) => setHighPrice(e.target.value)}
              />
            </div>

            <div className="prudYearInputs">
              <p>წელი:</p>
              <input
                type="text"
                placeholder="-დან"
                onChange={(e) => setLowProdYear(e.target.value)}
              />
              <input
                type="text"
                placeholder="-მდე"
                onChange={(e) => setHighProdYear(e.target.value)}
              />
            </div>
          </div>

          <div className="otherSearches">
            <div className="customsPassedButtons">
              <button
                className="customsPassedTrue"
                onClick={customsPassedTr}
                style={customsPassedTrueColour}
              >
                განბაჟებული
              </button>
              <button
                className="customsPassedFalse"
                onClick={customsPassedFl}
                style={customsPassedFalseColour}
              >
                განუბაჟებელი
              </button>
            </div>

            <DropDown
              classNm="colourDropDown"
              name="ფერი"
              massive={colours}
              selectedItem={colour}
              onSelect={handleColourSelection}
            />
          </div>
        </div>
        <button className="searchButton" onClick={searchButtonHandler}>
          ძებნა ({countDataLength()})
        </button>
      </div>
      <div className="carList">
        {currentItems.map((p) => (
          <Container
            key={p.car_id}
            photo={p.photo}
            car_id={p.car_id}
            color_id={p.color_id}
            price={p.price}
            prod_year={p.prod_year}
            customs_passed={p.customs_passed}
          />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          წინა
        </button>
        {Array.from(
          { length: Math.ceil(data.length / itemsPerPage) },
          (_, i) => (
            <button key={i} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          )
        )}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= data.length}
        >
          შემდეგი
        </button>
      </div>
    </div>
  );
}

export default App;
