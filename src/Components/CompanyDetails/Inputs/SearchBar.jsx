import React, { useEffect, useState } from 'react'
import { MdManageSearch } from 'react-icons/md';

import '../../../Styles/InputsSection/searchBar.css';

function SearchBar({ handleSubmit, inputValue, setInputValue }) {

  const [barFocus, setBarFocus] = useState(false);
  const [validText, setValidText] = useState(false);

  useEffect(() => {
    let TEXT_REGEX = /^[a-zA-Z\s]*$/;
    setValidText(TEXT_REGEX.test(inputValue));
  }, [inputValue, validText])


  return (
    <>
      <p className='text-center text-light description'>Use search bar to find out different companies's stock information</p>
      <p className={barFocus && !validText ? 'text-danger text-center error' : ''}>{barFocus && !validText ? 'Up to 35 characters only and no numbers' : ''}</p>

      <form onSubmit={handleSubmit} className='d-flex flex-row justify-content-center text-light form'>
        <input
          type='text'
          className='border text-light text-center border-danger mx-3'
          placeholder='Example: AMZN or amzn'
          maxLength='35'
          onFocus={() => setBarFocus(true)}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          data-testid='text' />
        <button type='submit' value='Search' data-testid='submitbtn' className='btn border text-center border-danger mx-3' disabled={!validText} ><MdManageSearch className='p-0 m-0 text-light fs-4' /></button>
      </form>

    </>
  )

}

export default SearchBar