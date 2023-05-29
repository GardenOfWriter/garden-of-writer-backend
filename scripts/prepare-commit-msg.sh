#!/bin/sh
# .git/hooks/prepare-commit-msg
#
# Automatically add branch name and branch description to every commit message except merge commit.
# https://stackoverflow.com/a/18739064
#

COMMIT_EDITMSG=$1

setMessage() {
  BRANCH=$(git branch | grep '*' | sed 's/* //') 
  BRANCH_SPLIT=($(echo $BRANCH | tr "/" "\n")) 
  TITLE=${BRANCH_SPLIT[0]}
  ISSUE=($(echo ${BRANCH_SPLIT[1]} | tr "-" "\n"))
  ISSUE_NUMBER=${ISSUE[1]}
  DESCRIPTION=$(git config branch."$BRANCH".description)
  echo "[#$ISSUE_NUMBER]/$TITLE/ $(cat $COMMIT_EDITMSG)" > $COMMIT_EDITMSG
  if [ -n "$DESCRIPTION" ] 
  then
     echo "" >> $COMMIT_EDITMSG
     echo $DESCRIPTION >> $COMMIT_EDITMSG
  fi 
}

MERGE=$(cat $COMMIT_EDITMSG|grep -i 'merge'|wc -l)

if [ $MERGE -eq 0 ] ; then
  setMessage
fi