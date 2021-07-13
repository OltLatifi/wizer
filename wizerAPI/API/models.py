from django.db import models
from django.utils import timezone


class Subject(models.Model):
    name = models.CharField(max_length=255)
    # maybe will add grades
    def __str__(self):
        return self.name


class Homework(models.Model):
    # user will be added
    subject = models.ForeignKey(Subject, on_delete=models.PROTECT)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True, max_length=500)
    date = models.DateField(auto_now_add=True)
    due_date = models.DateTimeField(default=timezone.now())

    def __str__(self):
        return '{0} | {1}'.format(self.title, self.subject)
