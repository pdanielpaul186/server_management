#!/bin/bash
today=`date '+%Y_%m_%d'`;
echo $today;
echo "starting to get packages and installed softwares!!!!!!"
now=$(date)
echo "$now"

echo "Fetching the list of packages installed"
rpm -q -a --queryformat "%{INSTALLTIME};%{INSTALLTIME:day}; \ %{BUILDTIME:day}; %{NAME};%{VERSION}-%-7{RELEASE};%{arch}; \ %{VENDOR};%{PACKAGER};%{DISTRIBUTION};%{DISTTAG}\n" \ | sort | cut --fields="2-" --delimiter=\; \ > ../../Output/SUSELinux/rpmlist_$today.xlsx 
echo "list of packages installed using the command rpm are written in the file rpmlist_$today.xlsx"