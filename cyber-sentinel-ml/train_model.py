import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

print("--- Script Started ---")

# 1. Load the dataset
try:
    df = pd.read_csv('data/Train_data.csv')
    print("✅ Dataset loaded successfully.")
except FileNotFoundError:
    print("❌ Error: Train_data.csv not found in the 'data' folder.")
    exit()

# 2. Preprocess the data
# For this dataset, many columns are strings (categorical). We'll convert them to numbers.
# We also simplify the problem to binary classification: 'normal' or 'anomaly'.
df['class'] = df['class'].apply(lambda x: 0 if x == 'normal' else 1)

# One-hot encode categorical features
categorical_cols = ['protocol_type', 'service', 'flag']
df_encoded = pd.get_dummies(df, columns=categorical_cols, drop_first=True)

print("✅ Data preprocessing complete.")

# 3. Define features (X) and target (y)
X = df_encoded.drop('class', axis=1)
y = df_encoded['class']

# Align columns - crucial for when we predict with new data
# In a real-world scenario, you'd save these columns to ensure consistency
model_columns = list(X.columns)
joblib.dump(model_columns, 'model_columns.pkl')
print(f"✅ Model columns saved to model_columns.pkl")


# 4. Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
print("✅ Data split into training and testing sets.")

# 5. Train the Random Forest model
print("⏳ Training Random Forest model... (This may take a moment)")
model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
model.fit(X_train, y_train)
print("✅ Model training complete.")

# 6. Evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"📈 Model Accuracy: {accuracy * 100:.2f}%")

# 7. Save the trained model to a file
joblib.dump(model, 'nids_model.joblib')
print("✅ Trained model saved to nids_model.joblib")

print("--- Script Finished ---")