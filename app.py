from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define a model
class FormData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    route = db.Column(db.String(50), nullable=False)
    field_name = db.Column(db.String(100), nullable=False)
    field_value = db.Column(db.String(200), nullable=True)

    def __repr__(self):
        return f'<FormData {self.field_name}: {self.field_value}>'

# Create the database tables
with app.app_context():
    db.create_all()

# Sample ROUTES dictionary with content, classes, and form fields
ROUTES = {
    'about': {
        'content': {
            'heading': """
                This is a text page of Mooch!
            """,
        },
        'classes': {
            'heading': 'heading-style',
        },
        'form': {
            'fields': [
                {'type': 'text', 'name': 'doc_input', 'placeholder': 'Enter text for doc', 'required': True},
            ],
            'action': '/submit_form'
        }
    },
}

# Function factory to create route handlers with unique names
def create_route_handler(route):
    def route_handler():
        route_data = ROUTES.get(route, {'content': 'Not found', 'classes': {}, 'form': {}})
        # Ensure content is always a dictionary
        if isinstance(route_data['content'], str):
            route_data['content'] = {'text': route_data['content']}
        return render_template("index.html", data=route_data)
    return route_handler

# Create route handlers dynamically based on the ROUTES dictionary
for route in ROUTES.keys():
    app.add_url_rule(f'/{route}', endpoint=route, view_func=create_route_handler(route))

@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        route = request.form.get('route', '')
        if route in ROUTES:
            form_data = {field['name']: request.form.get(field['name']) for field in ROUTES[route].get('form', {}).get('fields', [])}
            for field_name, field_value in form_data.items():
                new_data = FormData(route=route, field_name=field_name, field_value=field_value)
                db.session.add(new_data)
            db.session.commit()
            return redirect(url_for('index'))
    
    all_data = FormData.query.all()
    return render_template("index.html", data={'content': all_data, 'classes': {}})

@app.route('/submit_form', methods=['POST'])
def submit_form():
    route = request.form.get('route', '')
    if route in ROUTES:
        form_data = {field['name']: request.form.get(field['name']) for field in ROUTES[route].get('form', {}).get('fields', [])}
        for field_name, field_value in form_data.items():
            new_data = FormData(route=route, field_name=field_name, field_value=field_value)
            db.session.add(new_data)
        db.session.commit()
        return redirect(url_for(route))
    return "Route not found", 404

if __name__ == "__main__":
    app.run(debug=True)
