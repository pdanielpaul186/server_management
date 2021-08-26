
rem WMIC /Output:E:\RealVariable\Softwares\Output\Windows\ListofProducts_%date%.txt  PRODUCT GET name,version 
@echo off
FOR /F "tokens=2,3" %%A IN ('ping %computername% -n 1 -4') DO IF "from"== "%%A" set "IP=%%~B"
echo %IP:~0,-1%
echo starting to get the list of applications installed in the OS
wmic /node:localhost /output:d:\%IP:~0,-1%.csv product get name,version /format:csv
echo finished