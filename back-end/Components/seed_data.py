from models import Bin, Building
import os
from datetime import date

import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE",
                      "Test.settings")

django.setup()