import React, { useEffect, useState } from 'react';
import Card from './Card/Card';
import SearchBar from './Inputs/SearchBar';
import DatePicker from './Inputs/DatePicker';
import { uuid } from 'uuidv4';
import logger from '../../Utils/logger.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

import '../../Styles/MainContainer/main.css';
import '../../Styles/LoadersSection/loader.css';

function CompanyDetails() {

    const currentDate = Math.floor(new Date().getTime() / 1000);

    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState('');
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    let [getStock, setGetStock] = useState([]);
    const [changeDate, setChangeDate] = useState([]);

    let apiKey = '&token=cbp6qkaad3ieg7faiqng';


    async function companyInfo() {
        await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${inputValue}${apiKey}`,
            {
                method: 'GET',
                mode: 'cors'
            }
        )
            .then(response => response.json())
            .then((data) => {
                let tempData = [];
                tempData.push(data);
                setData(tempData);
            })
            .finally(() => {
                setLoading(false);
                logger.info('Company data fetch completed');
            })
            .catch((error) =>
                logger.error('Error caused due to fetch,' + error));
    };


    async function companyStock() {
        setLoading(true)
        let url = `https://finnhub.io/api/v1/stock/candle?symbol=${inputValue.toUpperCase()}&resolution=1&from=${startDate}&to=${endDate}${apiKey}`
        console.log(url)
        await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${inputValue.toUpperCase()}&resolution=1&from=${startDate}&to=${endDate}${apiKey}`,
            {
                method: 'GET',
                mode: 'cors'
            }
        )
            .then(response => response.json())
            .then((data) => {
                setGetStock(data)
                setChangeDate(data.t);
                if (data.s === 'no_data') {
                    logger.error('No data for current date, nor future date');
                    setErrMsg('Choose data that is nor current, nor future!');

                } else {
                    logger.info('Searching information for: ' + inputValue);

                }
            })
            .finally(() => {
                logger.info('Company stock data fetch completed');
                setLoading(false);
            })
            .catch((error) =>
                logger.error('Error caused due to fetch. ' + error));
        setErrMsg('Choose data that is nor recent, nor future!');
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        companyStock();
        companyInfo();
    }


    function handleEvent(picker) {
        return picker
    }


    function handleCallback(start, end) {
        setStartDate(Math.floor(start._d.getTime() / 1000));
        setEndDate(Math.floor(end._d.getTime() / 1000));
        companyStock();
        logger.info(`Picking start, end dates. From: ${startDate} to: ${endDate}`)
    }


    return (
        <>
            <div className='row w-75 mx-auto py-4 inputContainer'>
                <div className='row mx-auto w-50 d-flex my-2'>
                    <SearchBar
                        handleSubmit={handleSubmit}
                        setInputValue={setInputValue}
                        inputValue={inputValue}
                    />
                </div >

                <div className='row mx-auto'>
                    <DatePicker
                        handleEvent={handleEvent}
                        handleCallback={handleCallback}
                        currentDate={currentDate} />
                </div>
            </div>
            <div className='row mx-auto w-75 h-100'>
                {!loading ?
                    data.map((info) =>
                        <Card
                            key={uuid}
                            errMsg={errMsg}
                            changeDate={changeDate}
                            getStock={getStock}
                            info={info}
                            inputValue={inputValue}
                        />
                    )
                    : (
                        <p className='rounded text-center text-light fs-5 mx-auto p-4 my-3 loading'>No data to load yet...</p>
                    )
                }
            </div>
        </>
    )

}

export default CompanyDetails