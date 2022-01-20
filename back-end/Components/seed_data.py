from models import Bin, Building
import os
from datetime import date

import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE",
                      "Test.settings")

django.setup()


Building.objects.bulk_create([
    Building(building_name='EV Building'),
    Building(building_name='Hall Building'),
    Building(building_name='Library Building')
])
