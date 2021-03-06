/**
 * Author: Lennart Pegel - https://github.com/justlep
 * License: LGPLv3 (http://www.gnu.org/licenses/lgpl-3.0.txt)
 *
 * @constructor
 */
lep.Encoder = lep.util.extendClass(lep.BaseControl, {
    _init: function(opts) {
        this._super(opts);

        this.sendsDiffValues = (opts.sendsDiffValues!==false);
    }
});