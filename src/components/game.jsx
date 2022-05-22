import { useEffect, useState } from "react";
import game from './game.module.css'
import BlockContainer from "./gameComponents/block";
import  {coordsArray} from './gameComponents/temporartArray';


export default function Game() {
    const n = 10;
    const newArray = Array.from({length: n},()=> Array.from({length: n}, () => null));
    const [matrix, setMatrix] = useState(Array.from({length: n},()=> Array.from({length: n}, () => null)));
    const [gameLevel,setgameLevel] = useState(3);
    const [gameArray,setGameArray] = useState([]);
    const [clickCounter,setClickCounter] = useState(1);
    const [hide,setHide] = useState(false);
    const [refresh,setRefresh] = useState(false);
    const [nextLevel,setNextLevel] = useState(false);

    const handleChange = (row, column, value) => {
        let copy = [...matrix];
        copy[row][column] = +value
        setMatrix(copy);
    
    };

     function getRanArr(lngth) {
        let arr = [];
        do {
            let ran = Math.floor(Math.random() * lngth); 
            arr = arr.indexOf(ran) > -1 ? arr : arr.concat(ran);
         }while (arr.length < lngth)
         
         return arr;
      }


    function randomBlock(level) {
        const rand1 = getRanArr(99);

        for(let i = 0; i <level; i++) {
            handleChange(coordsArray[rand1[i]][0],coordsArray[rand1[i]][1],i + 1)
        }

    }

    function hideNumbers() {
        setHide(true);
    }

    function validateNumbers(val) {
        if(clickCounter === gameLevel) {
            console.log('WIN!!')
            resetGame();
            setgameLevel(gameLevel => gameLevel + 1);
        }   
        if(gameArray[clickCounter - 1] !== val) {
            setgameLevel(3);
            resetGame();
        } 
    }
    function resetGame() {
        setNextLevel(!nextLevel);
        setHide(false);
        setClickCounter(1);
        setRefresh(!refresh);
        setMatrix([...newArray]);

    }

    useEffect(()=>{
        function game() {
            var z = 0;
            randomBlock(gameLevel)
            setGameArray(Array.from({length: gameLevel},()=> ++z))
        }
        game();
    },[nextLevel])

    
    return (
        <div id="game" className={game.container}>
        <div className={game.text}>
        <b>Click counter: {clickCounter - 1}</b>
        <b>Level: {gameLevel - 2}</b>
        </div>
            {
                matrix.map((block,index_Y) => {
                    return (
                        <div key={index_Y+"Y"} className={game.blockContainer}>
                            {
                                block.map((subBlock,index_X) => {
                                    return <BlockContainer key={index_X+"X"}
                                    value={subBlock} 
                                    x={index_X} 
                                    y={index_Y} 
                                    setClickCounter={setClickCounter} 
                                    hideNumbers={hideNumbers}
                                    hide={hide}
                                    validateNumbers={validateNumbers}
                                    refresh={refresh}
                                    />
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
};
