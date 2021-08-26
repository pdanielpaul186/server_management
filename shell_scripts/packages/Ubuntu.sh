#!/bin/bash

# Checking if the directory does not exist 
if [ ! -d "../../Output/Ubuntu" ] 
then
    echo "Directory ../Output/Ubuntu DOES NOT exists." 
    echo "Creating the Directory "
    mkdir ../../Output/Ubuntu
    
else
    echo "Directory present !!!!!!!"
    sleep 1.5
    echo "Executing the remaining statements !!!!!!"
fi

#getting the date 
today=`date '+%Y-%m-%d'`;
echo $today;
echo "starting to get packages and installed softwares !!!!!!"
sleep 2
now=$(date)
echo "Shell Script executed on $now"
sleep 2

# list of packages installed using the command apt 
echo "Fetcheing list of packages installed !!!!!"
sleep 2
nowip=$(curl ifconfig.me)
apt list --installed | awk 'BEGIN{print "package_name\tversion\tarchitecture\tstatus"};NR > 1 {print $1"\t" $2"\t" $3"\t" $4"\t" }'>../../Output/Ubuntu/$nowip.xlsx
#apt list --installed | awk 'BEGIN{print "package_name\tversion\tarchitecture\tstatus"};NR > 1 {print $1"\t" $2"\t" $3"\t" $4"\t" }'> aptPackagesList_$today.xlsx
sleep 5
echo "list of packages installed using the command apt are written in the file $nowip.xlsx"
sleep 4
#echo "getting the IP Address !!!!!"
#sleep 5
#curl ifconifg.me | awk 'BEGIN{print "ip_address:\t"$1"\t"}' > ../Output/Ubuntu/ip_address.txt
#nowip=$(dig +short myip.opendns.com @resolver1.opendns.com)
#echo "$nowip"
#dig +short myip.opendns.com @resolver1.opendns.com | awk '{print "ipaddress : "$1}' > ../Output/Ubuntu/ip_address_$nowip.txt
#curl ifconifg.me | awk 'BEGIN{print "ip_address:\t"$1"\t"}' > ip_address.txt
#echo "Fetched IP ADDRESS....!!!!!"

#echo "fetching the OS details!!!!"
#sleep 5
#lsb_release -a >> ../Output/Ubuntu/ip_address_$nowip.txt
#echo "Fetched the OS details...!!!"
echo "moving into the file directory"
sleep 2
cd ../../Output/Ubuntu
sleep 2
echo "Traversed into the file directory succesfully"
sleep 4
echo "connecting to the server to send the file which contains the applications list"
sleep 2
echo "attempting to connect the admin server "
sftp -i /home/daniel/Downloads/vinod_projects.pem ubuntu@13.232.35.115:/home/ubuntu/Output/Ubuntu <<EOF
put *   
exit
EOF
sleep 4
echo "File sent to the admin server"
sleep 2
echo "Trying to remove the generated file for security reasons"
sleep 3
rm -rf ../../Output/Ubuntu/*
sleep 2
echo "removed the generated file for security reasons"
sleep 2
echo "executed the shell script successfully on $now"