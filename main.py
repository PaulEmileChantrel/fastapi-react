from typing import Union
import requests
from fastapi import FastAPI
import time
app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/binance/{market}/{days}")
def read_item(market: str,days:int):
    now = int(time.time()*1000)
    now = now - now%(60*1000*60*24*days)#rounding to the lowest min

    binance_main_url = 'https://api.binance.com'
    binance_start_time = now-60*1000*60*24*days
    binance_end_time = now
    binance_url = binance_main_url+ '/api/v3/klines?symbol='+market+'&interval=1d&startTime='+str(binance_start_time)+'&endTime='+str(binance_end_time)+'&limit=1000'
    response = requests.get(binance_url)
    response = response.json()
    print(response)
    print(len(response))
    return response