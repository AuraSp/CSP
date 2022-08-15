import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchBar from '../SearchBar';

describe('testig input field', () => {
    test('render text input', () => {
        render(<SearchBar />);

        const inputEl = screen.getByTestId('text');
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveAttribute('type', 'text');
    });
})