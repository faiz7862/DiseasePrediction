from flask import Flask, render_template, request ,jsonify
import numpy as np
import pandas as pd
from scipy.stats import mode
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix
import pickle

app = Flask(__name__, static_folder='static', template_folder='templates')

# Load the trained models using pickle
with open('combined_model.pkl', 'rb') as file:
    saved_data = pickle.load(file)

loaded_final_svm_model = saved_data['final_svm_model']
loaded_final_nb_model = saved_data['final_nb_model']
loaded_final_rf_model = saved_data['final_rf_model']
loaded_symptom_index = saved_data['symptom_index']
loaded_predictions_classes = saved_data['predictions_classes']


df1 = pd.read_csv ("dataset\symptom_precaution.csv")

with open('D:\Diseases_prediction\Disease-prediction.pkl', 'rb') as file:
    loaded_fetch_precautions = pickle.load(file)

@app.route('/')
def index():
    return render_template("Home.html")

@app.route('/Check')
def Check():

    options = ['Select the Symptom','Itching','Skin Rash','Nodal Skin Eruptions','Continuous Sneezing','Shivering','Chills','Joint Pain','Stomach Pain','Acidity','Ulcers On Tongue','Muscle Wasting'
,'Vomiting','Burning Micturition','Spotting Urination','Fatigue','Weight Gain','Anxiety','Cold Hands And Feets','Mood Swings','Weight Loss'
,'Restlessness','Lethargy','Patches In Throat','Irregular Sugar Level','Cough',
'High Fever','Sunken Eyes','Breathlessness','Sweating','Dehydration','Indigestion','Headache','Yellowish Skin','Dark Urine','Nausea','Loss Of Appetite','Pain Behind The Eyes'
,'Back Pain','Constipation','Abdominal Pain','Diarrhoea','Mild Fever','Yellow Urine','Yellowing Of Eyes','Acute Liver Failure','Fluid Overload','Swelling Of Stomach','Swelled Lymph Nodes'
,'Malaise','Blurred And Distorted Vision','Phlegm','Throat Irritation','Redness Of Eyes','Sinus Pressure','Runny Nose','Congestion'
,'Chest Pain','Weakness In Limbs','Fast Heart Rate'
,'Pain During Bowel Movements','Pain In Anal Region','Bloody Stool','Irritation In Anus','Neck Pain','Dizziness','Cramps','Bruising','Obesity','Swollen Legs'
,'Swollen Blood Vessels','Puffy Face And Eyes','Enlarged Thyroid','Brittle Nails','Swollen Extremeties','Excessive Hunger','Extra Marital Contacts'
,'Drying And Tingling Lips','Slurred Speech','Knee Pain','Hip Joint Pain','Muscle Weakness','Stiff Neck','Swelling Joints','Movement Stiffness','Spinning Movements'
,'Loss Of Balance','Unsteadiness','Weakness Of One Body Side','Loss Of Smell','Bladder Discomfort','Foul Smell Ofurine','Continuous Feel Of Urine'
,'Passage Of Gases','Internal Itching','Toxic Look (Typhos)','Depression','Irritability','Muscle Pain','Altered Sensorium','Red Spots Over Body'
,'Belly Pain','Abnormal Menstruation','Dischromic Patches','Watering From Eyes','Increased Appetite','Polyuria','Family History'
,'Mucoid Sputum','Rusty Sputum','Lack Of Concentration','Visual Disturbances','Receiving Blood Transfusion','Receiving Unsterile Injections','Coma'
,'Stomach Bleeding','Distention Of Abdomen','History Of Alcohol Consumption','Fluid Overload','Blood In Sputum','Prominent Veins On Calf','Palpitations'
,'Painful Walking','Pus Filled Pimples','Blackheads','Scurring','Skin Peeling','Silver Like Dusting','Small Dents In Nails','Inflammatory Nails'
,'Blister','Red Sore Around Nose','Yellow Crust Ooze'
,'Prognosis']
    return render_template('Check.html', options=options)

@app.route('/About')
def About():
    return render_template("About.html")

@app.route('/Feedback')
def Feedback():
    return render_template("Feedback.html")

@app.route('/Signup')
def Signup():
    return render_template("Signup.html")

@app.route('/diseasse_analysis')
def diseasse_analysis():
    return render_template("diseasse_analysis.html")

@app.route('/weather')
def weather():
    return render_template("weather.html")

@app.route('/indexx')
def indexx():
    return render_template("indexx.html")



@app.route('/predict', methods=['POST'])
def predict():
    symptoms = [
        request.form['symptom1'],
        request.form['symptom2'],
        request.form['symptom3'],
        request.form['symptom4'],
        request.form['symptom5'],
        request.form['symptom6']
        
        ]
    

    result = predictDisease(symptoms)
    return jsonify(result)


def predict1():
    

    result1 = fetch_precautions(result)
    return jsonify(result1)







def predictDisease(symptoms):
    # creating input data for the models
    input_data = [0] * len(loaded_symptom_index)
    for symptom in symptoms:
        index = loaded_symptom_index[symptom]
        input_data[index] = 1
        
    # reshaping the input data and converting it
    # into suitable format for model predictions
    input_data = np.array(input_data).reshape(1, -1)
    
    # generating individual outputs
    rf_prediction = loaded_predictions_classes[loaded_final_rf_model.predict(input_data)[0]]
    nb_prediction = loaded_predictions_classes[loaded_final_nb_model.predict(input_data)[0]]
    svm_prediction = loaded_predictions_classes[loaded_final_svm_model.predict(input_data)[0]]
    
    # making final prediction by taking mode of all predictions
    final_prediction = mode([rf_prediction, nb_prediction, svm_prediction])[0][0]
    predictions = {
        "final_prediction": final_prediction
    }
    return predictions


def fetch_precautions(result):
    try:
        # Finding the row corresponding to the given disease
        row = df1[df1['Disease'] == result].iloc[0]

        # Extracting precautions from the row
        precautions = [row['Precaution_1'], row['Precaution_2'], row['Precaution_3'], row['Precaution_4']]
        
        # Removing any NaN values
        precautions = [precaution for precaution in precautions if pd.notna(precaution)]

        return precautions
    except IndexError:
        return f"No information found for '{result}'"


if __name__ == '__main__':
    app.run(debug=True)

