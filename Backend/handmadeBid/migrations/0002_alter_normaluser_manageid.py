# Generated by Django 5.0.2 on 2024-03-30 23:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('handmadeBid', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='normaluser',
            name='ManageID',
            field=models.ForeignKey(blank=True, db_column='ManageID', default=1, null=True, on_delete=django.db.models.deletion.CASCADE, to='handmadeBid.adminuser'),
        ),
    ]
