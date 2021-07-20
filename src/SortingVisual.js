import React, {useState, useEffect} from "react";
let arrayCopy = [];
let enableBinarySearchDiv = false;

function SortingVisual(props) {
    const NUMBER_OF_ARRAY_BARS = 25;
    const [array,setarray] = useState([]);
    const [resetArray,setResetarray] = useState(true);
    const [binaryQueue,setBinaryQueue] = useState("");
    const [uniquearrMsg,setUniqueuearrMsg] = useState("");

    useEffect(()=>{
        randomArray();
    },[]);


    const randomArray = () => {
        let arr = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            arr.push(randomIntFromInterval(15, 300));
        }
        arrayCopy = [...arr];
        setarray([
            ...arrayCopy,
        ]);
        // Updating on click on randomArray function
        setResetarray(true);
        console.log(arr)
        setTimeout(()=>{
            console.log("After",array)
        },2000)
        
    }

    const randomIntFromInterval = (min, max) => {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const merge = (left, right) => {
        let newArr = [];

        while (left.length && right.length) {
            if (left[0] < right[0]) {
                newArr.push(left.shift());
            } else {
                newArr.push(right.shift());
            }
        }

        return [...newArr, ...left, ...right];
    }

    const mergeSort = (arrParam) => {
        let halfArr = arrParam.length / 2;
        if (arrParam.length < 2) {
            return arrParam;
        }
        let left = arrParam.splice(0, halfArr);
        let leftSort = mergeSort(left);
        let rightHalf = mergeSort(arrParam);
        return merge(leftSort, rightHalf);
    }

    const mergeShortArray = () => {
        let newArr = [...array];
        let sortArr = mergeSort(newArr);
        setResetarray(false);
        sortArr.map((a,i)=>{
                const barOneStyle = document.getElementsByClassName("array-bar")[i];
                // const barTwoStyle = document.getElementById("arr-bar"+sortArr[i+1]);//document.getElementById("arr-bar"+sortArr[i+1]);
                // barOneStyle.style.transition="1s"
                // barTwoStyle && (barTwoStyle.style.backgroundColor="red");
                barOneStyle.style.height=a+"px";
                barOneStyle.style.backgroundColor="chartreuse";
                // setTimeout(() => {
                //     barOneStyle.backgroundColor = "red";
                //     barTwoStyle.height= a + 'px';
                // }, i * 10);
        });
        // Sort Array
        setarray([
            ...sortArr,
        ]);
    }
    const uniqueArray = () => {
        let newArr = [...array];
        // Sort Array
        let unique = [...new Set(newArr)];
        setarray([
            ...unique
        ]);
        // If duplicate array is not present in "array" queue then return message
        if (newArr.length === unique.length){
            setUniqueuearrMsg("No duplicate array present in the list");
        } else {
            setUniqueuearrMsg("Removed duplicate array from the list");
        }
    }

    const binarySearchAllArray = (n) => {
        setBinaryQueue("");
        let arr = [];
        let result = [];
        arr.push("1");
        var i = 0;
        while (i < n) {
            console.log(arr[0]); // Print each binary value
            result.push(arr.shift());
            i == n -1 && setBinaryQueue(result.toString()); // set into react state to print on UI
            arr.push(result[i] + "0");
            arr.push(result[i] + "1");
            i++;
        }
        enableBinarySearchDiv =true;
    }

    const binarySearch = (n) => {

        setBinaryQueue("");
        let arr = [];
        arr.push("1");
        var i = 0;
        while (i < n) {
            var s1 = arr[0];
            console.log(s1);
            setBinaryQueue(s1);
            arr.shift();
            arr.push(s1 + "0");
            arr.push(s1 + "1");
            i++;
        }
        enableBinarySearchDiv =true;
    }

    const arrayVisual = () => {
        return (array.map((a,i) => {
            // Adding following condition to forcefully reset bar color and it is not updating using CSS, because React wants new property to update it into dom. 
            if (resetArray && document.getElementsByClassName("array-bar")[i]) {
                const barOneStyle = document.getElementsByClassName("array-bar")[i];
                barOneStyle.style.backgroundColor = "turquoise";
            }
            return (
                <div key={i}
                    className="array-bar"
                    id={`arr-bar${a}`}
                    style={
                        {
                            backgroundColor: "turquoise",
                            height: a + 'px',
                            display: "inline-block",
                            marginLeft: "3px",
                            width: "2.5%",
                            verticalAlign: "top",
                            fontSize: "1.3vw",
                            transition: "1s"
                        }
                    }>
                        {a}
                </div>
            )
        })
        )
    }

    return (
        <div>
            {uniquearrMsg && <div className="array-visual">{uniquearrMsg}</div>}
            {enableBinarySearchDiv && <div className="array-visual">Binary Numbers from 1 to n: (Array length: {array.length})  {binaryQueue && binaryQueue}</div>}
            
            <button id='merge-sort' onClick={(data) => randomArray()}>Reset Array</button>
            <button id='merge-sort' onClick={(data) => mergeShortArray()}>Merge Sort Array</button>
            <button id='merge-sort' onClick={(data) => uniqueArray()}>Unique Array</button>
            {/*<button id='merge-sort' onClick={(data) => binarySearch(array.length)}>Binary Search</button>
            <button id='merge-sort' onClick={(data) => binarySearchAllArray(array.length)}>Binary Search All array</button>*/}
            <div className="array-visual">{array && arrayVisual()}</div>
        </div>
    )


}

export default SortingVisual;

