# Generated by Django 4.2 on 2023-05-24 22:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0004_agent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agent',
            name='token',
            field=models.CharField(db_index=True, default='a_d1e13ad0-7e9f-437f-9d66-5e18c45367d4', max_length=255, unique=True),
        ),
    ]