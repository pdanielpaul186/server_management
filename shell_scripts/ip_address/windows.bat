REM @echo off
REM set ip_address_string="IPv4 Address"
REM rem Uncomment the following line when using older versions of Windows without IPv6 support (by removing "rem")
REM rem set ip_address_string="IP Address"
REM echo Network Connection Test
REM for /f "usebackq tokens=2 delims=:" %%f in (`ipconfig ^| findstr /c:%ip_address_string%`) do echo Your IP Address is: %%f
REM set ip_address = ipconfig | findstr IPv4
REM echo ip_address
@echo off
echo 'finding the ip address'
REM ipconfig | findstr IPv4 > file.txt
FOR /F "tokens=2,3" %%A IN ('ping %computername% -n 1 -4') DO IF "from"== "%%A" set "IP=%%~B"
echo %IP:~0,-1% > file.txt
systeminfo | findstr /c:"OS Name" >> file.txt
systeminfo | findstr /c:"OS Version" >> file.txt
systeminfo | findstr /c:"Host Name" >> file.txt
echo 'ip address stored in file.txt'