#!/bin/sh
chmod * 777
cnpm install
cd build-test-scirpt
gulp

scp /data/jenkins/workspace/h5lawyer-v3.1.1/dist/v3.1.1.zip admin@192.168.10.217:/home/admin/static/front/h5lawyer/v3.1.1.zip
sshpass -p tester123  ssh -o StrictHostKeyChecking=no admin@192.168.10.217 "cd /home/admin/static/front/h5lawyer;rm -rf ./v3.1.1;rm -rf ./share;unzip v3.1.1.zip" &>>/dev/null