# Machine Learning

To use the machine learning code, use the Jane Walker google account and go to the `online-training` google colab notebook. From there, you can simply follow the notebook to run the code and train a model!

Alternatively, you can train on your computer directly. To do so, perform the following steps:

1. Ensure you've run `pip install -r requirements.txt` to install the required python packages from the root directory.
2. Navigate to `machine-learning` by using `cd machine-learning`.
3. Run `download.py`
4. Move the contents of the new data folder to `machine-learning/data` (and delete the now empty folder).
5. Update `train` and `val` in `machine-learning/data/data.yaml` to `data/train/images` and `data/train/images`, respectively.
6. Run `python train.py` to download a pretrained YOLOv5 model and train on top of it. Keep in mind, this will run for 300 epochs which is not necessary; you can stop whenever you'd like!
7. You can now choose between `yolov5s.pt`, `last.pt`, and `best.pt` to convert to a Tensorflow.js-compatible file representing the trained model. (`best.pt` is the best choice for this as this version of the model is saved when the model achieves its best performance)

<h3><ins>This is a much more complicated process than just using the google colab page, which runs smoother with less steps while also saving your resources by running on the cloud!<ins></h3>