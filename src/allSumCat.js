import React from "react";
import GetCategory from "./GetCategory";
import { useState } from "react";
import { useSelector } from "react-redux";

function AllSumCat() {

    const records = useSelector(state=>state.records)
    const [getAllSumCat, setAllSumCat] = useState(0)
    const allSumCat = (event) => {
        let sum = 0
        console.log(records)
        records.map(elem => {
            if (elem.cat === event.target.value) {
                return sum += elem.price
            } else {
                return null
            }
        })
        setAllSumCat(sum)
    }

    return <div>
        <h1>Вывести сумму потраченную за выбранную категорию</h1>
        <select onChange={(event) => { allSumCat(event) }}>
            <option></option>
            <GetCategory />
        </select>
       {getAllSumCat>0 && <p>{getAllSumCat}</p>} 
    </div>
}
export default AllSumCat