import { useEffect, useState } from 'react';
import game from '../game.module.css'

export default function BlockContainer({value,setClickCounter,x,y,hideNumbers,hide,validateNumbers,refresh}) {

    const [selected,setSelected] = useState(false);

    function clickValidation(e) {
        setClickCounter(clickCounter => clickCounter + 1);
        setSelected(true);
        hideNumbers();
        validateNumbers(value);
    }
    useEffect(()=>{
        setSelected(false);
    },[refresh])

    return <div
    className={`${game.block}` + ' ' + `${selected ? game.selected : ""}`} 
    onClick={(clickValidation)}
    >
        {hide ? null : value}
    </div>
}