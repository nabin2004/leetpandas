import os
import django

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'leetpandas.settings')

# Setup Django
django.setup()

from data.models import User  # Import User model from the app
import csv
from datetime import datetime

def import_users(file_path):
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            try:
                # Update the datetime format to handle microseconds
                registration_date = datetime.strptime(row['registration_date'], '%Y-%m-%d %H:%M:%S.%f')
                
                # Create or update the user
                User.objects.create(
                    username=row['username'],
                    firstname=row['firstname'],
                    lastname=row['lastname'],
                    registration_date=registration_date
                )
                print(f"Successfully created user: {row['username']}")
            except Exception as e:
                print(f"Error creating user {row['username']}: {str(e)}")

if __name__ == '__main__':
    # Path to your CSV file
    csv_file_path = 'users.csv'
    import_users(csv_file_path)
