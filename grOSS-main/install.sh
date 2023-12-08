#!/bin/bash

echo "Run this script as root"

npm i --prefix frontend
npm run --prefix frontend build

pip install -r requirements.txt
gem install brakeman

sudo git clone https://github.com/offensive-security/exploitdb.git /opt/exploitdb
sudo ln -sf /opt/exploitdb/searchsploit /usr/local/bin/searchsploit
