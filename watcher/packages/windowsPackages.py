import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from subprocess import call 

class Watcher:
    directoryToWatch = 'Output/Windows'

    def __init__(self):
        self.observer = Observer()

    def run(self):
        eventHandler = Handler()
        self.observer.schedule(event_handler,self.directoryToWatch,recursive=True)
        self.observer.start()
        try:
            while True:
                time.sleep(5)
        except:
            self.observer.stop()
            print("Error occured while watching the folder")
        self.observer.join()


            