#!/bin/bash
echo "Intall Java tar"
sudo apt-get install -y tar curl openjdk-17-jdk

echo "Install node"
node -v | grep v15 || curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash - && yes|sudo apt-get install nodejs && yes|sudo apt-get install libxss1
sudo apt-get update

echo "Intall project dependecies"
npm install 

echo "Clean up"
sudo rm -r allure-2.18.1.tgz