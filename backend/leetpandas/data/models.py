from django.db import models

# Enum definitions
class QNType(models.TextChoices):
    MCQ = "MCQ"
    FIB = "FIB"
    SQL = "SQL"

class Status(models.TextChoices):
    SOLVED = "solved"
    UNSOLVED = "unsolved"
    ATTEMPTED = "attempted"

# Users table
class User(models.Model):
    username = models.CharField(max_length=150, primary_key=True)
    firstname = models.CharField(max_length=150)
    lastname = models.CharField(max_length=150)
    registration_date = models.DateTimeField()

# Stats table
class Stats(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='stats')
    questions_solved = models.IntegerField(default=0)
    login_streak = models.IntegerField(default=0)
    hard_problem_solved = models.IntegerField(default=0)
    easy_problem_solved = models.IntegerField(default=0)
    medium_problem_solved = models.IntegerField(default=0)
    rank = models.IntegerField(default=0)

# MCQ table
class MCQ(models.Model):
    QN = models.AutoField(primary_key=True)
    question_problem = models.TextField()
    option_1 = models.CharField(max_length=255)
    option_2 = models.CharField(max_length=255)
    option_3 = models.CharField(max_length=255)
    option_4 = models.CharField(max_length=255)

# Fill in the Blanks table
class FillInTheBlanks(models.Model):
    QN = models.AutoField(primary_key=True)
    question_problem = models.TextField()
    answer = models.CharField(max_length=255)

# SQL Queries table
class SQLQueries(models.Model):
    QN = models.AutoField(primary_key=True)
    problem = models.TextField()
    queries = models.TextField()

# Problems table
class Problems(models.Model):
    QN_type = models.CharField(max_length=10, choices=QNType.choices)
    status = models.CharField(max_length=10, choices=Status.choices)
    QN = models.IntegerField()
