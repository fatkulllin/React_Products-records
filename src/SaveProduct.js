import React from "react";
import { useState } from 'react'
import GetCategory from "./GetCategory";

function SaveProduct({ dispatch, records, todayDate }) {

    const [productName, setProductName] = useState('')
    const [productCat, setProductCat] = useState('')
    const [productPrice, setProductPrice] = useState(0)

    const changeName = (event) => {
        setProductName(event.target.value)
    }

    const changeCat = (event) => {
        setProductCat(event.target.value)
    }

    const changePrice = (event) => {
        setProductPrice(event.target.value)
    }

    const addRecordProduct = () => {
        dispatch({ type: "ADD_PRODUCT", payload: { name: productName, cat: productCat, price: Number(productPrice), date: todayDate, edit: false } })
        setProductName('')
        setProductCat('')
        setProductPrice(0)
    }

    return <div>
        <h1>Введите товар для сохранения</h1>
        <p>Название продукта</p>
        <input value={productName} onChange={(event) => { changeName(event) }} />

        <p>Категория продукта</p>
        <input value={productCat} onChange={(event) => { changeCat(event) }} />

        {
            records.length > 0
            &&
            <select onChange={(event) => { changeCat(event) }}>
                <GetCategory/>
            </select>
        }


        <p>Цена продукта</p>
        <input value={productPrice} onChange={(event) => { changePrice(event) }} />

        <button onClick={() => addRecordProduct(productName, productCat, productPrice)}>save</button>
    </div>
}

export default SaveProduct