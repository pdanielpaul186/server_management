#!/bin/bash
today=`date '+%Y-%m-%d'`;
echo $today;
echo "starting to get packages and installed softwares!!!!!!"
now=$(date)
echo "$now"

# list of packages installed using the command apt 
echo "Fetching the list of packages installed"
pkg_info | awk 'BEGIN{print "package_name\tversion\tarchitecture\tstatus"};NR > 1 {print $1"\t" $2"\t" $3"\t" $4"\t" }'>../Output/openBSD/packagesList_$today.xlsx
echo "list of packages installed using the command pkg are written in the file packagesList_$today.xlsx"