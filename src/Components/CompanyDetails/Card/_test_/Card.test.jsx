import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, cleanup } from '@testing-library/react';
import Card from '../Card'

describe('testing component rendering', () => {

  test('renders correctly', () => {
    const tree = renderer.create(<Card />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});