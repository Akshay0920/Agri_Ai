# Import necessary libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Step 1: Load the dataset
# We read our CSV file into a format that Python can understand.
print("Loading dataset...")
df = pd.read_csv('Crop_recommendation.csv')

# Step 2: Prepare the data
# We separate the data into features (X) and the target (y).
# Features are the inputs: N, P, K, temperature, etc.
# Target is the output we want to predict: the crop label.
X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
y = df['label']

# Step 3: Split the data
# We split our data into a training set (to teach the model)
# and a testing set (to see how well it learned).
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print("Data prepared and split for training.")

# Step 4: Train the AI model
# We use a RandomForestClassifier, which is a powerful and reliable ML model.
# The .fit() function is where the model learns from the training data.
print("Training the model...")
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
print("Model training complete.")

# Step 5: Evaluate the model
# We make predictions on our test data and check the accuracy.
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Step 6: Save the trained model
# We save our trained model to a file so our web app can use it later
# without having to retrain it every time.
joblib.dump(model, 'crop_model.joblib')
print("Model saved as crop_model.joblib")