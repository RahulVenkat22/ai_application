from sqlalchemy import Column, Integer, String
from core.database import Base
from sqlalchemy.orm import validates

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

    @validates("email")
    def convert_lower(self, key, value):
        return value.lower()