import React from "react";
import { useSelector } from 'react-redux';

function GetCategory() {
    const records = useSelector(state => state.records)

    let cats = []

    records.forEach(element => {
        if(cats.indexOf(element.cat) === -1){
            cats.push(element.cat)
        }
    });

    const cat = cats.map((elem, index) => {
        return <option key={index}>{elem}</option>
    })

    return <>{cat}</>


}

export default GetCategory