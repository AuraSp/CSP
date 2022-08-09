import React from 'react';
import { AiOutlineStock } from "react-icons/ai";

function Header() {
    return (
        <header className='row col-lg-12 col-md-12 col-sm-12 p-0 mx-0 my-4'>
            <span className="navbar-brand text-center text-light fs-4"><AiOutlineStock className='text-warning fw-bold fs-2 mx-1' /><span className='text-dark'>StockRec</span></span>
        </header>
    )
}

export default Header