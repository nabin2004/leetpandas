# serializers.py
from rest_framework import serializers
from .models import Stats

class StatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stats
        fields = [
            'user', 
            'questions_solved', 
            'login_streak', 
            'hard_problem_solved', 
            'easy_problem_solved', 
            'medium_problem_solved', 
            'rank'
        ]

class LeaderboardUserSerializer(serializers.ModelSerializer):
    score = serializers.IntegerField(source='questions_solved')
    username = serializers.CharField(source='user.username')
    country = serializers.SerializerMethodField()
    
    class Meta:
        model = Stats
        fields = ['username', 'score', 'rank', 'country']

    def get_country(self, obj):
        return 'NP'  # For now hardcoded