import React from 'react';
import {
    BrowserRouter,
  } from "react-router-dom";
  import '@testing-library/jest-dom/extend-expect';
  import {render, waitForElement} from '@testing-library/react';
  import EditPatient from './EditPatient.js';

const match = {params : { id: 1} }

it('renders with loading spinner', () => {
    const { getByText } = render(<BrowserRouter><EditPatient match={match}/></BrowserRouter>);
    expect(getByText('Loading...')).toBeInTheDocument();
  });