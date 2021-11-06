import { React, useState } from "react";
import Product from "./Product";
import { useDispatch, useSelector } from 'react-redux';


function Products({installDate, minRange, maxRange}) {

    const dispatch = useDispatch()
    const records = useSelector(state => state.records)

    const [valueName, setValueName] = useState('')
    const [valueCat, setValueCat] = useState('')
    const [valuePrice, setValuePrice] = useState('')

    const StartEditNote = (elem) => {
        dispatch({ type: "START_EDIT_PRODUCT", payload: elem.id })
        // console.log(elem)
        setValueName(elem.name)
        setValueCat(elem.cat)
        setValuePrice(elem.price)
    }

    const newName = event => {
        setValueName(event.target.value)
    }

    const newCat = event => {
        setValueCat(event.target.value)
    }

    const newPrice = event => {
        setValuePrice(event.target.value)
    }

    const removeNote = id => {
        dispatch({ type: "REMOVE_PRODUCT", payload: id })
    }

    const EndEditNote = id => {
        dispatch({ type: "END_EDIT_PRODUCT", payload: { id, valueName, valueCat, valuePrice } })
    }

    let sum = 0
    const getProducts = records.map((elem) => {

        let name
        let cat
        let price
        if ( (elem.date === installDate) || (elem.date >= minRange && elem.date <= maxRange)) {
            if (!elem.edit) {
                name = <span onClick={() => StartEditNote(elem.id, elem)}>{elem.name}</span>
                cat = <span onClick={() => StartEditNote(elem.id, elem)}>{elem.cat}</span>
                price = <span onClick={() => StartEditNote(elem.id, elem)}>{elem.price}</span>
            } else {
                name = <input value={valueName} onChange={event => newName(event)} />
                cat = <input value={valueCat} onChange={event => newCat(event)} />
                price = <input value={valuePrice} onChange={event => newPrice(event)} />
            }
            sum = sum + elem.price
            return <Product
                name={name}
                cat={cat}
                price={price}
                removeNote={removeNote}
                StartEditNote={StartEditNote}
                EndEditNote={EndEditNote}
                elem={elem}
                key={elem.id}
            />
        }else{
            return null
        }
    })

    return <>
        <table>
            <thead>
                <tr>
                    <td>Название</td>
                    <td>Категория</td>
                    <td>Цена</td>
                </tr>
            </thead>
            <tbody>
                {getProducts}
                <tr>
                    <td>Общая сумма: {sum}</td>
                </tr>
            </tbody>
        </table>


    </>
}

export default Products