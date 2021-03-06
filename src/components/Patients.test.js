import React from 'react';
import {
    BrowserRouter,
  } from "react-router-dom";
  import '@testing-library/jest-dom/extend-expect';
  import {render, waitForElement} from '@testing-library/react';
  import Patients from './Patients.js';
  import {unmountComponentAtNode } from "react-dom";
  import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it('renders with loading spinner', () => {
    const { getByText } = render(<BrowserRouter><Patients/></BrowserRouter>);
    expect(getByText('Loading...')).toBeInTheDocument();
  });



  it("renders with patients data", async () => {
    const fakePatients = [{
      age: 11,
      city: "Marksville",
      email: "markmarky@email.com",
      firstName: "Mark",
      gender: "Male",
      height: 111,
      id: 1,
      insurance: "Blue Cross Blue Shield",
      lastName: "Marky",
      postal: "11111",
      ssn: "111-11-1111",
      state: "IL",
      street: "Mark Street",
      weight: 111
    },
    {
      age: 22,
      city: "Matthewsville",
      email: "matthewmatthias@email.com",
      firstName: "Matthew",
      gender: "Female",
      height: 222,
      id: 2,
      insurance: "Blue Cross Blue Shield",
      lastName: "Matthias",
      postal: "22222",
      ssn: "222-22-2222",
      state: "IL",
      street: "Matthew Street",
      weight: 222
      
    }
  ];
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakePatients)
      })
    );
  
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<Patients/>, container);
    });

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });