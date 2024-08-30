
def x():
    pass

@app.route('/submit_love', methods=['POST'])
def submit_love():
    form_data = {key: request.form.get(key) for key in request.form.keys()}
    for key, value in form_data.items():
        new_data = FormData(route='love', field_name=key, field_value=value)
        db.session.add(new_data)
    db.session.commit()
    return render_template("index.html", data={'content': form_data, 'classes': {}})