#!/bin/bash
echo "Install all dependencies"
sudo apt-get update
sudo apt-get install -y unzip curl zip

node -v | grep v15 || curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash - && yes|sudo apt-get install nodejs && yes|sudo apt-get install libxss1
sudo apt-get update

