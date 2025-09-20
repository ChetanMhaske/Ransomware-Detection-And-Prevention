from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

# Initialize the Flask application
app = Flask(__name__)
CORS(app)

# Load the trained model and the column data
try:
    model = joblib.load('nids_model.joblib')
    model_columns = joblib.load('model_columns.pkl')
    print("✅ Model and columns loaded successfully.")
except FileNotFoundError:
    print("❌ Error: Model files not found. Please run train_model.py first.")
    model = None
    model_columns = None


# A simple test route
@app.route('/')
def home():
    return "Cyber-Sentinel ML Service is running with a trained model!"

# The main prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    if model is None or model_columns is None:
        return jsonify({"error": "Model not loaded. Please check server logs."}), 500

    try:
        # Get the data from the POST request
        json_data = request.get_json()
        
        # Convert the incoming JSON data to a pandas DataFrame
        query_df = pd.DataFrame([json_data])
        
        # One-hot encode the categorical features from the input data
        query_encoded = pd.get_dummies(query_df)
        
        # Align the columns of the input data with the model's training columns
        # This ensures the model receives data in the exact same format it was trained on
        query_aligned = query_encoded.reindex(columns=model_columns, fill_value=0)

        # Make a prediction
        prediction = model.predict(query_aligned)
        
        # Determine the result
        result = 'anomaly' if prediction[0] == 1 else 'normal'

        print(f"Prediction successful: {result.upper()}")

        return jsonify({"prediction": result})

    except Exception as e:
        print(f"❌ Error during prediction: {e}")
        return jsonify({"error": "An error occurred during prediction."}), 500


if __name__ == '__main__':
    # Run the app on port 8000
    app.run(debug=True, port=8000)