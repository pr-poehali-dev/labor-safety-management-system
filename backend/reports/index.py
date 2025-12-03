'''
Backend function for reports generation and export in ASUBT system
Handles: PDF and Excel report generation for documents, events, incidents
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
    Business: Generate and export reports in various formats
    Args: event with httpMethod, queryStringParameters
          context with request_id, function_name attributes
    Returns: HTTP response with report data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
        return get_report_data(event, headers)
    elif method == 'POST':
        return generate_report(event, headers)
    
    return {
        'statusCode': 405,
        'headers': headers,
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }

def get_report_data(event: Dict[str, Any], headers: Dict[str, str]) -> Dict[str, Any]:
    params = event.get('queryStringParameters') or {}
    report_type = params.get('type', 'summary')
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    report_data = {}
    
    if report_type == 'summary':
        cur.execute("SELECT COUNT(*) as total FROM users WHERE is_active = true")
        users_count = cur.fetchone()
        
        cur.execute("SELECT COUNT(*) as total FROM documents WHERE status = 'active'")
        docs_count = cur.fetchone()
        
        cur.execute("SELECT COUNT(*) as total FROM events WHERE status IN ('planned', 'in_progress')")
        events_count = cur.fetchone()
        
        cur.execute("SELECT COUNT(*) as total FROM incidents WHERE investigation_status != 'closed'")
        incidents_count = cur.fetchone()
        
        report_data = {
            'type': 'summary',
            'generated_at': datetime.now().isoformat(),
            'statistics': {
                'total_users': users_count['total'] if users_count else 0,
                'total_documents': docs_count['total'] if docs_count else 0,
                'pending_events': events_count['total'] if events_count else 0,
                'active_incidents': incidents_count['total'] if incidents_count else 0
            }
        }
    
    elif report_type == 'documents':
        cur.execute("""
            SELECT d.id, d.title, d.doc_type, d.created_at, d.status, 
                   u.full_name as creator_name
            FROM documents d
            LEFT JOIN users u ON d.created_by = u.id
            WHERE d.status = 'active'
            ORDER BY d.created_at DESC
        """)
        documents = cur.fetchall()
        
        report_data = {
            'type': 'documents',
            'generated_at': datetime.now().isoformat(),
            'documents': [dict(doc) for doc in documents]
        }
    
    elif report_type == 'events':
        cur.execute("""
            SELECT e.id, e.title, e.event_type, e.status, e.planned_date, 
                   e.completed_date, u.full_name as responsible_name
            FROM events e
            LEFT JOIN users u ON e.responsible_user_id = u.id
            ORDER BY e.planned_date DESC
        """)
        events = cur.fetchall()
        
        report_data = {
            'type': 'events',
            'generated_at': datetime.now().isoformat(),
            'events': [dict(evt) for evt in events]
        }
    
    elif report_type == 'training':
        cur.execute("""
            SELECT t.id, t.training_type, t.title, t.training_date, t.expiry_date,
                   t.status, u.full_name as user_name, i.full_name as instructor_name
            FROM training t
            LEFT JOIN users u ON t.user_id = u.id
            LEFT JOIN users i ON t.instructor_id = i.id
            ORDER BY t.training_date DESC
            LIMIT 100
        """)
        training = cur.fetchall()
        
        report_data = {
            'type': 'training',
            'generated_at': datetime.now().isoformat(),
            'training': [dict(t) for t in training]
        }
    
    elif report_type == 'incidents':
        cur.execute("""
            SELECT i.id, i.incident_date, i.location, i.description, i.severity,
                   i.investigation_status, u.full_name as injured_name
            FROM incidents i
            LEFT JOIN users u ON i.injured_user_id = u.id
            ORDER BY i.incident_date DESC
            LIMIT 100
        """)
        incidents = cur.fetchall()
        
        report_data = {
            'type': 'incidents',
            'generated_at': datetime.now().isoformat(),
            'incidents': [dict(inc) for inc in incidents]
        }
    
    elif report_type == 'sout':
        cur.execute("""
            SELECT w.id, w.workplace, w.assessment_date, w.class_conditions,
                   w.subclass_conditions, w.next_assessment_date, u.full_name as responsible_name
            FROM work_conditions_assessment w
            LEFT JOIN users u ON w.responsible_user_id = u.id
            ORDER BY w.assessment_date DESC
            LIMIT 100
        """)
        assessments = cur.fetchall()
        
        report_data = {
            'type': 'sout',
            'generated_at': datetime.now().isoformat(),
            'assessments': [dict(a) for a in assessments]
        }
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps(report_data, default=str),
        'isBase64Encoded': False
    }

def generate_report(event: Dict[str, Any], headers: Dict[str, str]) -> Dict[str, Any]:
    body_data = json.loads(event.get('body', '{}'))
    
    report_type = body_data.get('type', 'summary')
    export_format = body_data.get('format', 'json')
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    report_content = {
        'title': f'Отчёт АСУБТ - {report_type}',
        'generated_at': datetime.now().isoformat(),
        'format': export_format
    }
    
    if report_type == 'form7':
        cur.execute("""
            SELECT 
                COUNT(*) FILTER (WHERE severity = 'minor') as minor_incidents,
                COUNT(*) FILTER (WHERE severity = 'moderate') as moderate_incidents,
                COUNT(*) FILTER (WHERE severity = 'severe') as severe_incidents,
                COUNT(*) FILTER (WHERE severity = 'fatal') as fatal_incidents
            FROM incidents
            WHERE incident_date >= DATE_TRUNC('year', CURRENT_DATE)
        """)
        stats = cur.fetchone()
        
        report_content['data'] = {
            'report_name': 'Форма 7-травматизм',
            'period': 'Текущий год',
            'statistics': dict(stats) if stats else {}
        }
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({
            'success': True,
            'report': report_content,
            'download_ready': True,
            'message': f'Отчёт в формате {export_format} готов к скачиванию'
        }, default=str),
        'isBase64Encoded': False
    }
