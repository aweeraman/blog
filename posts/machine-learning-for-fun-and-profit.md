---
title: "Machine learning for fun and profit"
date: "2017-04-15"
path: "/machine-learning-for-fun-and-profit"
excerpt: "Machine learning and artificial intelligence has been going through a phase of democratization to the point that in recent years the…"
feature_image: "/images/2024/03/1-ggcalx43tz-7heh3a407da-1.png"
---

Machine learning and artificial intelligence has been going through a phase of democratization to the point that in recent years the barrier to entry for technologies that can be used to build intelligent and self learning applications is at an all time low. I will show just how easy it is to get started with machine learning by walking you through building a simple classifier using open source technologies.

For this example, we use a [publicly available multi-variate data set](https://en.wikipedia.org/wiki/Iris_flower_data_set) for the identification of three species of the Iris flower based on the length and width of its sepals and petals. The British statistician and biologist Ronald Fisher collected 50 measurements each of the three species of the Iris flower on one fine day in a lush pasture in the Gaspé Peninsula and recorded the measurements of the length and width of the sepals and petals that can be used to identify the exact species of the Iris flower. Here’s a snippet of the dataset for the three species:

![](/images/2024/03/1-dt3owaxje1jhixfqtuebyq.png)

![](/images/2024/03/1--fgqec-e6kji_q5mp9jidg.png)

![](/images/2024/03/1-kj_8jy77d5mci3mffaekmq.png)

What I’m going to show you, is how we can use this simple data set to train a classifier using machine learning techniques. But what is a classifier? In this case, it’s something that can tell you the species of the flower given the sepal and petal characteristics.

Why machine learning you may ask, when you can simply write a bunch of if conditions? While possible, as the data set grows, individually checking the characteristics is going to be tedious. And what’s more, those rules gets hardcoded so that when new characteristics emerge it becomes increasingly difficult to manage it by hand. That’s where machine learning and the associated statistical techniques become a great way to codify the rules, or features as it’s known in data science parlance, and encode it in a model that’s capable of “learning” the associations from features to species on it’s own, and be able to do so continually.

There are many such classification algorithms out there, each with it’s own strengths and weaknesses. So there really is no one algorithm that fits all. For this example, we will use [Support Vector Machine (SVM)](https://en.wikipedia.org/wiki/Support_vector_machine) and in a later post do a quick comparison with [Decision Trees](https://en.wikipedia.org/wiki/Decision_tree_learning), [KNN](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) and [Random Forest](https://en.wikipedia.org/wiki/Random_forest).

For this, you’re going to need [Python](https://www.python.org/) and [scikit-learn](http://scikit-learn.org/stable/index.html). I’ll assume you have Python setup already and have some working knowledge of the language, and if you don’t, [an hour is all you need](https://www.youtube.com/watch?v=oy4GOI9vn5M). I’ll assume Python 3+ for this exercise and for folks who would like to simplify their lives when using both Python 3+ and 2.7, do check out the [Anaconda distribution](https://www.continuum.io/anaconda-overview).

To get started:pip3 install scikit-learn

Let us now build and train the classifier in 4 lines of Python code:

```python
from sklearn import datasets, svm
iris = datasets.load_iris()
svm_classifier = svm.SVC(gamma=0.001)
svm_classifier.fit(iris.data, iris.target)
```** Line 1:** Import datasets and svm objects from the sklearn module** Line 2:** The scikit-learn package comes with the iris dataset built in, so a simple call to datasets.load_iris() pulls up the features that you saw in the table earlier.

The data looks a little like this:

```
[[ 5.1,  3.5,  1.4,  0.2],
[ 4.9,  3. ,  1.4,  0.2],
[ 4.7,  3.2,  1.3,  0.2],
[ 4.6,  3.1,  1.5,  0.2],
[ 5. ,  3.6,  1.4,  0.2],
...
```
This is a list of arrays with sepal and petal lengths and widths of the Iris flower.** Line 3:** This is where the appropriate classification algorithm is instantiated. Here we choose to instantiate the SVM algorithm. Each algorithm comes with it’s own set of tunables that can be used to tweak the functioning of the model and its accuracy.** Line 4:** This is where the training happens. We take the features from the data set and tell the classifier what each of them are supposed to be. The iris.target object contains an array of 150 elements that map to each of the arrays in the data set that tell the classifier the associated species of the flower.

```
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
```
The numbers 0, 1 and 2 correspond to the the three species setosa, versicolor and virginica. The type of flower is known as a label and is used by the classifier to create the model to map the features so that it’s later able to identify and classify the species provided the same or similar features as input. This is known as supervised learning.

At this point, we now have an SVM model that has been trained with the data required to identify and classify the three species of the Iris flower provided the sepal lengths and widths. Let’s see how that can be done:

```python
def classify(classifier, data):
  species = {
    0: "I. setosa",
    1: "I. versicolor",
    2: "I. virginica"
  }
  cls = classifier.predict(data)
  print ("{} = {}".format(data, species.get(cls[0])))
```
We have created a method above, that when given the classifier that we trained in the previous step and some data, it uses the model to classify the type of flower and print to the console what type of flower it is. Since the model used 0, 1 and 2 to identify the species of the flower, it needs to get mapped to the human readable name of the flower.

This above method can be invoked as follows:

```python
classify(svm_classifier, [[5.1, 3.5, 1.4, 0.2]])
classify(svm_classifier, [[5.7, 3.0, 4.2, 1.2]])
classify(svm_classifier, [[6.5, 3.0, 5.2, 2.0]])
```
And you’ll see the following output indicating correct classification in all three cases:

```
[[5.1, 3.5, 1.4, 0.2]] = I. setosa
[[5.7, 3.0, 4.2, 1.2]] = I. versicolor
[[6.5, 3.0, 5.2, 2.0]] = I. virginica
```
Here’s the complete program:

```python
from sklearn import datasets, svm
def classify(classifier, data):
  species = {
    0: "I. setosa",
    1: "I. versicolor",
    2: "I. virginica"
  }
  cls = classifier.predict(data)
  print ("{} = {}".format(data, species.get(cls[0])))
iris = datasets.load_iris()
svm_classifier = svm.SVC(gamma=0.001)
svm_classifier.fit(iris.data, iris.target)
classify(svm_classifier, [[5.1, 3.5, 1.4, 0.2]])
classify(svm_classifier, [[5.7, 3.0, 4.2, 1.2]])
classify(svm_classifier, [[6.5, 3.0, 5.2, 2.0]])
```
Have fun with machine learning!
