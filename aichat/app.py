from flask import Flask, jsonify,render_template, request,flash
from dotenv import load_dotenv
from models import agent_executor
import pyodbc
import os
import uuid

load_dotenv('.env')
app = Flask(__name__)

# print(os.getenv('USERNAME'), USERNAME)
# being implicitly converted to admin. work on later
USERNAME = 'sa'
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# use string interpolation to create a connection string variable
connectionString = f"""
    DRIVER={{ODBC Driver 17 for SQL Server}};
    SERVER={os.getenv('SERVER')};
    DATABASE={os.getenv('DATABASE')};
    UID={USERNAME};
    PWD={os.getenv('PASSWORD')};
"""

# function to remove repetitive writing of queries
def query_db(query, params=()):

    # connect to mssql database
    conn = pyodbc.connect(connectionString)     
    cursor = conn.cursor()      #cursor object to interat with db

    # execute the query given
    cursor.execute(query, params)

    # Get the column names from the cursor description
    columns = [column[0] for column in cursor.description]

    # declare empty list to store query results
    results = []
    for row in cursor.fetchall():
        # zip(columns, row) pairs each column name with the corresponding value in the row
        # dict(zip(columns, row)) creates a dictionary for each row with column names as keys
        results.append(dict(zip(columns, row)))

    # close the db connection
    conn.close()
    return results



    
# create a route to get all users from the db
@app.route('/users', methods=['GET'])
def getUsers():

    # create the query to be used
    getUsers = "SELECT * FROM Users;"
   
    try:
        data = query_db(getUsers)    
        return jsonify(data), 200
    
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)