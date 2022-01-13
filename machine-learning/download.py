from roboflow import Roboflow
rf = Roboflow(api_key="QzF9mescfCesntv5od4N")
project = rf.workspace().project("hard-hat-sample-vpade")
dataset = project.version(2).download("yolov5")