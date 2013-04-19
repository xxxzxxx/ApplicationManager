#!/bin/bash
CMDNAME=`basename $0`
host=$1
port=$2
database=$3
tag=$4

if [ $# -it 4 ]; then
  echo "Usage: $CMDNAME host port database tag" 1>&2
  exit 1
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

for collection in "${collections[@]}"; do
cat ./${tag}/${collection}.json | mongoimport --host ${host} --port ${port} -db ${database} -collection ${collection}
done
