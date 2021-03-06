/**
 * Author: Lennart Pegel - https://github.com/justlep
 * License: LGPLv3 (http://www.gnu.org/licenses/lgpl-3.0.txt)
 *
 * @constructor
 */
lep.StandardRangedValue = lep.util.extendClass(lep.BaseValue, {

    _init: function(opts) {
        this._super(opts);

        lep.util.assertObject(opts.rangedValue, 'Missing rangedValue for {}', opts.name);
        lep.util.assertStringOrEmpty(opts.label, 'Invalid label for {}', opts.name);

        var self = this;

        this.rangedValue = opts.rangedValue;
        if (opts.label) {
            this.rangedValue.setLabel(opts.label);
        }
        this.rangedValue.addValueObserver(128, function(newValue) {
            self.value = newValue;
            self.syncToController();
        });
    },

    /**
     * Set the value of this SRV manually (i.e. programmatically instead of MIDI-value-received or observer event)
     */
    setValue: function(value, optionalRange) {
        this.rangedValue.set(value, optionalRange || 128);
    },
    /** @Override */
    setIndication: function(on) {
        // lep.logDebug('setIndications({}) for {}', on, this.name);
        this.rangedValue.setIndication(on);
    },
    /** @Override */
    onRelativeValueReceived: function(delta, range) {
        this.rangedValue.inc(delta, range);
    },
    /** @Override */
    onAbsoluteValueReceived: function(absoluteValue, optionalRange) {
        this.rangedValue.set(absoluteValue, optionalRange || 128);
    }
});

/** @static */
lep.StandardRangedValue.createVolumeValue = function(channelBank, channelIndex) {
    lep.util.assertObject(channelBank, 'Invalid channelBank for StandardRangedValue.createVolumeValue');
    lep.util.assertNumber(channelIndex, 'Invalid channelIndex for StandardRangedValue.createVolumeValue');
    return new lep.StandardRangedValue({
        name: lep.util.formatString('Vol{}', channelIndex),
        rangedValue: channelBank.getChannel(channelIndex).getVolume()
    });
};

/** @static */
lep.StandardRangedValue.createPanValue = function(channelBank, channelIndex) {
    lep.util.assertObject(channelBank, 'Invalid channelBank for StandardRangedValue.createPanValue');
    lep.util.assertNumber(channelIndex, 'Invalid channelIndex for StandardRangedValue.createPanValue');
    return new lep.StandardRangedValue({
        name: lep.util.formatString('Pan{}', channelIndex),
        rangedValue: channelBank.getChannel(channelIndex).getPan()
    });
};

/** @static */
lep.StandardRangedValue.createSendValue = function(channelBank, channelIndex, sendIndex) {
    lep.util.assertObject(channelBank, 'Invalid channelBank for StandardRangedValue.createSendValue');
    lep.util.assertNumber(channelIndex, 'Invalid channelIndex for StandardRangedValue.createSendValue');
    lep.util.assertNumber(sendIndex, 'Invalid sendIndex for StandardRangedValue.createSendValue');
    return new lep.StandardRangedValue({
        name: lep.util.formatString('Send{}/CH{}', sendIndex, channelIndex),
        rangedValue: channelBank.getChannel(channelIndex).getSend(sendIndex)
    });
};

/** @static */
lep.StandardRangedValue.createMacroValue = function(cursorDevice, macroIndex) {
    lep.util.assertObject(cursorDevice, 'Invalid cursorDevice for StandardRangedValue.createMacroValue');
    lep.util.assertNumber(macroIndex, 'Invalid macroIndex for StandardRangedValue.createMacroValue');
    return new lep.StandardRangedValue({
        name: lep.util.formatString('Macro{}', macroIndex),
        rangedValue: cursorDevice.getMacro(macroIndex).getAmount()
    });
};

/** @static */
lep.StandardRangedValue.createParamValue = function(cursorDevice, paramIndex) {
    lep.util.assertObject(cursorDevice, 'Invalid cursorDevice for StandardRangedValue.createParamValue');
    lep.util.assertNumber(paramIndex, 'Invalid paramIndex for StandardRangedValue.createParamValue');
    return new lep.StandardRangedValue({
        name: lep.util.formatString('Param{}', paramIndex),
        rangedValue: cursorDevice.getParameter(paramIndex)
    });
};
/** @static */
lep.StandardRangedValue.createCommonParamValue = function(cursorDevice, paramIndex) {
    lep.util.assertObject(cursorDevice, 'Invalid cursorDevice for StandardRangedValue.createCommonParamValue');
    lep.util.assertNumber(paramIndex, 'Invalid paramIndex for StandardRangedValue.createCommonParamValue');
    return new lep.StandardRangedValue({
        name: lep.util.formatString('CommonParam{}', paramIndex),
        rangedValue: cursorDevice.getCommonParameter(paramIndex)
    });
};
/** @static */
lep.StandardRangedValue.createEnvelopeParamValue = function(cursorDevice, paramIndex) {
    lep.util.assertObject(cursorDevice, 'Invalid cursorDevice for StandardRangedValue.createEnvelopeParamValue');
    lep.util.assertNumber(paramIndex, 'Invalid paramIndex for StandardRangedValue.createEnvelopeParamValue');
    return new lep.StandardRangedValue({
        name: lep.util.formatString('EnvParam{}', paramIndex),
        rangedValue: cursorDevice.getEnvelopeParameter(paramIndex)
    });
};
/** @static */
lep.StandardRangedValue.createUserControlValue = function(userControlBank, controlIndex, label) {
    lep.util.assertObject(userControlBank, 'Invalid userControlBank for StandardRangedValue.createUserControlValue');
    lep.util.assertNumberInRange(controlIndex, 0, 127, 'Invalid controlIndex for StandardRangedValue.createUserControlValue');
    lep.util.assertString(label, 'Invalid label for StandardRangedValue.createUserControlValue');
    return new lep.StandardRangedValue({
        name: label,
        rangedValue: userControlBank.getControl(controlIndex),
        label: label
    });
};
