import React, { Fragment, useState } from 'react';
import Card from './Card/Card';
import SearchBar from './Input/SearchBar';
import { DateRangePicker } from 'rsuite';
import { uuid } from 'uuidv4';

import 'rsuite/dist/rsuite.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import '../Styles/MainContainer/main.css';
import '../Styles/LoadersSection/loader.css';

function CompanyDetails() {

    //CURRENT DATA FOR THE DATE PICKER
    const currentDate = Math.floor(new Date().getTime() / 1000);

    //LOADER FOR API
    const [load, setLoad] = useState(true);
    const [loadMsg, setLoadMsg] = useState();

    //STATE VARIABLES FOR FETCHED DATA
    const [profiles, setProfile] = useState({});
    const [stocks, setStock] = useState();
    const [time, setTime] = useState([]);

    //INTERACTIVE CONTROLS FOR USER TO FIND INFORMATION
    const [inputValue, setInputValue] = useState('');
    let [startDate, setStartDate] = useState(currentDate);
    let [endDate, setEndDate] = useState(currentDate);


    //URL'S CONSTRUCTORS FOR FETCH INITIALIZATION(profile and stock)
    function createProfileURL() {
        return `${process.env.REACT_APP_PROFILE_URL}` +
            new URLSearchParams({
                symbol: `${inputValue.toUpperCase()}`
            }).toString() + `&token=${process.env.REACT_APP_API_KEY}`;
    };

    function createStockURL(from, to) {
        return `${process.env.REACT_APP_CANDLE_URL}` +
            new URLSearchParams({
                symbol: `${inputValue.toUpperCase()}`,
                resolution: 'D',
                from: `${from}`,
                to: `${to}`
            }).toString() + `&token=${process.env.REACT_APP_API_KEY}`;
    };


    //DATA FETCH
    async function initFetching(from, to) {
        const candleURL = createStockURL(from, to);
        const profileURL = createProfileURL();
        console.log(candleURL)
        let profileData = fetch(profileURL)
            .then(resp => resp.json())
            .then(profile => {
                setProfile(profile)
            });

        let stockData = fetch(candleURL)
            .then(resp => resp.json())
            .then(stock => {
                setStock(stock)
                setTime(stock.t)
            });


        await Promise.all([profileData, stockData, time])
            .then(resp => {
                setLoad(false)
                return resp
            });
    };


    //LOGGERS FOR SYMBOL NAME AND DATES(from, to)
    const initSymbolLogging = () => {
        const postToLogs = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                level: 'info',
                message: 'error'
            })
        };
        fetch('http://localhost:5500/api/postLogs/', postToLogs)
    };

    const initDateLogging = () => {
        const postToLogs = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                level: 'info',
                message: `Picking start, end dates. From: ${startDate} to: ${endDate}`
            })
        };
        fetch('http://localhost:5500/api/postLogs/', postToLogs)
    };


    //SEARCHABLE KEY PASS INTO URL'S CONSTRUCTORS(if date is not choosen, constructor uses current date)
    const handleSubmit = (e) => {
        e.preventDefault();
        initFetching(startDate, endDate);
        initSymbolLogging();
        setLoadMsg('Fetching data, please wait!...')
    };


    //DATE PICKER FOR STOCK URL CONSTRUCTOR(from, to)
    function callback(picker) {
        initDateLogging();
        let startpickerdate = Math.floor(picker[0].getTime() / 1000)
        let endpickerdate = Math.floor(picker[1].getTime() / 1000)


        setStartDate(startpickerdate);
        setEndDate(endpickerdate);

        initFetching(startpickerdate, endpickerdate);
    };


    return (
        <Fragment>
            <div className='row w-75 mx-auto py-4 inputContainer'>
                <div className='row mx-auto w-50 d-flex my-2'>
                    <SearchBar
                        handleSubmit={handleSubmit}
                        setInputValue={setInputValue}
                        inputValue={inputValue}
                    />
                </div >

                <div className='row mx-auto'>
                    <DateRangePicker
                        onChange={callback}
                    />
                </div>

            </div>
            <div className='row mx-auto w-75 h-100'>
                {loadMsg && load ?
                    <p className='rounded text-center text-light fs-5 mx-auto p-4 my-3 loading'>{loadMsg}</p> :
                    (!load &&
                        <Card
                            key={uuid}

                            info={profiles}
                            stocks={stocks}
                            time={time}
                        />

                    )
                }
            </div>
        </Fragment>
    )
}

export default CompanyDetails