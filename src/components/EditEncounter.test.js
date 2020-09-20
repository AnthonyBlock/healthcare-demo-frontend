import React from 'react';
import {
    BrowserRouter,
  } from "react-router-dom";
  import '@testing-library/jest-dom/extend-expect';
  import {render, waitForElement} from '@testing-library/react';
  import EditEncounter from './EditEncounter.js';

const match = {params : { id: 3, patientId: 1} }

it('renders with loading spinner', () => {
    const { getByText } = render(<BrowserRouter><EditEncounter match={match}/></BrowserRouter>);
    expect(getByText('Loading...')).toBeInTheDocument();
  });