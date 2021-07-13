# Generated by Django 3.1 on 2021-07-13 20:12

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homework',
            name='due_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 7, 13, 20, 12, 42, 472363, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='homework',
            name='subject',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='API.subject'),
        ),
    ]
