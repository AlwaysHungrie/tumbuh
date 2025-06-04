# Tumbuh Backend

## Database Setup

db name: tumbuhdb
shadow db name: shadow_tumbuhdb
db user: tumbuh_user
db password: **********

```bash
psql -U postgres -c "CREATE DATABASE tumbuhdb;"
psql -U postgres -c "CREATE DATABASE shadow_tumbuhdb;"
psql -U postgres -c "CREATE USER tumbuh_user WITH PASSWORD 'tumbuh_password';"

psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE tumbuhdb TO tumbuh_user;"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE shadow_tumbuhdb TO tumbuh_user;"

psql -U postgres -d tumbuhdb -c "GRANT ALL PRIVILEGES ON SCHEMA public TO tumbuh_user;"
psql -U postgres -d shadow_tumbuhdb -c "GRANT ALL PRIVILEGES ON SCHEMA public TO tumbuh_user;"
```

DATABASE_URL="postgresql://tumbuh_user:tumbuh_password@localhost:5432/tumbuhdb?schema=public"
SHADOW_DATABASE_URL="postgresql://tumbuh_user:tumbuh_password@localhost:5432/shadow_tumbuhdb?schema=public"

## Run the server

```bash
npm install
NODE_OPTIONS="--max-old-space-size=512"
npm run build
pm2 start npm --name "tumbuh-backend" -- start
```
