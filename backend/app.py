from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

# Step 1: Initialize the Flask App
app = Flask(__name__)
CORS(app)

# Step 2: Load the AI Model
print("Loading the AI model...")
model = joblib.load('crop_model.joblib')
print("Model loaded successfully.")

# Step 3: Define the correct feature order
feature_columns = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']

# Step 4: Create the Prediction API Endpoint
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    print(f"Received data: {data}")
    
    try:
        input_df = pd.DataFrame([data])
        ordered_df = input_df[feature_columns]
        
        print(f"DataFrame sent to model:\n{ordered_df}")

        # --- THIS IS THE FIX ---
        # We now pass the DataFrame with column names directly to the model.
        prediction = model.predict(ordered_df)
        
        print(f"Prediction result: {prediction[0]}")
        
        return jsonify({'prediction': prediction[0]})
        
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({'error': str(e)}), 400

# Step 5: Run the Flask App
if __name__ == '__main__':
    # Set debug=False for a cleaner terminal output once it's working
    app.run(host='0.0.0.0', port=5000, debug=False)