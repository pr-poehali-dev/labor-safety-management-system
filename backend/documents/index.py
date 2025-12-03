'''
Backend function for document management in ASUBT system
Handles: create, read, update, delete documents
'''

import json
import os
from typing import Dict, Any, List
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

DATABASE_URL = os.environ.get('DATABASE_URL')

def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage documents in ASUBT system
    Args: event with httpMethod, body, queryStringParameters, headers
          context with request_id, function_name attributes
    Returns: HTTP response with operation result
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    if method == 'GET':
        return get_documents(event, headers)
    elif method == 'POST':
        return create_document(event, headers)
    elif method == 'PUT':
        return update_document(event, headers)
    elif method == 'DELETE':
        return delete_document(event, headers)
    
    return {
        'statusCode': 405,
        'headers': headers,
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }

def get_documents(event: Dict[str, Any], headers: Dict[str, str]) -> Dict[str, Any]:
    params = event.get('queryStringParameters') or {}
    doc_id = params.get('id')
    doc_type = params.get('type')
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    if doc_id:
        cur.execute(
            "SELECT d.*, u.full_name as creator_name FROM documents d LEFT JOIN users u ON d.created_by = u.id WHERE d.id = %s",
            (doc_id,)
        )
        document = cur.fetchone()
        cur.close()
        conn.close()
        
        if not document:
            return {
                'statusCode': 404,
                'headers': headers,
                'body': json.dumps({'error': 'Document not found'}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'document': dict(document)}, default=str),
            'isBase64Encoded': False
        }
    
    query = "SELECT d.*, u.full_name as creator_name FROM documents d LEFT JOIN users u ON d.created_by = u.id WHERE d.status = 'active'"
    params_list = []
    
    if doc_type:
        query += " AND d.doc_type = %s"
        params_list.append(doc_type)
    
    query += " ORDER BY d.created_at DESC LIMIT 100"
    
    cur.execute(query, params_list)
    documents = cur.fetchall()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'documents': [dict(doc) for doc in documents]}, default=str),
        'isBase64Encoded': False
    }

def create_document(event: Dict[str, Any], headers: Dict[str, str]) -> Dict[str, Any]:
    body_data = json.loads(event.get('body', '{}'))
    
    title = body_data.get('title', '').strip()
    doc_type = body_data.get('doc_type', '').strip()
    content = body_data.get('content', '')
    file_url = body_data.get('file_url', '')
    created_by = int(body_data.get('created_by', 1))
    
    if not title or not doc_type:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Title and doc_type are required'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute(
        "INSERT INTO documents (title, doc_type, content, file_url, created_by) VALUES (%s, %s, %s, %s, %s) RETURNING id, title, doc_type, created_at",
        (title, doc_type, content, file_url, created_by)
    )
    document = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 201,
        'headers': headers,
        'body': json.dumps({'success': True, 'document': dict(document)}, default=str),
        'isBase64Encoded': False
    }

def update_document(event: Dict[str, Any], headers: Dict[str, str]) -> Dict[str, Any]:
    body_data = json.loads(event.get('body', '{}'))
    
    doc_id = body_data.get('id')
    title = body_data.get('title')
    content = body_data.get('content')
    file_url = body_data.get('file_url')
    
    if not doc_id:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Document ID is required'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    updates = []
    params = []
    
    if title:
        updates.append("title = %s")
        params.append(title)
    if content is not None:
        updates.append("content = %s")
        params.append(content)
    if file_url is not None:
        updates.append("file_url = %s")
        params.append(file_url)
    
    updates.append("updated_at = CURRENT_TIMESTAMP")
    params.append(doc_id)
    
    query = f"UPDATE documents SET {', '.join(updates)} WHERE id = %s RETURNING id, title, updated_at"
    
    cur.execute(query, params)
    document = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    
    if not document:
        return {
            'statusCode': 404,
            'headers': headers,
            'body': json.dumps({'error': 'Document not found'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'success': True, 'document': dict(document)}, default=str),
        'isBase64Encoded': False
    }

def delete_document(event: Dict[str, Any], headers: Dict[str, str]) -> Dict[str, Any]:
    params = event.get('queryStringParameters') or {}
    doc_id = params.get('id')
    
    if not doc_id:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Document ID is required'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    cur.execute("UPDATE documents SET status = 'deleted' WHERE id = %s", (doc_id,))
    affected = cur.rowcount
    conn.commit()
    cur.close()
    conn.close()
    
    if affected == 0:
        return {
            'statusCode': 404,
            'headers': headers,
            'body': json.dumps({'error': 'Document not found'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'success': True}),
        'isBase64Encoded': False
    }
