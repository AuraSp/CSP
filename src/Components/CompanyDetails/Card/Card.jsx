import React, { useState, useEffect, Fragment } from 'react';
import HistoryDiagram from '../../Diagram/HistoryDiagram';
import logger from '../../../Utils/logger.js';

import '../../../Styles/Card/card.css';

function Card({ errMsg, inputValue, info, loading, getStock, changeDate }) {

    const [popupOpen, setPopupOpen] = useState(false);
    const [diagramData, setDiagramData] = useState();


    useEffect(() => {
    }, [diagramData])



    const getChart = () => {
        if (changeDate === undefined) {
            logger.error('No timestamp for construction. Maybe data is not fetched fully or choosed recent one?')
        } else {
            logger.info('Constructing new data for diagram')

            let temparr = Array.from({ length: changeDate.length }, (_, i) => ({ Date: changeDate[i], Open: getStock.o[i], High: getStock.h[i], Low: getStock.l[i], Close: getStock.c[i], Volume: getStock.v[i] }))

            setDiagramData(temparr)
            setPopupOpen(true)
        }
    }


    return (
        <div className='row mx-auto'>
            { info === undefined ?
                (
                    <p className='rounded text-center text-light fs-5 mx-auto p-4 my-3 loading'>Company with that name does not exist!</p>
                )
                :
                (
                    <>

                        <img src={info.logo ? info.logo : 'Loading logo...'} alt='Company Logo' className='col-lg-12 col-md-12 col-sm-12 img-thumnbnail p-0 w-25 rounded mx-auto my-3' />
                        <ul className='col-lg-12 col-md-12 col-sm-12 d-flex flex-row flex-wrap justify-content-center list-unstyled my-1 list' data-testid='cardlist'>
                            <li className='col-lg-4 col-md-5 col-sm-12 border m-1 border-danger d-flex justify-content-center align-items-center'><button className='btn border-0 text-light' onClick={getChart}>{info.name}</button></li>
                            <li className='col-lg-4 col-md-5 col-sm-12 border m-1  border-danger d-flex justify-content-center align-items-center text-light'>{info.country}</li>
                            <li className='col-lg-4 col-md-5 col-sm-12 border m-1 border-danger d-flex justify-content-center align-items-center text-light'>{info.currency}</li>
                            <li className='col-lg-4 col-md-5 col-sm-12 border m-1 border-danger d-flex justify-content-center align-items-center'><a href={info.weburl} className='text-decoration-none text-light'>{info.weburl}</a></li>
                        </ul>
                        {changeDate === undefined ?
                            <p className='rounded text-center text-light fs-5 mx-auto p-4 my-3 loading'>{errMsg}</p>
                            :
                            popupOpen &&
                            <HistoryDiagram
                                loading={loading}
                                diagramData={diagramData}
                                inputValue={inputValue}
                            />
                        }
                    </>
                )
            }
        </div >
    )

}

export default Card