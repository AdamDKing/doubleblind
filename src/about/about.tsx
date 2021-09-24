/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';

interface AboutProps {
}

/** About page.  Text, no fancy functionality
 *
 * @param props empty props
 * @returns tsx
 */
export function About(props: AboutProps) {
  return <div className="textpage">
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
  </div>;
}
