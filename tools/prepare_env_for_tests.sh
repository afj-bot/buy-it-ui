#!/bin/bash
echo "Intall Java tar"
sudo apt-get install -y tar curl openjdk-17-jdk-headless

echo "Install node"
node -v | grep v15 || curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash - && yes|sudo apt-get install nodejs && yes|sudo apt-get install libxss1
sudo apt-get update

echo "Intall allure"
curl -o allure-2.18.1.tgz -OLs https://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/2.18.1/allure-commandline-2.18.1.tgz
sudo tar -zxvf allure-2.18.1.tgz -C /opt/
sudo ln -s /opt/allure-2.18.1/bin/allure /usr/bin/allure
echo "Intall project dependecies"
npm install 

echo "Clean up"
sudo rm -r allure-2.18.1.tgz