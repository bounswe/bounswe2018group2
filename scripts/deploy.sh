#!/bin/bash
set -e

HOST="34.210.153.98"
GIT_REVISION=$(git rev-parse --short HEAD)
PKG_NAME="workhub"
TEMP_DIR="/tmp/workhub"
TAR_EXCLUDES=(
    "./frontend/src"
    "./frontend/README.md"
    "./frontend/.gitignore"
    "./.git"
    "./scripts/deploy.sh"
    "./README.md"
)
PM2="pm2"
DEPLOYMENT_FOLDER="latest"
NVM_DIR="\$HOME/.nvm"
ENV="MYSQL_HOST=\"$MYSQL_HOST\"\nMYSQL_USERNAME=\"$MYSQL_USERNAME\"\nMYSQL_PASSWORD=\"$MYSQL_PASSWORD\"\nMYSQL_DATABASE=\"$MYSQL_DATABASE\""
TARBALL=$PKG_NAME-$GIT_REVISION.tar.gz

SSH_LOAD_NVM="source /home/ubuntu/.nvm/nvm.sh"
SSH_CREATE_DEPLOYMENT_FOLDER="rm -rf ~/$DEPLOYMENT_FOLDER && mkdir ~/$DEPLOYMENT_FOLDER && printf '* Flushed latest deployment folder\n'"
SSH_EXTRACT_TARBALL="$SSH_CREATE_DEPLOYMENT_FOLDER && tar --extract --file=$TARBALL -C ~/$DEPLOYMENT_FOLDER && printf '* Extracted project files\n'"
SSH_RESTART_APPS="$PM2 startOrRestart ~/$DEPLOYMENT_FOLDER/pm2.config.json && printf '* Restarted apps\n'"
SSH_RUN_MIGRATE="NODE_ENV='prod' npm run migrate --prefix ~/$DEPLOYMENT_FOLDER/backend/workhub/ && printf '* Ran migrations\n'"
SSH_COMMAND="$SSH_LOAD_NVM && $SSH_EXTRACT_TARBALL && $SSH_RUN_MIGRATE && $SSH_RESTART_APPS"

rm -rf $TEMP_DIR
mkdir $TEMP_DIR

echo "Setting environment variables"
printf $ENV > "./backend/workhub/.env.prod"
printf "\n"

echo "Compressing built project files"
tar $(printf -- "--exclude=%s " "${TAR_EXCLUDES[@]}") -czf $TEMP_DIR/$TARBALL ./frontend pm2.config.json ./backend
printf "\n"
echo "Compression done!"

printf "\n"
echo "Copying archive to server"
scp $TEMP_DIR/$TARBALL ubuntu@$HOST:~/
printf "\n"
echo "Connecting to the server and restarting apps"
ssh ubuntu@$HOST $SSH_COMMAND
echo "Deployment complete! Check $HOST:5000 and $HOST:3000"
