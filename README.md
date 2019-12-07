# CRA RBC Test

In this repository I am exploring how RBC-utilizing components could be tested
using `npm test` in CRA.

RBC here refers to [React Big Calendar](https://github.com/intljusticemission/react-big-calendar).
It's a shitty component, but writing your own is shitty, too, so there's that.
It's also a complex component and in most applications I believe it will get wrapped in a nicer component with a more
focused and smaller API surface, so I will specifically test a component which uses RBC internally.
Not to mention you'd wanna do that to provide a better types for RBC, because its types, while constantly receiving more
attention and improving, are not great and the underlying API design is not stellarly type-friendly either.

I read up on [testing components in CRA](https://facebook.github.io/create-react-app/docs/running-tests#testing-components).

From there I found that a good way is to use Enzyme and[] shallow rendering](https://facebook.github.io/create-react-app/docs/running-tests#option-1-shallow-rendering).

I put aside [Jest matchers](https://jestjs.io/docs/en/expect.html#content) for reference.

I considered [testing stateful components](https://www.reactnative.guide/7-testing/7.3-enzyme-testing.html),
but have decided to instance use the Enzyme accessors to test `props` of rendered VDOM tree of the component.

Enzyme allows simulating user interaction, so almost anything we would otherwise need state for can be tested that way.
For example, a simple test of whether upon pressing an element, a modal appears, could consist of locating the button,
thus ensuring it got rendered, then simulating a click on it, and then traversing the VDOM again looking for the modal
container, ensuring _that_ got rendered, too.

I am also using full DOM rendering when testing the calendar innards itself as
it is a 3rd party library and I cannot test its components in isolation.

Debugging in the tests is supported and configured as per
[Debugging Jest tests](https://facebook.github.io/create-react-app/docs/debugging-tests#debugging-tests-in-visual-studio-code)

You can use the VS Code debugger with the *Debug CRA tests* configuration.

## To-Do

### Set up a GitHub Actions workflow for deploying GitHub Pages from `docs`
