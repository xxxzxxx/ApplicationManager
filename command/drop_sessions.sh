#!/bin/bash
CMDNAME=`basename $0`
if [ $# -ne 3 ]; then
  echo "Usage: $CMDNAME host port database" 1>&2
  exit 1
fi
host=$1
port=$2
database=$3

mongo ${host}:${port}/${database} --quiet --eval 'db.sessions.drop()'
