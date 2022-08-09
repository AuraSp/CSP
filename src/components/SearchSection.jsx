import React, { useRef, useState, useEffect } from 'react';
import { BsBuilding } from "react-icons/bs";

function SearchSection() {
    // fetchData(text) {
    //     this.setState({ text });
    //     const apikey = '&apikey=thewdb';
    //     const url = 'http://www.omdbapi.com/?s=';
    //     fetch(url + text + url)
    //         .then(response => response.json())
    //         .then((responseJson) => {
    //             this.setState({
    //                 dataSource: responseJson.Search,
    //             });
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }
    const [userFocus, setUserFocus] = useState(false);
    const [text, setText] = useState('');
    const [errMsg, setErrMsg] = useState();
    const errRef = useRef();

    const TEXT_REGEX = /^[a-z][a-z\s]*$/;

    useEffect(() => {
        setErrMsg('');
        setUserFocus(TEXT_REGEX.test(text));
    }, [text])

    return (
        <div className="mx-auto w-75 my-5">
            <p className="text-center">Use search bar to find out different companies's stock information</p>
            <p ref={errRef} className={userFocus && text ? '' : 'text-danger text-center m-0 p-0'}>{userFocus && !errMsg ? '' : 'Up to 35 characters only and no numbers'}</p>
            <div className="d-flex flex-row">
                <span className="border border-2 h-100 fs-4 rounded px-2 mx-1">
                    <BsBuilding className={userFocus && !errMsg ? '' : 'text-danger'}/>
                </span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Company name"
                    maxLength="35"
                    onFocus={() => setUserFocus(true)}
                    onChange={(e) => setText(e.target.value)}
                    value={text} />
            </div>
        </div >
    )
}

export default SearchSection