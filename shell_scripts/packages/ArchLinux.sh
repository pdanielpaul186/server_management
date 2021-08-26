#!/bin/bash
today=`date '+%Y_%m_%d'`;
echo $today;
echo "starting to get packages and installed softwares!!!!!!"
now=$(date)
echo "$now"
pacman -Qet | awk 'BEGIN{print "package_name\tpackageversion\t"};NR > 1{print $1"\t"$2}' > ../../Output/ArchLinux/archLinuxPackagesList_$today.xlsx