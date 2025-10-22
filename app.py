from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def home():
   try:
        return render_template('index.html')
   except Exception as e:
        return f"<h1>Error 501</h1><p>{e}</p>"

@app.route("/calculadora")
def calculadora():
   try:
        return render_template('calculadora.html')
   except Exception as e:
        return f"<h1>Error 501</h1><p>{e}</p>"
   

@app.route("/archivos")
def archivos():
   try:
        return render_template('archivos.html')
   except Exception as e:
        return f"<h1>Error 501</h1><p>{e}</p>"



@app.route("/blog")
def blog():
   try:
        return render_template('blog.html')
   except Exception as e:
        return f"<h1>Error 501</h1><p>{e}</p>"


@app.route("/foro")
def foro():
   try:
        return render_template('foro.html')
   except Exception as e:
        return f"<h1>Error 501</h1><p>{e}</p>"




if __name__ == '__main__':
     app.run(debug=True, port=8080, host="0.0.0.0")
