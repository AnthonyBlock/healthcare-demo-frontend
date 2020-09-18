import React from 'react';
import {
    BrowserRouter,
  } from "react-router-dom";
  import '@testing-library/jest-dom/extend-expect';
  import {render, waitForElement} from '@testing-library/react';
  import Patients from './Patients.js';
import fetchMock from "fetch-mock";

afterEach(() => {
  fetchMock.restore();
})



it('renders with loading spinner', () => {
    const { getByText } = render(<BrowserRouter><Patients/></BrowserRouter>);
    expect(getByText('Loading...')).toBeInTheDocument();
  });




it('Renders properly after fetch', async () => {
  const patients = [
    {
        'age': 11,
        'city': "Marksville",
        'email': "markmarky@email.com",
        'firstName': "Mark",
        'gender': "Male",
        'height': 111,
        'id': 1,
        'insurance': "Blue Cross Blue Shield",
        'lastName': "Marky",
        'postal': "11111",
        'ssn': "111-11-1111",
        'state': "IL",
        'street': "Mark Street",
        'weight': 111
    },
    {
        'age': 22,
        'city': "Matthewsville",
        'email': "matthewmatthias@email.com",
        'firstName': "Matthew",
        'gender': "Female",
        'height': 222,
        'id': 2,
        'insurance': "Blue Cross Blue Shield",
        'lastName': "Matthias",
        'postal': "22222",
        'ssn': "222-22-2222",
        'state': "IL",
        'street': "Matthew Street",
        'weight': 222

      }

    ]

    fetchMock.mock(`http://localhost:8080/patients/`, {
    body: patients,
    status: 200
    });

    const {getByText} = render(<Patients/>);

    const patient1 = await waitForElement(
      () => getByText('Mark'))

      setTimeout(() => expect(patient1).toBeInTheDocument(), 2000);
  
  })