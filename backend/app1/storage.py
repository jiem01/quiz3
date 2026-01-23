from django.core.files.storage import FileSystemStorage
import os

class OverwriteStorage(FileSystemStorage):
    def get_available_name(self, name, max_length=None):
        if self.exists(name):
            try:
                # Get the full path to the file
                file_path = os.path.join(self.location, name)
                os.remove(file_path)
            except PermissionError:
                # If Windows locks the file, let Django fallback 
                # to the default behavior (random name) instead of crashing.
                return super().get_available_name(name, max_length)
        return name