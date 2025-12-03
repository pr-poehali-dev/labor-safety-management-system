'''
Backend function for user authentication and authorization in ASUBT system
Handles: registration, login, token validation, role-based access
'''

import json
import os
import hashlib
import secrets
from typing import Dict, Any, Optional
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor

DATABASE_URL = os.environ.get('DATABASE_URL')

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def generate_token() -> str:
    return secrets.token_urlsafe(32)

def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Handle user authentication and authorization
    Args: event with httpMethod, body, queryStringParameters, headers
          context with request_id, function_name attributes
    Returns: HTTP response with auth result
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    path = event.get('queryStringParameters', {}).get('action', '')
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        if path == 'register':
            return register_user(body_data)
        elif path == 'login':
            return login_user(body_data)
        elif path == 'validate':
            token = event.get('headers', {}).get('x-auth-token', '')
            return validate_token(token)
    
    return {
        'statusCode': 400,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Invalid request'}),
        'isBase64Encoded': False
    }

def register_user(data: Dict[str, Any]) -> Dict[str, Any]:
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    full_name = data.get('full_name', '')
    department = data.get('department', '')
    position = data.get('position', '')
    
    if not email or not password or not full_name:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email, password and full_name are required'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("SELECT id FROM users WHERE email = %s", (email,))
    existing = cur.fetchone()
    
    if existing:
        cur.close()
        conn.close()
        return {
            'statusCode': 409,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'User already exists'}),
            'isBase64Encoded': False
        }
    
    password_hash = hash_password(password)
    role = 'user'
    
    cur.execute(
        "INSERT INTO users (email, password_hash, full_name, role, department, position) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id, email, full_name, role",
        (email, password_hash, full_name, role, department, position)
    )
    user = cur.fetchone()
    conn.commit()
    
    token = generate_token()
    cur.execute(
        "INSERT INTO notifications (user_id, title, message, type) VALUES (%s, %s, %s, %s)",
        (user['id'], 'Добро пожаловать!', 'Вы успешно зарегистрированы в системе АСУБТ', 'info')
    )
    conn.commit()
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 201,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'success': True,
            'token': token,
            'user': dict(user)
        }),
        'isBase64Encoded': False
    }

def login_user(data: Dict[str, Any]) -> Dict[str, Any]:
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    
    if not email or not password:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email and password are required'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    password_hash = hash_password(password)
    
    cur.execute(
        "SELECT id, email, full_name, role, department, position, is_active FROM users WHERE email = %s AND password_hash = %s",
        (email, password_hash)
    )
    user = cur.fetchone()
    
    cur.close()
    conn.close()
    
    if not user:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid credentials'}),
            'isBase64Encoded': False
        }
    
    if not user['is_active']:
        return {
            'statusCode': 403,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Account is disabled'}),
            'isBase64Encoded': False
        }
    
    token = generate_token()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'success': True,
            'token': token,
            'user': dict(user)
        }),
        'isBase64Encoded': False
    }

def validate_token(token: str) -> Dict[str, Any]:
    if not token or len(token) < 10:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid token'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'valid': True}),
        'isBase64Encoded': False
    }
