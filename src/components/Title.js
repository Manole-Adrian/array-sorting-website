import React from "react";
import "./Title.css"

export default function Title(props) {

    const [animate,setAnimate] = React.useState(0)

    const [secondAnimate, setSecondAnimate] = React.useState(0)

    const [animateClass,setAnimateClass] = React.useState("")


    React.useEffect(
        () => {
            if(animate===1) {
                setAnimateClass("animate")
            }
            if (secondAnimate === 1) {
                setAnimateClass("fadeOut")
            }
            if (secondAnimate===2) {
                setAnimateClass("hidden")
                props.setIsShowing(3)
                return;
            }
        }
        , [animate, secondAnimate]
        )

    return (
        <div className="title">
            <h1 className={animateClass} onAnimationEnd={() => {setAnimate(prevState => prevState+1)}}>
                Array Sorting Visualiser
            </h1>
            <h2 className={animateClass} onAnimationEnd={() => {setSecondAnimate(prevState => prevState+1)}}>
                By Manole Adrian
            </h2>
        </div>
        )
}