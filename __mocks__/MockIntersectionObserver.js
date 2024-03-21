// __mocks__/IntersectionObserverMock.js

class MockIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }

  observe(target) {
    this.target = target;
    this.callback([{ isIntersecting: true }], this);
  }

  unobserve() {
    this.target = null;
  }

  disconnect() {
    this.target = null;
  }
}

export default MockIntersectionObserver;
