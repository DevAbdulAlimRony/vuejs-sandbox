//Testing Types: Unit, Component,End-to-End

//Unit tests are written to verify that small, isolated units of code are working as expected.

//A component can be tested in two ways: WhiteBox(implementation details and dependencies of a component.), BlackBox(to test the integration of your component and the entire system). Unit Testing Options: Vitest, Jest, Peeky

//Component tests should catch issues relating to your component's props, events, slots that it provides, styles, classes, lifecycle hooks, and more. Options: Vitest, Cypress Component Testing, NightWatch(E2E or end to end testing)

//Cross Browser Component Testing: WebdriverIO

//End-to-end tests focus on multi-page application behavior that makes network requests against your production-built Vue application. They often involve standing up a database or other backend and may even be run against a live staging environment. End-to-end tests will often catch issues with your router, state management library, top-level components (e.g. an App or Layout), public assets, or any request handling. Cypress.