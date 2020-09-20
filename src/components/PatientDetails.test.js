import React from 'react';
import {
    BrowserRouter,
  } from "react-router-dom";
  import '@testing-library/jest-dom/extend-expect';
  import {render, waitForElement, fireEvent} from '@testing-library/react';
  import {unmountComponentAtNode } from "react-dom";
  import { act } from "react-dom/test-utils";
import PatientDetails from './PatientDetails.js';

let container = null;
const match = {params : { id: 1 } }

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
    const { getByText } = render(<BrowserRouter><PatientDetails match={match}/></BrowserRouter>);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  
  it("renders with patient data", async () => {
    const fakePatient = {
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
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakePatient)
      })
    );
  
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<PatientDetails match={match}/>, container);
    });

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });