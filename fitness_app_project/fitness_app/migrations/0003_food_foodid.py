# Generated by Django 2.0.5 on 2018-08-03 17:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fitness_app', '0002_workout_muscles'),
    ]

    operations = [
        migrations.AddField(
            model_name='food',
            name='foodId',
            field=models.CharField(default='', max_length=1000),
        ),
    ]
