import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GetCategory from "./GetCategory";

function Graph({ installDay, minRange, maxRange }) {

    const canvasRef = useRef()
    const records = useSelector(state => state.records)

    //понадобится для построения графика по категориям
    const [productCat, setProductCat] = useState('')
    //это для назначения категории
    const changeCat = (event) => {
        setProductCat(event.target.value)
    }

    let result = []
    let categories = []

    for (let element of records) {
        if (productCat === element.cat) {
            categories.push(element.cat)
            break;
        } else if ((element.date === installDay) || (element.date >= minRange && element.date <= maxRange)) {
            categories.push(element.cat)
        }
    }


    categories = [...new Set(categories)]

    for (let cat of categories) {
        let price = 0
        let product = []
        for (let elem1 of records) {
            if (cat === elem1.cat) {
                price += elem1.price
                product.push(elem1.name)

            }
        }
        result.push({ cat, price, product })
    }

    console.log(result)

    function draw() {

        let ctx = canvasRef.current.getContext('2d')
        canvasRef.current.getContext('2d').clearRect(0, 0, 800, 800)
        let max = 0
        result.forEach(elem => {
            if (elem.price > max) {

                max = elem.price
            }
        })
        let step = 0
        for (let i = 5; i < 10; i++) {
            let a = max / i
            if (a % 2 === 0) {
                step = a

            }

        }
        let maxStep = max + step
        ctx.fillStyle = "black";
        ctx.fillText(maxStep + "", 5, 60)
        ctx.beginPath()
        ctx.moveTo(40, 60)
        ctx.lineTo(50, 60)
        ctx.stroke()
        ctx.fillStyle = "black";
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(50, 10);
        ctx.lineTo(50, 110);
        ctx.stroke();

        for (let i = 0; i < 10; i++) {
            maxStep -= step
            ctx.fillStyle = "black";
            ctx.fillText(maxStep + "", 5, (i + 1) * 50 + 60);
            ctx.beginPath();
            ctx.moveTo(40, (i + 1) * 50 + 60);
            ctx.lineTo(50, (i + 1) * 50 + 60);
            ctx.stroke();

            if (maxStep === 0) {
                horizontal(50, i * 50 + 110)
                break
            }
            ctx.beginPath(); // Запускает путь
            ctx.moveTo(50, (i + 1) * 50 + 60); // Указываем начальный путь
            ctx.lineTo(50, (i + 1) * 50 + 110); // Перемешаем указатель
            ctx.stroke(); // Делаем контур

        }

        function horizontal(x, y) {

            result.forEach((elem, index) => {

                ctx.beginPath();
                ctx.moveTo(x, y);

                x += 75

                ctx.lineTo(x, y);
                ctx.stroke();

                let y1 = y + 20
                block(x, y, elem.price, result.length)
                ctx.fillText(elem.cat, x, y1)
                elem.product.forEach((element) => {
                    ctx.fillText(element, x, y1 += 30)
                })
            })
            ctx.beginPath();
            ctx.moveTo(x, y);

            x += 100

            ctx.lineTo(x, y);
            ctx.stroke();

        }

        function block(x, y, price) {
            let smallStep = (y - 110) / max
            let drawBlockY = y - smallStep
            for (let i = 2; i <= price; i++) {
                drawBlockY -= smallStep
                if (i === price) {
                    ctx.fillRect(x, drawBlockY, 50, y - drawBlockY)
                }
            }

        }
    }

    if (result.length !== 0) {
        draw();
    }

    return <div>
        <h1>График</h1>
        <select onChange={(event) => { changeCat(event) }}>
            <option></option>
            <GetCategory />
        </select>
        <br></br>
        <canvas ref={canvasRef} width="800" height="800" />
    </div>
}

export default Graph