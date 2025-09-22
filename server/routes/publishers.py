"""
Publisher API routes for the Tailspin Toys Crowd Funding platform.
This module provides endpoints to retrieve publisher information.
"""

from flask import jsonify, Response, Blueprint
from models import db, Publisher
from sqlalchemy.orm import Query

# Create a Blueprint for publishers routes
publishers_bp = Blueprint('publishers', __name__)

def get_publishers_base_query() -> Query:
    """
    Create base query for publishers with proper joins.
    
    Returns:
        Query: SQLAlchemy query object for publishers
    """
    return db.session.query(Publisher)

@publishers_bp.route('/api/publishers', methods=['GET'])
def get_publishers() -> Response:
    """
    Get all publishers with name and id only.
    
    Returns:
        Response: JSON response containing list of publishers with id and name
    """
    # Use the base query for all publishers
    publishers_query = get_publishers_base_query().all()
    
    # Convert to minimal format with only id and name as requested
    publishers_list = [{'id': publisher.id, 'name': publisher.name} for publisher in publishers_query]
    
    return jsonify(publishers_list)
