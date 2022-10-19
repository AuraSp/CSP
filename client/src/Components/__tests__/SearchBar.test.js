import React from 'react';
import SearchBar from '../Input/SearchBar';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'

afterEach(cleanup)

test('should render searchbar text', () => {
    const { getByTestId } = render(<SearchBar />);
    const searchEl = getByTestId('searchbar');

    expect(searchEl.textContent).toBe('Use search bar to find out different companies\'s stock information');
})

test('should have empty input', () => {
    const { getByTestId } = render(<SearchBar />);
    const inputEl = getByTestId('input');

    expect(inputEl.value).toBe('');
})

// test('should have text type of the input', () => {
//     const { getByTestId } = render(<SearchBar />);
//     const inputEl = getByTestId('input');

// })