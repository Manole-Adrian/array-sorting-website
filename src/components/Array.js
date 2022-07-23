import React from "react";
import "./Array.css";

export default function ArrayContainer(props) {

  const [animate, setAnimate] = React.useState('animate')

  const [,setUpdate] = React.useState()

  function removeAnim() {
    setAnimate('')
  }

  function addAnim() {
    setAnimate('animateArr')
  }
  
  React.useEffect(() => {
    addAnim();
  }, [props.sortMethod])

  React.useEffect(() => {
    console.log("render1")
    setUpdate("");
  }, [props.randArray]);

  return (
    <div>
      <div className="arrayContainer">
        {props.randArray.map((randElem) => {
          // randElem*10
          let calculatedHeight = randElem.value * 10;
          let calculatedWidth = "1.5rem";
          if (props.randArray.length < 15) {
            calculatedHeight = randElem.value * 50;
            calculatedWidth = "5rem";
          } else if (props.randArray.length < 25) {
            calculatedHeight = randElem.value * 27;
            calculatedWidth = "3rem";
          } else if (props.randArray.length < 35) {
            calculatedHeight = randElem.value * 20;
            calculatedWidth = "2rem";
          } else if (props.randArray.length < 60) {
            calculatedHeight = randElem.value * 10;
            calculatedWidth = "1.9rem";
          } else if (props.randArray.length < 80) {
            calculatedHeight = randElem.value * 7.5;
            calculatedWidth = "1.25rem";
          } else {
            calculatedHeight = randElem.value * 6;
            calculatedWidth = "1rem";
          }

          // const calculatedHeight = 2;
          // const calculatedWidth = 2;
          const styles = {
            height: calculatedHeight,
            width: calculatedWidth,
            // background: `linear-gradient(#F7ECDE 0%,#E9DAC1 100%)`,
            background: randElem.color === 'default' ?  `linear-gradient(#F7ECDE 0%,#E9DAC1 100%)` : randElem.color
          };
          return <div style={styles} className={`arrayElem ${animate}`} onAnimationEnd={removeAnim}></div>;
        })}
      </div>
    </div>
  );
}
