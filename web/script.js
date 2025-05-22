document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
    const welcomeMessageDiv = document.getElementById('welcomeMessage');

    messageDiv.textContent = '';
    messageDiv.className = '';
    welcomeMessageDiv.style.display = 'none';
    welcomeMessageDiv.textContent = '';

    try {
        // 监听登录表单提交事件
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (response.ok && result.code === 0) {
            // 登录成功，显示提示信息
            messageDiv.textContent = result.message;
            messageDiv.className = 'success';
            // 存储 token 到 localStorage
            if(result.data && result.data.token) {
                localStorage.setItem('token', result.data.token);
            }
            // 显示欢迎信息
            welcomeMessageDiv.textContent = `欢迎，${username}`;
            welcomeMessageDiv.style.display = 'block';
            document.getElementById('loginForm').style.display = 'none'; // 隐藏表单
        } else {
            // 登录失败，显示错误信息
            messageDiv.textContent = result.message || '登录失败，请重试。';
            messageDiv.className = 'error';
        }
    } catch (error) {
        // 网络或其他异常
        console.error('Login error:', error);
        messageDiv.textContent = '登录请求失败，请检查网络连接或联系管理员。';
        messageDiv.className = 'error';
    }
});