import os
import django

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'leetpandas.settings')

# Setup Django
django.setup()

from data.models import MCQ  # Now import after Django is initialized
import csv
from datetime import datetime

def import_mcq(file_path):
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            MCQ.objects.create(
                question_problem=row['question_problem'],
                option_1=row['option_1'],
                option_2=row['option_2'],
                option_3=row['option_3'],
                option_4=row['option_4']
            )

if __name__ == '__main__':
    csv_file_path = 'mcq.csv'
    import_mcq(csv_file_path)
