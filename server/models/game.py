"""
Game model for the Tailspin Toys Crowd Funding platform.
This module defines the Game SQLAlchemy model with validation and serialization methods.
"""

from . import db
from .base import BaseModel
from sqlalchemy.orm import validates, relationship

class Game(BaseModel):
    """
    Game model representing crowdfunding games in the platform.
    
    Attributes:
        id: Primary key identifier
        title: Game title (required, min 2 characters)
        description: Game description (required, min 10 characters)
        star_rating: Game rating (optional float value)
        category_id: Foreign key to Category table
        publisher_id: Foreign key to Publisher table
        category: Relationship to Category model
        publisher: Relationship to Publisher model
    """
    __tablename__ = 'games'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    star_rating = db.Column(db.Float, nullable=True)
    
    # Foreign keys for one-to-many relationships
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    publisher_id = db.Column(db.Integer, db.ForeignKey('publishers.id'), nullable=False)
    
    # One-to-many relationships (many games belong to one category/publisher)
    category = relationship("Category", back_populates="games")
    publisher = relationship("Publisher", back_populates="games")
    
    @validates('title')
    def validate_name(self, key, name):
        """
        Validates the game title ensuring it meets minimum length requirements.
        
        Args:
            key: The field name being validated
            name: The title value to validate
            
        Returns:
            str: The validated title
            
        Raises:
            ValueError: If title is empty or too short
        """
        return self.validate_string_length('Game title', name, min_length=2)
    
    @validates('description')
    def validate_description(self, key, description):
        """
        Validates the game description ensuring it meets minimum length requirements.
        
        Args:
            key: The field name being validated
            description: The description value to validate
            
        Returns:
            str: The validated description
            
        Raises:
            ValueError: If description is empty or too short
        """
        if description is not None:
            return self.validate_string_length('Description', description, min_length=10, allow_none=True)
        return description
    
    def __repr__(self):
        """
        Returns a string representation of the Game object.
        
        Returns:
            str: String representation including title and ID
        """
        return f'<Game {self.title}, ID: {self.id}>'

    def to_dict(self):
        """
        Converts the Game object to a dictionary for JSON serialization.
        
        Returns:
            dict: Dictionary representation of the game with related data
        """
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'publisher': {'id': self.publisher.id, 'name': self.publisher.name} if self.publisher else None,
            'category': {'id': self.category.id, 'name': self.category.name} if self.category else None,
            'starRating': self.star_rating  # Changed from star_rating to starRating
        }