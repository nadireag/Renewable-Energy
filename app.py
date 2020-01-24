# import dependencies
import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

from dotenv import load_dotenv
load_dotenv()


# create the flask app
app = Flask(__name__, static_url_path="/static")

# get the heroku database url from environment
db_uri = os.environ["DATABASE_URL"]

# app configuration
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

# db setup
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Renewable_History = Base.classes.renewable_history
Consumption_History = Base.classes.consumption_history

# View routes
@app.route("/")
def landing_page():
    return render_template("index.html")

# @app.route("/map")
# def map():
#     return render_template("map.html", API_KEY=os.environ["API_KEY"])

@app.route("/predictions")
def plots():
    return render_template("predictions.html")


# API routes for data
# renewable production data route
@app.route("/api/renewable_history")
def get_renewable_history_data():
    sel = [
        Renewable_History.state,
        Renewable_History.year,
        Renewable_History.data
    ]

    results = db.session.query(*sel).all()
    return jsonify(results)

# consumption data route
@app.route("/api/consumption_history")
def get_consumption_history_data():
    sel = [
        Consumption_History.state,
        Consumption_History.year,
        Consumption_History.data
    ]

    results = db.session.query(*sel).all()

    return jsonify(results)

# run the app
if __name__ == "__main__":
    app.run(debug=True)
