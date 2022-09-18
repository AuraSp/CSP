import React, { Fragment, useEffect, useState } from 'react'
import { MdManageSearch } from 'react-icons/md';

// import '../../../Styles/InputsSection/searchBar.css';

function SearchBar({ handleSubmit, inputValue, setInputValue }) {

  const [barFocus, setBarFocus] = useState(false);
  const [validText, setValidText] = useState(false);

  useEffect(() => {
    let TEXT_REGEX = /^[a-zA-Z\s]*$/;
    setValidText(TEXT_REGEX.test(inputValue));
  }, [inputValue, validText])


  return (
    <Fragment>
      <p className='text-center text-light description'>Use search bar to find out different companies's stock information</p>
      <p className={barFocus && !validText ? 'text-danger text-center error' : ''}>{barFocus && !validText ? 'Up to 35 characters only and no numbers' : ''}</p>

      <form onSubmit={handleSubmit} className='d-flex flex-lg-row flex-md-column flex-sm-column m-md-1 m-sm-0 justify-content-center text-light form'>
        <input
          type='text'
          className='border text-light text-center border-secondary p-md-2 p-sm-2 my-md-1 my-sm-1 mx-lg-3 mx-md-0 mx-sm-0'
          placeholder='Example: AMZN or amzn'
          maxLength='35'
          onFocus={() => setBarFocus(true)}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          data-testid='text' />
        <button type='submit' value='Search' data-testid='submitbtn' className='btn border text-center border-secondary my-sm-1 mx-lg-3 mx-md-0 mx-sm-0' disabled={!validText} ><MdManageSearch className='p-0 m-0 text-light fs-4' /></button>
      </form>
    </Fragment>
  )
}

export default SearchBar