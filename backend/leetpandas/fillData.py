import csv
import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'leetpandas.settings')  # Replace 'your_project' with your project name
django.setup()

from data.models import MCQ, FillInTheBlanks, SQLQueries, Problems

def import_csv(file_path):
    with open(file_path, mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row['QN_type'] == 'MCQ':
                mcq = MCQ.objects.create(
                    question_problem=row['question_problem'],
                    option_1=row['option_1'],
                    option_2=row['option_2'],
                    option_3=row['option_3'],
                    option_4=row['option_4']
                )
                Problems.objects.create(QN_type='MCQ', status=row['status'], QN=mcq.QN)

            elif row['QN_type'] == 'FIB':
                fib = FillInTheBlanks.objects.create(
                    question_problem=row['question_problem'],
                    answer=row['answer']
                )
                Problems.objects.create(QN_type='FIB', status=row['status'], QN=fib.QN)

            elif row['QN_type'] == 'SQL':
                sql = SQLQueries.objects.create(
                    problem=row['problem'],
                    queries=row['queries']
                )
                Problems.objects.create(QN_type='SQL', status=row['status'], QN=sql.QN)

    print("Data import complete!")

if __name__ == "__main__":
    # Provide the path to your CSV file
    import_csv('problems.csv')
