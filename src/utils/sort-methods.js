function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MAIN_COLOR = "#ffd43b";
const SECOND_COLOR = "#ff8787";

let interval1, interval2;

function stopSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].color = "default";
  }
  clearInterval(interval1);
  clearInterval(interval2);
}

function sorter(arr, setterFunc, speed, isSorting, setIsSorting, sortType) {
  function setter(arr) {
    const newArr = [...arr];
    setterFunc(newArr)
  }
  function bubbleSort() {
    let i = 0;

    let j = 0;


    async function secondFor(arr, setter, speed) {
      if (j !== 0) {
        arr[j].color = "default";
      }
      arr[j + 1].color = MAIN_COLOR;
      setter(arr);
      await sleep(speed);
      if (arr[j].value > arr[j + 1].value) {
        var temp = arr[j].value;
        arr[j].value = arr[j + 1].value;
        arr[j + 1].value = temp;
        setter(arr);
      }
      j++;

      if (j === arr.length - i - 1) {
        arr[j].color = "default";
        j = 0;
        i++;
      }
      if (i === arr.length - 1) {
        stopSort(arr);
        setIsSorting(false);
      }
    }

    interval2 = setInterval(secondFor, speed, arr, setter, speed);
  }

  function selectionSort() {
    let i = 0;
    let j = 1;
    let min;

    function forLoop() {
      if (j === i + 1) {
        min = i;
        arr[min].color = SECOND_COLOR;
        setter(arr);
      }
      if (arr[j - 1].color !== SECOND_COLOR) {
        arr[j - 1].color = "default";
      }
      if (arr[j].color !== SECOND_COLOR) {
        arr[j].color = MAIN_COLOR;
      }
      setter(arr)
      if (arr[min].value > arr[j].value) {
        arr[min].color = "default";
        min = j;
        arr[min].color = SECOND_COLOR;
        setter(arr);
      }
      j++;
      if (j === arr.length) {
        arr[j - 1].color = "default";
        arr[i].color = "default";
        if (i !== min) {
          [arr[i].value, arr[min].value] = [arr[min].value, arr[i].value];
          arr[min].color = "default";
          arr[i].color = "default";
        }
        setter(arr);
        i++;
        j = i + 1;
      }
      if (i === arr.length - 1) {
        stopSort(arr);
        setIsSorting(false);
      }
    }
    interval1 = setInterval(forLoop, speed);
  }

  function insertionSort() {
    let i = 1,
      key,
      j;
    function forLoop() {
      if (!(j >= 0 && arr[j].value > key)) {
        key = arr[i].value;
        try {
          arr[i + 1].color = MAIN_COLOR;
        } catch (error) {
          console.log(error);
        }

        arr[i].color = "default";
        j = i - 1;
      }
      if (j >= 0 && arr[j].value > key) {
        arr[j + 1].value = arr[j].value;
        setter(arr);
        arr[j].color = SECOND_COLOR;
        if (arr[j + 1].color === SECOND_COLOR) {
          arr[j + 1].color = "default";
        }
        j = j - 1;
      }
      if (!(j >= 0 && arr[j].value > key)) {
        console.log("intrat");
        arr[j + 1].value = key;
        arr[j + 1].color = "default";
        setter(arr);
        i++;
        if (i === arr.length) {
          console.log(arr);
          stopSort(arr);
          setIsSorting(false);
        }
      }
    }
    key = arr[i].value;
    arr[i - 1].color = "default";
    arr[i].color = MAIN_COLOR;
    j = i - 1;
    interval1 = setInterval(forLoop, speed);
  }

  function gnomeSort() {
    let i = 1;
    let j;
    let isInSecondFor = false;
    function moveBack(i) {
      arr[j - 1].color = SECOND_COLOR;
      if (arr[j].color !== MAIN_COLOR) {
        arr[j].color = "default";
      }
      setter(arr)
      var t = arr[j].value;
      arr[j].value = arr[j - 1].value;
      arr[j - 1].value = t;
      j = j - 1;
      if (j === 0 || arr[j - 1].value <= arr[j].value) {
        arr[j].color = "default";

        isInSecondFor = false;
        clearInterval(interval2);
      }
    }
    function forLoop() {
      if (!isInSecondFor) {
        if (i !== arr.length) {
          arr[i].color = MAIN_COLOR;
          arr[i - 1].color ='default'
          if (arr[i - 1].value > arr[i].value) {
            isInSecondFor = true;
            j = i;
            interval2 = setInterval(moveBack, speed, i);
            setter(arr);
          }
        }
        i++;
        if (i === arr.length + 1) {
          stopSort(arr);
          setIsSorting(false);
        }
      }
    }
    console.log("gnome");
    interval1 = setInterval(forLoop, speed);
  }

  if (!isSorting) {
    switch (sortType) {
      case "bubble":
        console.log("test");
        bubbleSort(arr, setter, speed, setIsSorting);
        break;
      case "selection":
        console.log("Selection");
        selectionSort();
        break;
      case "insertion":
        insertionSort();
        break;
      case "gnome":
        gnomeSort();
        break;
      default:
        break;
    }
  }
}

export { sorter, stopSort };
