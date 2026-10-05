LIBRARY STOCK VERIFICATION  -  installable offline app (version 1.0.0)
=====================================================================

What is in this folder
  index.html             the app
  sw.js                  makes the app work without internet
  manifest.webmanifest   lets phones and computers install it
  icons/                 app icons

Keep all files together in one folder.


1. PUT THE FOLDER ON A WEB ADDRESS (one time)
---------------------------------------------
Installing and offline use need the app to be opened from an https:// address.
Choose any one:

  a) Netlify Drop (free): open https://app.netlify.com/drop in a browser and drag
     this whole folder onto the page. Create a free account so the site is kept.
     You get an https:// link to share with library staff.

  b) GitHub Pages (free): create a repository, upload these files, and turn on
     Pages in the repository settings.

  c) The school's own website or server: copy the folder to any location served
     over https, for example https://yourschool.example/library-verification/

  d) One computer, no hosting: double-click index.html. The app works and saves
     records, but it cannot be installed and is tied to that copy of the file.

Records are never sent to the web address. Each device keeps its own records.


2. INSTALL ON EACH DEVICE
-------------------------
  Windows / Mac (Chrome or Edge): open the link, then click "Install app"
      in the app's side menu, or the install icon in the address bar.
  Android (Chrome): open the link, then menu > "Install app" / "Add to Home screen".
  iPhone / iPad (Safari): open the link, tap Share > "Add to Home Screen".

Keep the app open for a minute while connected the first time. Then
Backup & settings shows "Ready to work offline". After that, no internet is needed.


3. FIRST USE
------------
  - Enter your name. It is written into the audit trail for every action.
  - Backup & settings > Set officer PIN. Only someone who knows the PIN can
    approve sessions, make corrections after submission, record responsibility
    for missing books, import the register or restore backups.
  - Stock register > Import Excel or CSV (use "Download template" for the columns).
  - Sessions > New verification.


4. BACKUPS  (important)
-----------------------
Records live only inside the browser on that device. Clearing browser data,
uninstalling the browser or resetting the device deletes them.
  - Backup & settings > Download backup, at least at the end of every day of
    verification. Keep copies on a pen drive or the school's shared drive.
  - Restore from backup puts everything back, on the same or a new device.


5. SEVERAL DEVICES SCANNING AT ONCE
-----------------------------------
  1. On the main computer: load the register, create the session, download a backup.
  2. On each phone or laptop: install the app, Restore from backup.
  3. Give each device different racks. At the end, download a backup from each.
  4. On the main computer: Merge records from another device, once per backup.
     The newest record for each accession number is kept; nothing is deleted.


6. BARCODE SCANNERS
-------------------
USB and Bluetooth barcode scanners work in the "Scan & verify" box with no setup.
Phone cameras can also read barcodes and QR codes ("Scan with camera").


7. UPDATING THE APP
-------------------
Replace index.html on the web address and change the VERSION line at the top of
sw.js (for example lsv-1.0.0 to lsv-1.0.1). Devices show "A new version of the
app is ready" the next time they open it online. Records are not affected.
