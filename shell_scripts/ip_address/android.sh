#!/bin/bash
today=`date '+%Y_%m_%d'`;
echo $today;
echo "starting to get packages and installed softwares!!!!!!"
now=$(date)
echo "$now"
adb shell pm list packages > ../Output/Android/pmlist_$today.xlsx
echo "list of packages installed using the command rpm are written in the file pmList_$today.xlsx"