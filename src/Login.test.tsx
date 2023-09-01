import React from 'react';
import { renderHook, act } from "@testing-library/react";
import useLogin from "./services/useLogin";
import { DogContext } from "./App";

const mockedUser = {
  email: "test@gmail.com",
  name: "Test User",
};
const mockedContextData = {
  loggedIn: false,
  email: "",
  name: "",
  selectedDogs: [],
  favoriteDogs: [],
  currentPage: 0,
  nextQueryParams: "",
  prevQueryParams: "",
}

const mockContext = {
  stateContext: mockedContextData,
  setStateContext: jest.fn(),
};

describe("Login functionality", () => {
  it("User is able to log in with correct data", async () => {
    const mockFetch = jest.fn(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    global.fetch = mockFetch;

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DogContext.Provider value={mockContext}>{children}</DogContext.Provider>
    );

    const { result } = renderHook(() => useLogin(mockedUser), { wrapper });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.isSuccessful).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('');
  });

  it ("Proper error message is returned to user", async () => {
    const mockFetch = jest.fn(async () => 
      Promise.reject({
        ok: false,
        json: () => Promise.reject(),
      })
    ) as jest.Mock;

    global.fetch = mockFetch.mockResolvedValue('');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DogContext.Provider value={mockContext}>{children}</DogContext.Provider>
    );

    const { result } = renderHook(() => useLogin(mockedUser), { wrapper });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.isSuccessful).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Ooops! Something went wrong in the magical realm of logins. Please, try again.');
  })
});