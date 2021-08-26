#!/bin/bash
today=`date '+%Y_%m_%d'`;
echo $today;

# list of packages installed using the command yum 
#yum list installed > ../Output/hpLinux/yumPackagesList_$today.xlsx
#echo "list of packages installed using the command yum are written in the file yumPackagesList_$today.xlsx"

# list of packages installed using the command rpm
echo "Fetching the list of packages installed"
rpm -qa > ../../Output/hpLinux/rpmPackagesList_$today.xlsx
echo "list of packages installed using the command rpm are written in the file rpmPackagesList_$today.xlsx"