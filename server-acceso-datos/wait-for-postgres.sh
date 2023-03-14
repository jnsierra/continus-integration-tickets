#!/bin/sh
# wait-for-postgres.sh

set -e
  
host="$1"
echo 'This is te host ' ${host}
shift
cmd="$@"
  
until PGPASSWORD=$POSTGRES_PASSWORD timeout  2s psql -h "$host" -U "hashticket" "tickets" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
  
>&2 echo "Postgres is up - executing command"
exec $cmd
