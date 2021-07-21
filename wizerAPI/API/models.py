from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User



class Subject(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="subjects")
    # maybe will add grades
    def __str__(self):
        return self.name


class Homework(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True, max_length=500)
    date = models.DateField(auto_now_add=True)
    due_date = models.DateTimeField(default=timezone.now)
    finished = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="homework")

    def __str__(self):
        return '{0} | {1}'.format(self.title, self.subject)
    
    class Meta:
        ordering = ['due_date']
