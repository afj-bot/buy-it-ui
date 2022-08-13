#!/bin/bash
echo "Intall Java tar"
sudo apt-get install -y curl tar 
sudo apt-get install -y openjdk-17-jre-headless

echo "Install node"
node -v | grep v15 || curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash - && yes|sudo apt-get install nodejs && yes|sudo apt-get install libxss1
sudo apt-get update

node --version
java --version

echo "Intall project dependecies"
npm install 
