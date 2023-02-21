import { useEffect, useMemo, useState } from "react";
import useSound from 'use-sound';
import goodNotes from "../assets/goodNotes.wav";
import wrongNotes from "../assets/wrongNotes.wav";
import { GameState, ScheduledNote } from "../gameCore/gameState";
import { pick } from "../utils/pick";

/** Monitors given sequenced-notes log and plays any it has not yet played 
 * 
 * @returns: a simple sound player function just so the sounds can be triggered manually for demoing purposes.
*/

export function useSequencedSoundConsumer(notesSchedule: ScheduledNote[], soundIsOn: boolean) {

    const [playGoods] = useSound(goodNotes, {
        sprite: {
            good1: [0, 2500],
            good2: [2500, 2500],
            good3: [5040, 2500],
            good4: [7555, 2500],
            good5: [10090, 2500],
            good6: [12620, 2500]
        }
    });
    const [playBads] = useSound(wrongNotes, {
        sprite: {
            bad1: [0, 2400],
            bad2: [2430, 2090],
            bad3: [4530, 2530],
            bad4: [7088, 2700],
        }
    });


    const soundPlayer = useMemo(() => ({
        play: function (soundToPlay: "match" | "no-match") {

            function playGoodSound() {
                playGoods({ id: "good" + pick([1, 2, 3, 4, 5, 6]) });
            }

            function playBadSound() {
                playBads({ id: "bad" + pick([1, 2, 3, 4]) });
            }

            if (soundToPlay === "match") {
                playGoodSound();
            } else {
                playBadSound();
            }
        }
    }), [playGoods, playBads]);

    const [notesPlayedUpToTime, setNotesPlayedUpToTime] = useState<number>(0);


    //"Consume" any notes sequenced by the reducer but as yet unplayed notes - sounding them
    useEffect(() => {
        // const allNotes = [...notesToPlayLog];
        const mostRecentNote = notesSchedule.at(-1);
        if (mostRecentNote) {
            const { note, timeIssued } = mostRecentNote;
            if (notesPlayedUpToTime < timeIssued) {
                if (soundIsOn) {
                    soundPlayer.play(note);
                }
                setNotesPlayedUpToTime(timeIssued);
            }
        }
    }, [notesSchedule]);
    return soundPlayer;
}
