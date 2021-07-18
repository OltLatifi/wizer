# Generated by Django 3.1 on 2021-07-16 19:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0003_auto_20210714_1540'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='homework',
            options={'ordering': ['due_date']},
        ),
        migrations.AlterField(
            model_name='homework',
            name='subject',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.subject'),
        ),
    ]