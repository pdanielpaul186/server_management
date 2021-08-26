#!/bin/bash

if [[ "$(ping -c 1 8.8.8.8 | grep '100% packet loss' )" != "" ]]; then
    echo "Internet isn't present"
    exit 1
else
    echo "Internet is present"
    #wget www.site.com
    echo 'Running commands as super user !!!!!!!'
    presentDirectory=$(pwd)
sudo -i <<EOF
#updating the system 
echo 'updating the system !!!!!'
yes | apt-get update
sleep 5
echo 'updated the system successfully !!!!'

#upgrading if the system needs an upgrade
echo 'upgrading the system !!!!!'
yes | apt-get upgrade 
sleep 5
echo 'upgraded the system successfully !!!!'

#installing mongoDB
echo 'Installing Mongo DB'
apt install -y mongodb
sleep 5 
systemctl start mongodb
systemctl status mongodb
sleep 5
mongo --eval 'db.runCommand({ connectionStatus: 1 })'
sleep 3
echo 'Mongo DB installed Successfully'
sleep 5

#installing multichain 
echo 'installing multichain !!!!!'
cd /tmp
wget https://www.multichain.com/download/enterprise/multichain-2.0.5-enterprise-demo-beta-1.tar.gz
sleep 3
tar -xvzf multichain-2.0.5-enterprise-demo-beta-1.tar.gz
sleep 5
cd multichain-2.0.5-enterprise-demo-beta-1
mv multichaind multichain-cli multichain-util /usr/local/bin
sleep 3
echo 'multichain 2.0.5 enterprise installed successfully'
sleep 3
echo 'Installing Node JS !!!!'
apt install nodejs
sleep 5
echo 'installed nodejs successfully !!!!'
apt install npm
sleep 5
echo installed npm successfully !!!!
nodejs -v
npm install -g pm2 nodemon
EOF
echo 'moving into the server_snapshots project directory !!!!'
cd ..
npm install
sleep 5

echo 'creating the chain !!!!'
multichain-util create server_snapshots
sleep 5
echo 'traversing into the chain folder'
cd 
cd .multichain/server_snapshots
multichainPassword=$(cat multichain.conf | grep rpcpassword | cut -d "=" -f 2) 
multichainPort=$(cat params.dat | grep default-rpc-port | cut -d "=" -f 2 | sed -e 's/ //g' | cut -d "#" -f 1)
echo 
echo 
echo
echo '----->Multichain Port and Passwords<--------'
echo "Password -----> $multichainPassword"
echo "Port-------->$multichainPort"
echo '----->Multichain Port and Passwords<--------'
echo 
echo
echo
echo 'traversing into the project folder'
cd $presentDirectory
cd ..
echo 'open nano and edit the multichain connection to the given'
gnome-terminal
sleep 10
echo 'type this command in the opened terminal'
echo 'nano multichainConn.js'
sleep 10
echo 'change the port and password !!!!!!!!'
secs=$((2 * 60))
while [ $secs -gt 0 ]; do
   echo -ne "$secs\033[0K\r"
   sleep 1
   : $((secs--))
done
echo 'starting the chain !!!!'
multichaind server_snapshots -daemon
sleep 5
echo 'Starting the application !!!!!'
echo 'application will navigate itself no need to worry !!!!'
sleep 5
#pm2 start app.js
nodemon start 
fi