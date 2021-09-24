/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import capsules from './capsules-cropped.jpg';
import pillcont from './pillcont-cropped.jpg';
import pillcontNumbered from './pillcont-numbered-cropped.jpg';
import pillcontFilled from './pillcont-numbered-filled-cropped.jpg';

interface GuideProps {
}

/** Guide page.  Text and pictures, no fancy functionality
 *
 * @param props empty props
 * @returns tsx
 */
export function Guide(props: GuideProps) {
  return <div className="textpage">
    <h1>Starting an Experiment</h1>
    <p>
    To get started you need something to test, opaque capsules, and pill containers.
     For this guide we'll proceed as if we're testing L-Theanine taken with coffee each morning.
    </p>
    <div className="imageset">
      <img src={capsules}/>
      <img src={pillcont}/>
    </div>
    <p>
    You'll want to make sure your pill containers have a clear ordering.  Numbering them is good enough.
    </p>
    <div className="imageset">
      <img src={pillcontNumbered}/>
    </div>
    <p>
    Next you'll want to fill your capsules.  For our example we'll be filling 10 capsules with L-Theanine and 10 capsules with sugar.
     It's important that you are unable to distinguish the placebo capsules from the treatment capsules via inspection.  You might weigh
     your capsules and try different inert fillers.  Tweezers are helpful when working with small capsules.
    </p>
    <div className="imageset"></div>
    <p>
    At this point you have all the raw materials for the doubleblinding process.  Enlist a helper and click back to <a href="#">home</a> to get started.
    Once you're done, you'll have your control and treatment pills randomly placed in your pill containers, and you'll have a key file that reveals the real contents
    of each capsule, to consult after your experiment is over.
    </p>
    <div className="imageset">
      <img src={pillcontFilled}/>
    </div>
  </div>;
}
