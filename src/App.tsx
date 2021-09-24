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
              <h1>About this site</h1>
              <p>
                Doubleblind.me makes it easy to set up and run double-blinded experiments.
                 It exists because its author wanted a similar tool but couldn't find one online (and because the author is a fan of citizen science).
                 Double-blinding an experiment accounts for the <a href="https://en.wikipedia.org/wiki/Placebo">placebo effect</a> in
                 the result.  Anyone experimenting with substances that may improve their health
                 and well-being should improve their experiments by double-blinding them.
              </p>
              <p>
                 The kind of experiments you can double blind involve substances in opaque capsules and
                 assessments of the efficacy of those substances.  This site helps with double-blinding;
                 it doesn't help you with assessments.  Some examples of substances and assessments:
                <ul>
                  <li>
                     Melatonin -&gt; sleep hours and subjective wakefulness
                  </li>
                  <li>
                     L-Theanine (taken with caffiene) -&gt; subjective "jitteriness"
                  </li>
                </ul>
                Ultimately the goal of an experiment is to discover something that works for you, so the assessment should
                 be one that you're comfortable with.  This author is inclined towards written subjective assessments and a number rating, but you should feel free to use more rigorous methods.
              </p>
            </div>
          </Route>
          <Route path="/guide">
            <div className="textpage">
              <h1>Starting an Experiment</h1>
              <p>
                To get started, you need something to test, capsules, and pill containers.
                 For this guide we'll proceed as if we're testing L-Theanine taken with coffee each morning.
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
