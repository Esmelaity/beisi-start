# 导入Flask相关库
from flask import Flask, request, jsonify
# 导入CORS支持库
from flask_cors import CORS
# 导入uuid用于生成唯一token
import uuid

# 创建Flask应用实例
app = Flask(__name__)
# 启用所有路由的跨域请求支持
CORS(app)  # Enable CORS for all routes

# Hardcoded credentials
HARDCODED_USERNAME = "admin"
HARDCODED_PASSWORD = "123456"

# 根路由，返回欢迎信息
@app.route('/', methods=['GET'])
def index():
    return '<h2>欢迎使用后端API服务。请通过POST方式访问 /api/login 进行登录。</h2>'

# 登录接口，校验用户名和密码，返回token
@app.route('/api/login', methods=['POST'])
def login():
    print("[调试] request.get_json():", request.get_json())
    data = request.get_json()
    if not data:
        return jsonify({"code": 1, "message": "Request body must be JSON", "data": None}), 400

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"code": 1, "message": "Username and password are required", "data": None}), 400

    if username == HARDCODED_USERNAME and password == HARDCODED_PASSWORD:
        # 生成模拟token
        token = str(uuid.uuid4())
        return jsonify({
            "code": 0,
            "message": "Login successful",
            "data": {
                "token": token
            }
        })
    else:
        return jsonify({
            "code": 1,
            "message": "Invalid username or password",
            "data": None
        })

# 程序主入口，启动Flask服务
if __name__ == '__main__':
    app.run(debug=True, port=5000, host="0.0.0.0")
