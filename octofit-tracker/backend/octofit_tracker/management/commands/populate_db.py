from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        app_label = 'octofit_tracker'

class Activity(models.Model):
    user = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    duration = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'

class Leaderboard(models.Model):
    team = models.CharField(max_length=100)
    points = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'

class Workout(models.Model):
    name = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=100)
    class Meta:
        app_label = 'octofit_tracker'

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        # 데이터 삭제
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # 팀 생성
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # 사용자 생성
        ironman = User.objects.create_user(username='ironman', email='ironman@marvel.com', password='hero123')
        captain = User.objects.create_user(username='captain', email='captain@marvel.com', password='hero123')
        batman = User.objects.create_user(username='batman', email='batman@dc.com', password='hero123')
        superman = User.objects.create_user(username='superman', email='superman@dc.com', password='hero123')

        # 활동 생성
        Activity.objects.create(user='ironman', type='run', duration=30)
        Activity.objects.create(user='captain', type='cycle', duration=45)
        Activity.objects.create(user='batman', type='swim', duration=25)
        Activity.objects.create(user='superman', type='run', duration=50)

        # 리더보드 생성
        Leaderboard.objects.create(team='Marvel', points=75)
        Leaderboard.objects.create(team='DC', points=75)

        # 운동 생성
        Workout.objects.create(name='Pushup', difficulty='Easy')
        Workout.objects.create(name='Squat', difficulty='Medium')
        Workout.objects.create(name='Deadlift', difficulty='Hard')

        self.stdout.write(self.style.SUCCESS('octofit_db에 테스트 데이터가 성공적으로 추가되었습니다.'))
