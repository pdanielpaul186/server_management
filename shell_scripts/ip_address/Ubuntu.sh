#!/bin/bash

# Checking if the directory does not exist 
if [ ! -d "../../Output/IP_addresses" ] 
then
    echo "Directory ../Output/IP_addresses DOES NOT exists." 
    echo "Creating the Directory "
    mkdir ../../Output/IP_addresses
    sleep 1.5
else
    echo "Directory present !!!!!!!"
    sleep 1.5
    echo "Executing the remaining statements !!!!!!"
fi

#getting the date 
today=`date '+%Y-%m-%d'`;
echo $today;
#echo "starting to get packages and installed softwares !!!!!!"
sleep 2
now=$(date)
echo "Shell Script executed on $now"
sleep 2

echo "getting the IP Address !!!!!"
sleep 2
#curl ifconifg.me | awk 'BEGIN{print "ip_address:\t"$1"\t"}' > ../Output/IP_addresses/ip_address.txt
#nowip=$(dig +short myip.opendns.com @resolver1.opendns.com)
nowip=$(curl ifconfig.me)
echo "$nowip"
curl ifconfig.me | awk '{print "ip_address:"$1}' > ../../Output/IP_addresses/ip_address_$nowip.txt
#dig +short myip.opendns.com @resolver1.opendns.com | awk '{print "ip_address:"$1}' > ../../Output/IP_addresses/ip_address_$nowip.txt
#dig +short myip.opendns.com @resolver1.opendns.com | awk 'BEGIN{print "ipaddress \t\n"}; NR < 1{print $1$2$3$4}'
#curl ifconifg.me | awk 'BEGIN{print "ip_address:\t"$1"\t"}' > ip_address.txt
echo "Fetched IP ADDRESS....!!!!!"

echo "fetching the OS details!!!!"
lsb_release -a | tr -d "\t" | tr -d '[[:blank:]]'>> ../../Output/IP_addresses/ip_address_$nowip.txt
#lsb_release -a | awk 'BEGIN{print "Distributor ID\tDescription\tRelease\tCodename\n"}; NR < 1 {print $1$2$3$4}'
#lsb_release -a | awk 'BEGIN{print "Distributor ID\tDescription\tRelease\tCodename\n"}; NR < 1 {print $1$2$3$4}'>> ../../Output/IP_addresses/ip_address_$nowip.txt
echo "Fetched the OS details...!!!"
sleep 4
echo "moving into the file directory"
sleep 2
cd ../../Output/IP_addresses
sleep 2
echo "Traversed into the file directory succesfully"
sleep 4
echo "connecting to the server to send the file which contains the applications list"
sleep 2
echo "attempting to connect the admin server "
sudo sftp -i /home/daniel/Downloads/vinod_projects.pem ubuntu@13.232.35.115:/home/ubuntu/Output/IP_addresses <<EOF
put *   
exit
EOF
sleep 4
echo "File sent to the admin server"
sleep 2
echo "Trying to remove the generated file for security reasons"
sleep 3
rm -rf ../../Output/IP_addresses/*
sleep 2
echo "removed the generated file for security reasons"
sleep 2
echo "executed the shell script successfully on $now"