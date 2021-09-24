/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import capsules from './capsules-cropped.jpg';
import pillcont from './pillcont-cropped.jpg';
import pillcontNumbered from './pillcont-numbered-cropped.jpg';
import pillcontFilled from './pillcont-numbered-filled-cropped.jpg';
import keyfile from './keyfile.jpg';
import {NavLink} from 'react-router-dom';

interface GuideProps {
}

/** Guide page.  Text and pictures, no fancy functionality
 *
 * @param props empty props
 * @returns tsx
 */
export function Guide(props: GuideProps) {
  return <div className="textpage">
    <h1>
      Short Guide
    </h1>
    <p>
      You will need to fill two sets of indistinguishable capsules:
        one set with the substance you are testing
        (the <em>treatment</em>), the other with some inert
        substance like sugar (the <em>control</em>, a placebo).
        This site will then walk you and a helper through the process
        of filling up a weekly/monthly pill organizer with your capsules,
        ordered randomly so that neither you nor your helper know
        which days' capsules contain which substances.
        To accomplish this, you and your helper will do different parts
        of the randomization without communcating.
        At the end of this process, you'll download a key
        that will let you know the real contents for each capsule --
        make sure not to check it until your experiment is done.
    </p>
    <h1>Long Guide (in progress!)</h1>
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
    At this point you have all the raw materials for the doubleblinding process.  Enlist a helper and click back to <NavLink to="/">home</NavLink> to get started.
    Once you're done, you'll have your control and treatment pills randomly placed in your pill containers, and you'll have a key file that reveals the real contents
    of each capsule, to consult after your experiment is over.
    </p>
    <div className="imageset">
      <img src={pillcontFilled}/>
      <img src={keyfile}/>
    </div>
  </div>;
}
