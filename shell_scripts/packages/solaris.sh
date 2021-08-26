#!/bin/bash
today=`date '+%Y_%m_%d'`;
echo $today;
echo "starting to get packages and installed softwares!!!!!!"
now=$(date)
echo "$now"

# list of packages installed using the command yum 
#yum list installed > ../Output/CentOS/yumPackagesList_$today.xlsx
#echo "list of packages installed using the command yum are written in the file yumPackagesList_$today.xlsx"

# list of packages installed using the command rpm
echo "Fetching the list of packages installed"
pkginfo | awk 'BEGIN{print "package_name\tversion"};NR > 1 {printf "%s\t%s\n",$1$2,$3$4$5}'> ../../Output/Solaris/packagesList_$today.xlsx
echo "list of packages installed are written in the file packagesList_$today.xlsx"