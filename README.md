Some Bitwig Script(s)
=====================

# How to install the Bitwig control script

1.  Download the Bitwig project as a ZIP files and extract it to your Bitwig control scripts folder:
    *   **Windows:** ~Documents\Bitwig Studio\Controller Scripts
    *   **Mac:** ~Documents/Bitwig Studio/Controller Scripts
    *   **Linux:** ~Documents/Bitwig Studio/Controller Scripts
2.  Open the preferences dialog in Bitwig and go to Controllers
3.  Either click "Detect available controllers" which should automatically add the BSP version with four inputs (S1, S2, DRUM and OMNI).
     Or add of the controller manually:
    *   **Arturia Beatstep Pro -> BSP** ... adds BSP with three inputs + OMNI (this is the autodetectable version)
    *   **Arturia Beatstep Pro (All channels) -> BSP** ... adds BSP with all 16 MIDI channels + OMNI
4.  In the end the dialog should look something like this (ignoring the other controllers):![](https://raw.githubusercontent.com/justlep/bitwig/master/ArturiaBeatstepPro/BeatstepPro-autodetect.png)
5.  After that, you can select MIDI track inputs of BeatStep's sequencers..![](https://raw.githubusercontent.com/justlep/bitwig/master/ArturiaBeatstepPro/BeatstepPro.control.png)

Done :)