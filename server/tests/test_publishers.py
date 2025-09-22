import unittest
import json
from typing import Dict, List, Any, Optional
from flask import Flask, Response
from models import Publisher, db, init_db
from routes.publishers import publishers_bp

class TestPublishersRoutes(unittest.TestCase):
    # Test data as complete objects
    TEST_DATA: Dict[str, Any] = {
        "publishers": [
            {"name": "DevGames Inc"},
            {"name": "Scrum Masters"},
            {"name": "Agile Studios"}
        ]
    }
    
    # API paths
    PUBLISHERS_API_PATH: str = '/api/publishers'

    def setUp(self) -> None:
        """Set up test database and seed data"""
        # Create a test Flask app
        self.app: Flask = Flask(__name__)
        self.app.config['TESTING'] = True
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        
        # Register blueprints
        self.app.register_blueprint(publishers_bp)
        
        # Initialize database
        init_db(self.app)
        
        # Create application context and client
        self.app_context = self.app.app_context()
        self.app_context.push()
        self.client = self.app.test_client()
        
        # Seed test data
        self._seed_test_data()

    def tearDown(self) -> None:
        """Clean up test database"""
        db.session.remove()
        db.drop_all()
        db.engine.dispose()
        self.app_context.pop()

    def _seed_test_data(self) -> None:
        """Helper method to seed test data"""
        # Create test publishers
        publishers = [
            Publisher(**publisher_data) for publisher_data in self.TEST_DATA["publishers"]
        ]
        db.session.add_all(publishers)
        db.session.commit()

    def _get_response_data(self, response: Response) -> Any:
        """Helper method to extract JSON data from response"""
        return json.loads(response.get_data(as_text=True))

    def test_get_publishers_success(self) -> None:
        """Test successful retrieval of all publishers"""
        # Act
        response = self.client.get(self.PUBLISHERS_API_PATH)
        data = self._get_response_data(response)
        
        # Assert
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(data, list)
        self.assertEqual(len(data), len(self.TEST_DATA["publishers"]))
        
        # Check that each publisher has only id and name fields
        for publisher in data:
            self.assertIn('id', publisher)
            self.assertIn('name', publisher)
            self.assertEqual(len(publisher.keys()), 2)  # Only id and name
            
        # Check specific publisher names
        publisher_names = [p['name'] for p in data]
        expected_names = [p['name'] for p in self.TEST_DATA["publishers"]]
        self.assertEqual(sorted(publisher_names), sorted(expected_names))

    def test_get_publishers_empty_database(self) -> None:
        """Test publishers endpoint with empty database"""
        # Clear all publishers
        db.session.query(Publisher).delete()
        db.session.commit()
        
        # Act
        response = self.client.get(self.PUBLISHERS_API_PATH)
        data = self._get_response_data(response)
        
        # Assert
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(data, list)
        self.assertEqual(len(data), 0)

if __name__ == '__main__':
    unittest.main()