import React from 'react';
import { AiOutlineStock } from "react-icons/ai";

import '../Styles/Header/header.css';


function Header() {

    return (
        <header className='row col-lg-12 col-md-12 col-sm-12 px-0 py-4 mx-0 headerLogo'>
            <span className="navbar-brand text-center fs-2">
                <AiOutlineStock className='text-danger fw-bold fs-2 mx-1' />
                <span className='text-light'>Stock<b className='text-danger'>Rec</b></span>
            </span>
        </header>
    )

}

export default Header