import "./App.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import ArrayComp from "./components/Array";
import SortButton from "./components/sortButton";
import * as sorts from "./utils/sort-methods";
import ChooseMethod from "./components/ChooseMethod";
import Title from "./components/Title";

function App() {
  const [sortMethod, setSortMethod] = React.useState("choose");

  const [length, setLength] = React.useState(50);

  const [speed, setSpeed] = React.useState(100);
  
  const [isSorting, setIsSorting] = React.useState(false);

  const [setShowing, setIsShowing] = React.useState(-1);
  
  const [randArray, setRandArray] = React.useState(generateRandArray(length));

  React.useEffect(() => {  setTimeout(() => setIsShowing(0),500)}, [])

  
  console.log("render")
  function generateRandArray(length) {
    const arr = [];
    for (var i = 1; i <= length; i++) {
      arr.push({ value: i, color: "default" });
    }

    for (i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }


  function handleSortChange(event) {
    setSortMethod(event);
    sorts.stopSort(randArray);
    setIsSorting(false);
    setRandArray(generateRandArray(randArray.length));
  }

  function handleLengthChange(event, number) {
    setLength(number);
    setRandArray(generateRandArray(number));
    sorts.stopSort(randArray);
    setIsSorting(false);
  }

  function handleSpeedChange(event, number) {
    setSpeed(number);
  }

  function refreshArray() {
    if (!isSorting) {
      setRandArray(generateRandArray(length));
    }
  }

  function sorter() {
    setIsSorting((prevSort) => !prevSort);
    sorts.sorter(
      randArray,
      setRandArray,
      speed,
      isSorting,
      setIsSorting,
      sortMethod
    );
    if (isSorting) {
      sorts.stopSort(randArray);
    }
  }

  return (
    <body>
      {setShowing === 3 && <Header
        sortMethod={sortMethod}
        length={length}
        handleSortChange={handleSortChange}
        handleLengthChange={handleLengthChange}
        handleSpeedChange={handleSpeedChange}
        showHeader = {setShowing}
      />}
      {setShowing === 0 && (
        <Title state={setShowing} setIsShowing={setIsShowing} />
      )}
      {sortMethod === "choose" && setShowing === 3 && <ChooseMethod />}
      {sortMethod !== "choose" && setShowing === 3 && (
        <ArrayComp randArray={randArray} sortMethod={sortMethod}/>
      )}
      {sortMethod !== "choose" && setShowing === 3 && (
        <SortButton
          sortType={sortMethod}
          sortFunc={sorter}
          isSorting={isSorting}
          refresh={refreshArray}
        />
      )}
    </body>
  );
}

export default App;
