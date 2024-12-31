from django.contrib import admin
from .models import User, Stats, MCQ, FillInTheBlanks, SQLQueries, Problems

# Custom User Admin
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'firstname', 'lastname', 'registration_date')
    search_fields = ('username', 'firstname', 'lastname')
    list_filter = ('registration_date',)
    ordering = ('-registration_date',)

# Custom Stats Admin
class StatsAdmin(admin.ModelAdmin):
    list_display = ('user', 'questions_solved', 'login_streak', 'rank')
    search_fields = ('user__username',)
    list_filter = ('rank',)
    readonly_fields = ('user',)  # Prevent changing the user directly

# Custom MCQ Admin
class MCQAdmin(admin.ModelAdmin):
    list_display = ('QN', 'question_problem', 'option_1', 'option_2', 'option_3', 'option_4')
    search_fields = ('question_problem',)
    list_filter = ('QN',)
    ordering = ('QN',)

# Custom FillInTheBlanks Admin
class FillInTheBlanksAdmin(admin.ModelAdmin):
    list_display = ('QN', 'question_problem', 'answer')
    search_fields = ('question_problem', 'answer')
    list_filter = ('QN',)
    ordering = ('QN',)

# Custom SQLQueries Admin
class SQLQueriesAdmin(admin.ModelAdmin):
    list_display = ('QN', 'problem', 'queries')
    search_fields = ('problem',)
    list_filter = ('QN',)
    ordering = ('QN',)

# Custom Problems Admin
class ProblemsAdmin(admin.ModelAdmin):
    list_display = ('QN', 'QN_type', 'status')
    search_fields = ('QN',)
    list_filter = ('QN_type', 'status')
    ordering = ('QN',)

# Register models with custom admin classes
admin.site.register(User, UserAdmin)
admin.site.register(Stats, StatsAdmin)
admin.site.register(MCQ, MCQAdmin)
admin.site.register(FillInTheBlanks, FillInTheBlanksAdmin)
admin.site.register(SQLQueries, SQLQueriesAdmin)
admin.site.register(Problems, ProblemsAdmin)
