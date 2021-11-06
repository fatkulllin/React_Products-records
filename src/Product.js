import React from "react";

function Product({name,cat,price,removeNote,StartEditNote,EndEditNote, elem}){

    return <tr>
    <td>{name}</td>
    <td>{cat}</td>
    <td>{price}</td>
    <td><button onClick={() => removeNote(elem.id)}>Delete</button></td>
    {!elem.edit && <td><button onClick={() => StartEditNote(elem)}>Edit</button></td>}
    {elem.edit && <td><button onClick={() => EndEditNote(elem.id)}>Save</button></td>}
</tr>
}

export default Product