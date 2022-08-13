#!/bin/bash
sudo sh ./install_dependencies.sh
echo "Intall Java, cURL and tar"
sudo apt-get install -y unzip curl tar openjdk-17-jre-headless
sudo apt-get update
echo "Intall allure"
curl -o allure-2.18.1.tgz -OLs https://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/2.18.1/allure-commandline-2.18.1.tgz
sudo tar -zxvf allure-2.18.1.tgz -C /opt/
sudo ln -s /opt/allure-2.18.1/bin/allure /usr/bin/allure
echo "Intall project dependecies"
npm install 

echo "Clean up"
sudo rm -r allure-2.18.1.tgz