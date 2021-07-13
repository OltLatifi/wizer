# Generated by Django 3.1 on 2021-07-13 16:44

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Homework',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True, max_length=500, null=True)),
                ('date', models.DateField(auto_now_add=True)),
                ('due_date', models.DateTimeField(default=datetime.datetime(2021, 7, 13, 16, 44, 12, 784700, tzinfo=utc))),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.subject')),
            ],
        ),
    ]
