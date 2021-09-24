/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {DblndFlow} from './layout-components/dblnd-flow';
import {Header} from './layout-components/header';

/** Doubleblind.me react application
 *
 * App is the root.  It should contain very little, but at the moment it contains
 * all the phase machinery, which should live elsewhere.  Still thinking about the
 * organization.
 *
 * @returns React App
 */
function App() {
  // const leavePageWarning = (e: BeforeUnloadEvent) => {
  //   e.preventDefault();
  //   e.returnValue = 'Are you sure you want to leave? All progress will be lost.';
  //   return e.returnValue;
  // };
  // useEffect(() => {
  //   window.addEventListener('beforeunload', leavePageWarning);
  //   return () => {
  //     window.removeEventListener('beforeunload', leavePageWarning);
  //   };
  // });

  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <DblndFlow />
          </Route>
          <Route path="/about">
            <div className="textpage">
              <section>
                <h1>About this site</h1>
                <p>
                Doubleblind.me makes it easy to set up and run double-blinded experiments.
                 It exists because the author (Adam) wanted a similar tool but couldn't find one online.
                 Double-blinding an experiment removes the <a href="https://en.wikipedia.org/wiki/Placebo">placebo effect</a>
                 from the result.  Anyone interested in substances that may improve their health
                 and well-being should improve their experiments by double-blinding them.
                </p>
              </section>
              <p>
                This site only helps with double-blinding, it doesn't help you with assessments or offline setup, other than providing a guide.

              </p>
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

// possibly should live elsewhere
interface PhaseContext {
  next: (component: JSX.Element) => void;
  back: () => void;
}
export const phaseContext = React.createContext<PhaseContext>({next: (c) => {}, back: () => {}});
