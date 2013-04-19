#!/bin/bash
CMDNAME=`basename $0`
host=$1
port=$2
database=$3
tag=$4

if [ $# -lt 3 ]; then
  echo "Usage: $CMDNAME host port database tag" 1>&2
  exit 1
fi
if [ $# -ne 4 ]; then
tag=`date +%Y-%m-%dT%H.%M.%S`
fi

collections=(
"applications"
"devices"
"languages"
"package_types"
"packages"
"regions"
"users"
)
mkdir ./${tag}
for collection in "${collections[@]}"; do
mongoexport --host ${host} --port ${port} -db ${database} -collection ${collection} > ./${tag}/${collection}.json
done
