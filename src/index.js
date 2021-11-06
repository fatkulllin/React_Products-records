import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';


const defaultState = {
  records: [
    {
      id: 'GYi9G_uC4gBF1e2SixDvu1',
      name: 'name',
      cat: 'cat',
      price: 190,
      date: '2021-10-21',
      edit: false
    },
    {
      id: 'GYi9G_uC4gBF1e2SixDvu',
      name: 'name',
      cat: 'cat2',
      price: 190,
      date: '2021-10-21',
      edit: false
    },
    {
      id: 'GYi9G_uC4gBF1e2',
      name: 'name1',
      cat: 'cat2',
      price: 300,
      date: '2021-10-23',
      edit: false
    },
    {
      id: 'GYi9G_uC4gBF1e21231234',
      name: 'name2',
      cat: 'cat1',
      price: 60,
      date: '2021-10-25',
      edit: false
    },
    {
      id: 'GYi9G_uC4gBF1e2123123',
      name: 'name2',
      cat: 'cat3',
      price: 60,
      date: '2021-10-25',
      edit: false
    },
  ],
}




const recordsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return { ...state, records: [...state.records, action.payload] }
    case "REMOVE_PRODUCT":
      return { ...state, records: state.records.filter(record => record.id !== action.payload) }
    case "START_EDIT_PRODUCT":
      return {...state, records: state.records.map(elem=>{
        if(elem.id === action.payload){
          return {...elem, edit:true}
        }else{
          return elem
        }
      })}
    case "END_EDIT_PRODUCT":
      return {...state, records: state.records.map(elem=>{
        if(elem.id === action.payload.id){
          return {...elem, edit:false, name: action.payload.valueName, cat: action.payload.valueCat, price: action.payload.valuePrice }
        }else{
          return elem
        }
      })}
    default:
      return state
  }
}

export const store = createStore(recordsReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />   
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
