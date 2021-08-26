#!/bin/bash

echo "Starting the shell script"
echo 
sleep 2
echo 
echo "START"
sleep 2

echo "Trying to update the system !!!!"
read -p "Are you sure? Would you like to update the system [Y/n] " response

case $response in [yY][eE][sS]|[yY]|[jJ]|'') 
    sudo -i <<EOF
    echo
    echo "Updating the system"
    echo
    sudo apt-get update
    echo "Installing the softwares sequentially"
    echo 
    echo 'List of softwares which are to be installed'
    echo '1.MySQL'
    echo '2.MongoDB'
    echo '3.NodeJS'
    echo '4.Multichain'
    echo '5.GIT'
    echo 

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
    echo 
    echo

    #installing Node JS
    echo 'Installing Node JS'
    sleep 2
    echo 'Installing Node JS !!!!'
    yes | apt install nodejs
    sleep 2
    echo 'installed nodejs successfully !!!!'
    yes | apt install npm
    sleep 2
    echo 'installed npm successfully !!!!'
    nodejs -v
    echo 
    echo

    #installing GIT
    echo "installing git "
    sleep 2
    apt install git
    sleep 2
    git --version
    echo 
    echo

    #installing MySQL
    echo 'Installing MySQL'
    apt install mysql-server
    sleep 2
    echo 
    echo

    #installing multichain 
    
    #echo 'installing multichain !!!!!'
    #cd /tmp
    #wget https://www.multichain.com/download/enterprise/multichain-2.0.5-enterprise-demo-beta-1.tar.gz
    #sleep 3
    #tar -xvzf multichain-2.0.5-enterprise-demo-beta-1.tar.gz
    #sleep 5
    #cd multichain-2.0.5-enterprise-demo-beta-1
    #mv multichaind multichain-cli multichain-util /usr/local/bin
    #sleep 3
    #echo 'multichain 2.0.5 enterprise installed successfully'
    #echo 
    #echo 
    #echo 
    #echo 'END!!!!!'
EOF
    ;;
    *)
    sudo -i <<EOF
    echo
    echo "updating cancelled !!!!"
    echo 'Continuing to installing softwares !!!!!'
    echo
    echo "Installing the softwares sequentially"
    echo 
    echo 'List of softwares which are to be installed'
    echo '1.MySQL'
    echo '2.MongoDB'
    echo '3.NodeJS'
    echo '4.Multichain'
    echo '5.GIT'
    echo 

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
    echo 
    echo

    #installing Node JS
    echo 'Installing Node JS'
    sleep 2
    echo 'Installing Node JS !!!!'
    yes | apt install nodejs
    sleep 2
    echo 'installed nodejs successfully !!!!'
    yes | apt install npm
    sleep 2
    echo 'installed npm successfully !!!!'
    nodejs -v
    echo 
    echo

    #installing GIT
    echo "installing git "
    sleep 2
    apt install git
    sleep 2
    git --version
    echo 
    echo

    #installing MySQL
    echo 'Installing MySQL'
    apt install mysql-server
    sleep 2
    echo 
    echo

    #installing multichain 
    
    #echo 'installing multichain !!!!!'
    #cd /tmp
    #wget https://www.multichain.com/download/enterprise/multichain-2.0.5-enterprise-demo-beta-1.tar.gz
    #sleep 3
    #tar -xvzf multichain-2.0.5-enterprise-demo-beta-1.tar.gz
    #sleep 5
    #cd multichain-2.0.5-enterprise-demo-beta-1
    #mv multichaind multichain-cli multichain-util /usr/local/bin
    #sleep 3
    #echo 'multichain 2.0.5 enterprise installed successfully'
    #echo 
    #echo 
    #echo 
    #echo 'END!!!!!'
EOF
    ;;
esac