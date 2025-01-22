# pirate memory game - react

This is a very rough implementation of the fantastic card/board game "Memoarrr!" originally by Carlo Bortolini.

It is implemented only for educational purposes, with React, TypeScript, useReducer.

Rules of the original game: https://cdn.1j1ju.com/medias/92/7e/34-memoarrr-rulebook.pdf

## TODO:

-   animate treasure sliding towards the relevant player when they are awarded it
-   add sound for treasure pick-up
-   show treasure cards in player area

-   Sound: down-play the "no-match" sound (much shorter, perhaps percussion)
-   Alternative Sound: consider using 5 pitches for the 5 different backgrounds, on 5 instruments for the 5 animals. That way the game could be played somewhat by ear. However, the frequently-changing instrument will likely be annoying.

### DONE:

-   Lay out players on two, three, or four sides of the card grid.
    -   show them being grayed out when they are eliminated

## Design points of note:

### How I handle playing sound-effects in a reducer-based React app

**Background - why isn't it simple?**

A reducer function must be pure and easily tested, so it's not ok to go playing sound effects from within it as side-effects. (Further, it can be called twice in dev mode, and further, the resources it needs (useSound hook) are not available to a plain old function and would need to be supplied in a messy closure).

**Solution**

On recognising certain events (e.g. a card match) the reducer function appends a ScheduledNote to an array of scheduledNotes in the gameState. This includes the time it was scheduled \*.

In the main React component, there's a useEffect hook which registers a function to run every time the reducer's gameState output has a changed scheduledNotes array.

The useEffect-registered function plays sounds (using sound-playing functions provided by useSound) for the last note (if any) that has not yet been played, and updates a record of what has been played (the time of that scheduled note). It could trigger sounds for ALL uplayed scheduled notes, but that wouldn't be helpful in our case.

(\*Strictly it should just have a deterministic sequence number, but using the wallclock time makes it simpler to have this sequence number never repeat (e.g. on resetting the game state for a new game)).
