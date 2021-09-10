/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {PHASES} from './enums';

/** Returns the TSX fragments that make up the content for each phase.
 *
 * Large amounts of text and html-analogues are contained in this function,
 * instead of being interspersed with TS logic elsewhere.  Most phases
 * will require additional functionality/components.
 *
 * @param {PHASES} phase Phase of dblnd flow
 * @return {JSX.Element} The fragments corresponding to the passed in phase
 */
export function getPhaseTsxContent(phase: PHASES): JSX.Element {
  switch (phase) {
    case PHASES.INTRO: {
      return (
        <>
          <h1>
            Welcome!
          </h1>
          <h2>
            This website is a tool that makes it easy
             to set up double-blinded experiments
          </h2>
          <p>
            To run a double-blind placebo-controlled experiment,
             you will need to start with some offline work.
             Guides can be found across the web, but
             A short rundown follows:
          </p>
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
             make sure not to check it until your experiment is done!
          </p>
          <h3>
            What you will need before proceeding:
          </h3>
          <ul>
            <li>
              <p>
                Two sets of indistinguishable capsules:
                 one treatment set and one control set
              </p>
            </li>
            <li>
              <p>
                A pill organizer or organizers with a clear ordering.
                 This site uses numbers, but dates work just fine.
              </p>
            </li>
            <li>
              <p>
                A helper!  This site will do its best to guide the helper
                 through their part of the process.
                 They will only need to carefully follow instructions.
              </p>
            </li>
          </ul>
          <h3>
            When you're ready, click <em>Next phase</em>
          </h3>
        </>
      );
    }
    case PHASES.GET_DETAILS: {
      return (
        <>
          <h1>
            Provide details for your experiment below
          </h1>
          <p>
            Try to make sure the diagram matches your setup with pill containers,
             since we'll use the diagram to show where pills should be placed/swapped later.
             The dark gray cells are unused.
          </p>
        </>
      );
    }
    case PHASES.PILE_INSTRUCTIONS: {
      return (
        <>
          <h1>
            Arrange Workspace
          </h1>
          <p>
            We randomize whether the control pile goes on the left or the right.
             Be sure not to share this information with your helper.
          </p>
        </>
      );
    }
    case PHASES.TRANSITION_HELPER: {
      return (
        <>
          <h1>
            Helper Transition
          </h1>
          <p>
            Now it's time to pass things off to your helper.
             You'll want to call them and and leave the room before they
             start on the next phase.  When the helper is sitting at
             the computer and the user has left, click "Next phase"
          </p>
        </>
      );
    }
    case PHASES.HELPER_INSTRUCTIONS: {
      return (
        <>
          <h1>
            Helper Instructions
          </h1>
          <p>
            Welcome, and thanks for helping.  Your task will be to take pills
             individually from the 2 piles/containers in front of you and
             place them into the pill organizer.  The two piles/containers in front
             of you look the same but have different contents, so you'll need
             to be careful to place a capsules from the correct pile/container into each
             space.
          </p>
          <p>
             When you're ready to see which capsules go where, click "Next Phase"
          </p>
        </>
      );
    }
    case PHASES.PHASE_ONE_BLINDING: {
      return (
        <>
          <h1>
            Phase One Blinding
          </h1>
        </>
      );
    }
    case PHASES.TRANSITION_EXPERIMENTER: {
      return (
        <>
          <h1>
            Experimenter Transition
          </h1>
          <p>
            OK, thanks again for your help!  The only thing left for you
             to do is to *not* reveal any information about your part
             of the double-blinding
             to the person you're helping.  You can go ahead and have them
             come back -- they still have more work to do with these
             capulses.  You'll need to leave
             the room again before they get started.
          </p>
          <p>
             When the user is sitting at the computer and
             the helper has left, click "Next Phase"
          </p>
        </>
      );
    }
    case PHASES.EXPERIMENTER_INSTRUCTIONS: {
      return (
        <>
          <h1>
            Experimenter Instructions
          </h1>
          <p>
            Welcome back! You should have filled pill containers in front of you.
             Your helper filled them using the two piles/containers you left.
             Now you're going to shuffle them, so that neither you nor your
             helper knows which capsules are treatment and which are control.
             In the next phase you'll see a diagram showing you which capsules to swap.
             You can press space or use the arrow keys to advances steps.
             Be sure to swap the capsules
             in the order provided, and you might want to get some tweezers.
          </p>
          <p>
            When you're ready to start swapping capsules, click "Next Phase"
          </p>
        </>
      );
    }
    case PHASES.PHASE_TWO_BLINDING: {
      return (
        <>
          <h1>
            Phase Two Blinding
          </h1>
        </>
      );
    }
    case PHASES.FILE_DOWNLOAD: {
      return (
        <>
          <h1>File Download</h1>
          <p>
            Click the button below to download the key for this experiment.
             Don't open it until you're done with your experiment.
             It will tell you which pills were in fact treatment
             and which were control.  The double-blinding process is done, but
             I'd appreciate it if you clicked "Next Phase" to provide any
             feedback on this website/the process, since it's very much
             a work in progress.  Cheers!
          </p>
        </>
      );
    }
    case PHASES.OUTRO: {
      return (
        <>
          <h1>
            Thanks for using doubleblind.me
          </h1>
          <p>
            I don't have the feedback form set up yet, since this site doesn't
             have a real backend. I've just been sharing this site directly with folks
             for feedback, so send Adam your thoughts/ideas, thanks!
          </p>
        </>
      );
    }
    default:
      return <h3>BROKEN</h3>;
  }
};
