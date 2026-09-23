# Flask listens for browser requests and answers them
# Jsonify turns python data to JSON so JavaScript can read it
# render_template finds the HTML file and sends it to the web browser
# sqlite3 is there to talk to the db

from flask import Flask, jsonify, render_template
import sqlite3

# builds server object
# app = Flask (current directory)
app = Flask(__name__)

# if url => run function
# when someone gets to the root website, run this
@app.route('/')
def index():
    return render_template('index.html')

# backdoor
# connect db with json data
@app.route('/api/db')
def get_all():
    # opens database
    conn = sqlite3.connect('wolfCleaned.db') # connects to file
    cursor = conn.cursor() # sends query, reads results

    # run query
    cursor.execute('SELECT * FROM my_table') #cursor, read everything from the table
    rows = cursor.fetchall() # cursor, translate all this data into python and save it in rows
    columns = [desc[0] for desc in cursor.description] #cursor, get the column names
    conn.close() # close connection
    data = [dict(zip(columns, row)) for row in rows] # zip, pair each name with its value and turn it into a dictionary
    return jsonify(data) # turn into json in browser

# run server
if __name__ == '__main__':
    app.run() #dont leave debug=true here