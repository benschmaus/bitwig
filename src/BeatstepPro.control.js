/**
 * Bitwig Controller Script for the Arturia Beatstep Pro
 * v1.2
 *
 * Author: Lennart Pegel - https://github.com/justlep/bitwig
 * License: LGPLv3 (http://www.gnu.org/licenses/lgpl-3.0.txt)
 *
 * What it does:
 *   - Adds Beatstep's three sequencers as selectable MIDI inputs ("BSP-S1", "BSP-S2" and "BSP-DRUM"),
 *     using extra short names, so it's more easy to spot which track they are assigned to.
 *     (Names are only sensible if you use Beatstep's default settings where Sequencer1 is using MIDI channel 1,
 *     Sequencer2 using channel 2 and Drum sequencer on MIDI channel 10)
 *   - The other MIDI channels are added as selectable MIDI inputs, too: "BSP-3" to "BSP-9" and "BSP-11" to "BSP-16"
 *   - Sends Bitwig's MIDI clock to the Beatstep, so Beatstep can be switched to "USB" sync mode and, thus,
 *     will start/stop/run synchronously with Bitwig.
 *   - Knobs in control mode are mappable. However, as Beatstep Pro doesn't seem to receive CC messages,
 *     value changes made manually in the Bitwig GUI won't update the value of the mapped Beatstep encoder :(.
 *
 * - [DONE] re-check if BeatstepPro really cannot receive CCs
 *          => reply from Arturia saying BSP's values cannot be updated via CC messages ;-(
 */

loadAPI(1);
load('lep/api.js');
load('beatsteppro/BeatstepPro.js');

// @deprecationChecked:1.3.5
host.defineController("Arturia Beatstep Pro", "BSP", "1.2", "6ae51a34-3310-11e5-a151-feff819cdc9f", "github@justlep.net");
host.addDeviceNameBasedDiscoveryPair(["Arturia BeatStep Pro"], ["Arturia BeatStep Pro"]);
host.defineMidiPorts(1, 1);

function init() {
    lep.setLogLevel(lep.LOGLEVEL.WARN);
    BeatstepPro.getInstanceForMainChannels();
    println('\n-------------\nBeatstepPro ready');
}

/** @Override */
function exit() {}
