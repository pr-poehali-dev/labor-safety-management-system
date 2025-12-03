'''
Backend function for events/activities management in ASUBT system
Handles: create, read, update, delete events and activities
'''

import json
import os
from typing import Dict, Any
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

DATABASE_URL = os.environ.get('DATABASE_URL')

def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage events and activities in ASUBT system
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
        return get_events(event, headers)
    elif method == 'POST':
        return create_event(event, headers)
    elif method == 'PUT':
        return update_event(event, headers)
    elif method == 'DELETE':
        return delete_event(event, headers)
    
    return {
        'statusCode': 405,
        'headers': headers,
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }

def get_events(event: Dict[str, Any], headers: Dict[str, str]) -> Dict[str, Any]:
    params = event.get('queryStringParameters') or {}
    event_id = params.get('id')
    status = params.get('status')
    event_type = params.get('type')
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    if event_id:
        cur.execute(
            "SELECT e.*, u.full_name as responsible_name FROM events e LEFT JOIN users u ON e.responsible_user_id = u.id WHERE e.id = %s",
            (event_id,)
        )
        evt = cur.fetchone()
        cur.close()
        conn.close()
        
        if not evt:
            return {
                'statusCode': 404,
                'headers': headers,
                'body': json.dumps({'error': 'Event not found'}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'event': dict(evt)}, default=str),
            'isBase64Encoded': False
        }
    
    query = "SELECT e.*, u.full_name as responsible_name FROM events e LEFT JOIN users u ON e.responsible_user_id = u.id WHERE 1=1"
    params_list = []
    
    if status:
        query += " AND e.status = %s"
        params_list.append(status)
    
    if event_type:
        query += " AND e.event_type = %s"
        params_list.append(event_type)
    
    query += " ORDER BY e.planned_date DESC LIMIT 100"
    
    cur.execute(query, params_list)
    events = cur.fetchall()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'events': [dict(evt) for evt in events]}, default=str),
        'isBase64Encoded': False
    }

def create_event(event: Dict[str, Any], headers: Dict[str, str]) -> Dict[str, Any]:
    body_data = json.loads(event.get('body', '{}'))
    
    title = body_data.get('title', '').strip()
    description = body_data.get('description', '')
    event_type = body_data.get('event_type', '').strip()
    responsible_user_id = body_data.get('responsible_user_id')
    planned_date = body_data.get('planned_date')
    
    if not title or not event_type:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Title and event_type are required'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute(
        "INSERT INTO events (title, description, event_type, responsible_user_id, planned_date, status) VALUES (%s, %s, %s, %s, %s, 'planned') RETURNING id, title, event_type, status, created_at",
        (title, description, event_type, responsible_user_id, planned_date)
    )
    new_event = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 201,
        'headers': headers,
        'body': json.dumps({'success': True, 'event': dict(new_event)}, default=str),
        'isBase64Encoded': False
    }

def update_event(event: Dict[str, Any], headers: Dict[str, str]) -> Dict[str, Any]:
    body_data = json.loads(event.get('body', '{}'))
    
    event_id = body_data.get('id')
    title = body_data.get('title')
    description = body_data.get('description')
    status = body_data.get('status')
    completed_date = body_data.get('completed_date')
    
    if not event_id:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Event ID is required'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    updates = []
    params = []
    
    if title:
        updates.append("title = %s")
        params.append(title)
    if description is not None:
        updates.append("description = %s")
        params.append(description)
    if status:
        updates.append("status = %s")
        params.append(status)
    if completed_date:
        updates.append("completed_date = %s")
        params.append(completed_date)
    
    updates.append("updated_at = CURRENT_TIMESTAMP")
    params.append(event_id)
    
    query = f"UPDATE events SET {', '.join(updates)} WHERE id = %s RETURNING id, title, status, updated_at"
    
    cur.execute(query, params)
    updated_event = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    
    if not updated_event:
        return {
            'statusCode': 404,
            'headers': headers,
            'body': json.dumps({'error': 'Event not found'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'success': True, 'event': dict(updated_event)}, default=str),
        'isBase64Encoded': False
    }

def delete_event(event: Dict[str, Any], headers: Dict[str, str]) -> Dict[str, Any]:
    params = event.get('queryStringParameters') or {}
    event_id = params.get('id')
    
    if not event_id:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Event ID is required'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    cur.execute("DELETE FROM events WHERE id = %s", (event_id,))
    affected = cur.rowcount
    conn.commit()
    cur.close()
    conn.close()
    
    if affected == 0:
        return {
            'statusCode': 404,
            'headers': headers,
            'body': json.dumps({'error': 'Event not found'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'success': True}),
        'isBase64Encoded': False
    }
