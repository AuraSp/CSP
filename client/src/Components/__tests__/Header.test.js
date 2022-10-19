import React from 'react';
import Header from '../Header';

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/react';


afterEach(cleanup)

test('should render header text', () => {
    const { getByTestId } = render(<Header />);
    const headerEl = getByTestId('header');

    expect(headerEl.textContent).toBe('StockRec');
})


