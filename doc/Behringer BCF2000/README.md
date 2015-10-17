# LeP's BCF2000 Pro controller script for Bitwig
![LeP's BCF2000][overviewImage]
---
##### Required SysEx file:
Before using the script, you need to install a special preset (28 or 29) on your BCF. The following SysEx file contains the two presets:  [**BCF2000-Bitwig-Preset28(CH13)-29(CH14).syx**][sysexfile]. 
You can use MidiOX or a similar tool to transfer the file to your BCF. When the script loads, it will try to switch to preset 28.

---
##### Installing the controller script:

1.  Download the latest ZIP file from the [stable-versions-for-download][stableFolder] and extract it to your Bitwig controller scripts folder:
    * **Windows:** ~Documents\Bitwig Studio\Controller Scripts
    * **Linux/Mac:** ~Documents/Bitwig Studio/Controller Scripts
2.  Open the preferences dialog in Bitwig and go to Controllers
3.  Add the Controller script **Behringer** > **BCF2000 (LeP)** and choose BCF2000 port 1 for both input and output. ![Preferences][prefs]

That's it. Your BCF2000 should initialize. Have fun :)

[overviewImage]: https://raw.githubusercontent.com/justlep/bitwig/master/doc/Behringer%20BCF2000/LeP's-BCF-2000.png
[sysexfile]: https://raw.githubusercontent.com/justlep/bitwig/master/doc/Behringer%20BCF2000/BCF2000-Bitwig-Preset28(CH13)-29(CH14).syx
[prefs]: https://raw.githubusercontent.com/justlep/bitwig/master/doc/Behringer%20BCF2000/preferences.png
[stableFolder]: https://github.com/justlep/bitwig/tree/master/stable-version-for-download/