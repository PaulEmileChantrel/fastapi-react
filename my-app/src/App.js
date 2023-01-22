import './App.css';
import {useState,useRef} from 'react'
import axios from "axios";

function App() {
  const [market,setMarket] = useState('');
  const [data,setData] = useState('');
  const marketRef = useRef()

  function callApi(){
    const marketInput = marketRef.current.value;
    if (marketInput === ''){
      return 
    } 
    setMarket(prev=>{return marketInput})
    console.log(marketInput)

    marketRef.current.value = null;
    const url = "http://127.0.0.1:8000/binance/"+marketInput+"/15"
    axios.get(url).then((response) => {
      console.log(response)
      setData(response.data);
    }).catch((e)=>{
      console.log(e)
    });

  }
  return (<>
    <input type="text" ref={marketRef}/>
    <button onClick={callApi}>Search Market</button>
    <div>{data}</div>
  </>
  );
}

export default App;
