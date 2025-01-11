import "@testing-library/jest-dom";

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Global test setup
beforeAll(() => {
  jest.clearAllMocks();

  // Mock localStorage with complete Storage interface
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    length: 0,
    key: jest.fn(),
    [Symbol.iterator]: jest.fn(),
  } as Storage;

  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
});

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

afterAll(() => {
  jest.resetAllMocks();
});
