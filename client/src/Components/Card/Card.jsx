import React, { useState, useEffect, Fragment } from 'react';
import HistoryDiagram from '../../Diagram/HistoryDiagram';

// import '../../../Styles/Card/card.css';

function Card({ info, stocks, time }) {

    //MODAL FOR DIAGRAM
    const [popUp, setPopup] = useState(false);

    //ERROR STATE VARIABLE FOR STOCK(if no data exists or not enough)
    const [errMsg, setErrMsg] = useState('');

    //STATE VARIABLE FOR DIAGRAM
    const [diagramData, setDiagramData] = useState();

    //UPDATING STOCK DATA(according to date)
    useEffect(() => {
        if (stocks.s === "no_data") {
            setErrMsg('Using current dates! No data to show');
            const postToLogs = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    level: 'warn',
                    message: 'Object is empty for choosen data'
                })
            };
            fetch('http://localhost:5500/api/postLogs/', postToLogs);
        } else if (stocks.s === "ok" && time.length === 1) {
            setErrMsg('Not enough stock data to render! Choose at least 10 days gap');
            const postToLogs = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    level: 'warn',
                    message: 'Object has not enough stock info to construct diagram'
                })
            };
            fetch('http://localhost:5500/api/postLogs/', postToLogs);
        } else {
            let temp = Array.from({ length: time.length }, (_, i) => ({ Date: stocks.t[i], Open: stocks.o[i], High: stocks.h[i], Low: stocks.l[i], Close: stocks.c[i], Volume: stocks.v[i] }));
            setDiagramData(temp);
        }
    }, [time]);

    //INTERACTIVE BUTTON FOR DIAGRAM DISPLAY
    const getChart = () => {
        setPopup(true);
    };


    return (
        <div className='row mx-auto'>
            {Object.entries(info).length === 0 ?
                (
                    <p className='rounded text-center text-light fs-5 mx-auto p-4 my-3 loading'>Company with that name does not exist!</p>
                )
                :
                (
                    <Fragment>

                        <img src={info.logo ? info.logo : 'No logo...'} alt='Company Logo' className='col-lg-12 col-md-12 col-sm-12 img-thumnbnail p-0 w-25 rounded mx-auto my-3' />
                        <ul className='col-lg-12 col-md-12 col-sm-12 d-flex flex-row flex-wrap justify-content-center list-unstyled my-1 list' data-testid='cardlist'>
                            <li className='col-lg-4 col-md-5 col-sm-12 border m-1 border-danger d-flex justify-content-center align-items-center'><button className='btn border-0 text-light' onClick={getChart}>{info.name}</button></li>
                            <li className='col-lg-4 col-md-5 col-sm-12 border m-1  border-danger d-flex justify-content-center align-items-center text-light'>{info.country}</li>
                            <li className='col-lg-4 col-md-5 col-sm-12 border m-1 border-danger d-flex justify-content-center align-items-center text-light'>{info.currency}</li>
                            <li className='col-lg-4 col-md-5 col-sm-12 border m-1 border-danger d-flex justify-content-center align-items-center'>{info.weburl ? <a href={info.weburl} className='text-decoration-none text-light'>{info.weburl}</a> : 'No website url'}</li>
                        </ul>
                        {popUp && (
                            !diagramData ? errMsg : <HistoryDiagram
                                diagramData={diagramData
                                } />
                        )}
                    </Fragment>
                )
            }
        </div >
    )

}

export default Card