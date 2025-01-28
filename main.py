from app import create_app
from waitress import serve

app = create_app()
app.secret_key = "secret"

if __name__ == '__main__':
    print("Server is running on http://localhost:8080")
    serve(app, host='0.0.0.0', port=8080, threads=4)