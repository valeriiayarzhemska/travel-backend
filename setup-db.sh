#!/bin/bash

# PostgreSQL setup script for travel-backend

echo "Setting up PostgreSQL database for travel-backend..."

# Connect to PostgreSQL as superuser and create user and database
psql -d postgres << EOF
-- Create the travel_user role if it doesn't exist
DO \$\$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'travel_user') THEN
        CREATE ROLE travel_user WITH LOGIN PASSWORD 'secret123';
    END IF;
END
\$\$;

-- Create the travel_notes database if it doesn't exist
SELECT 'CREATE DATABASE travel_notes OWNER travel_user'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'travel_notes')\gexec

-- Grant all privileges to travel_user on the database
GRANT ALL PRIVILEGES ON DATABASE travel_notes TO travel_user;

-- Connect to travel_notes database and grant schema permissions
\c travel_notes
GRANT ALL ON SCHEMA public TO travel_user;

-- Show confirmation
\echo 'Database setup completed successfully!'
\echo 'User: travel_user'
\echo 'Database: travel_notes'
\echo 'Password: secret123'
EOF

echo "PostgreSQL setup complete!"
