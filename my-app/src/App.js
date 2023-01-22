import './App.css';
import {useState,useRef} from 'react'
import axios from "axios";
import { Chart } from "react-google-charts";


function App() {
  const [market,SetMarket]=useState('');
  const [data,setData] = useState([]);
  const [show, setShow] = useState(false);
  const [apiError,setApiError] = useState('');
  const marketRef = useRef()
  const daysRef = useRef()

  function callApi(){
    const marketInput = marketRef.current.value;
    let daysInput = daysRef.current.value;
    if (marketInput === ''){
      return 
    } 
    if (daysInput === ''){
      daysInput = 100 
    } 
    
    console.log(marketInput)
    SetMarket(marketInput)
    marketRef.current.value = null;
    daysRef.current.value = null;
    const url = "http://127.0.0.1:8000/binance/"+marketInput+"/"+daysInput
    axios.get(url).then((response) => {
      console.log(response)
      if (response.data.code===-1100 || response.data.code===-1121){
      setApiError("Invalide Symbole")
    return }
      let time_close = [["Time","Close"]];
      
      for (var i = 0; i < response.data.length; i++) {
        time_close.push([new Date(parseInt(response.data[i][0])),parseInt(response.data[i][2])]); // convert to seconds
        
      }
      
      setApiError('')
      setShow(true)
      setData(time_close);
    }).catch((e)=>{
      if (e.message === 'Network Error') {
        setApiError("API not connected")
      }
      
      console.log(e)
    });

  }
  
  return (<>
    <input type="text" ref={marketRef} placeholder="market"/>
    <input type="text" ref={daysRef} placeholder="days"/>
    <button onClick={callApi}>Search Market</button>
    <p>{apiError}</p>
    { show ?
    <Chart
      chartType="LineChart"
      data={data}
      width="100%"
      height="400px"
      legendToggle
        
    />
    : null}
     
  </>
  );
}

export default App;
