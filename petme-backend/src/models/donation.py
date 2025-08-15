from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Donation(db.Model):
    __tablename__ = 'donations'
    
    id = db.Column(db.Integer, primary_key=True)
    donor_name = db.Column(db.String(100), nullable=False)
    donor_email = db.Column(db.String(120), nullable=False)
    donor_phone = db.Column(db.String(20), nullable=True)
    amount = db.Column(db.Float, nullable=False)
    selected_items = db.Column(db.Text, nullable=True)  # JSON string of selected items
    custom_amount = db.Column(db.Float, nullable=True)
    payment_method = db.Column(db.String(50), nullable=True)
    transaction_id = db.Column(db.String(100), nullable=True)
    status = db.Column(db.String(20), default='pending')  # pending, completed, failed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'donor_name': self.donor_name,
            'donor_email': self.donor_email,
            'donor_phone': self.donor_phone,
            'amount': self.amount,
            'selected_items': self.selected_items,
            'custom_amount': self.custom_amount,
            'payment_method': self.payment_method,
            'transaction_id': self.transaction_id,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class AdoptionApplication(db.Model):
    __tablename__ = 'adoption_applications'
    
    id = db.Column(db.Integer, primary_key=True)
    pet_name = db.Column(db.String(100), nullable=False)
    applicant_name = db.Column(db.String(100), nullable=False)
    applicant_email = db.Column(db.String(120), nullable=False)
    applicant_phone = db.Column(db.String(20), nullable=False)
    applicant_address = db.Column(db.Text, nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    living_situation = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, approved, rejected
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'pet_name': self.pet_name,
            'applicant_name': self.applicant_name,
            'applicant_email': self.applicant_email,
            'applicant_phone': self.applicant_phone,
            'applicant_address': self.applicant_address,
            'city': self.city,
            'state': self.state,
            'living_situation': self.living_situation,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class VolunteerApplication(db.Model):
    __tablename__ = 'volunteer_applications'
    
    id = db.Column(db.Integer, primary_key=True)
    volunteer_name = db.Column(db.String(100), nullable=False)
    volunteer_email = db.Column(db.String(120), nullable=False)
    volunteer_phone = db.Column(db.String(20), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    preferred_activity = db.Column(db.String(100), nullable=False)
    time_commitment = db.Column(db.String(100), nullable=False)
    experience = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, approved, rejected
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'volunteer_name': self.volunteer_name,
            'volunteer_email': self.volunteer_email,
            'volunteer_phone': self.volunteer_phone,
            'city': self.city,
            'state': self.state,
            'preferred_activity': self.preferred_activity,
            'time_commitment': self.time_commitment,
            'experience': self.experience,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class PartnerApplication(db.Model):
    __tablename__ = 'partner_applications'
    
    id = db.Column(db.Integer, primary_key=True)
    organization_name = db.Column(db.String(200), nullable=False)
    contact_person = db.Column(db.String(100), nullable=False)
    contact_email = db.Column(db.String(120), nullable=False)
    contact_phone = db.Column(db.String(20), nullable=False)
    organization_type = db.Column(db.String(100), nullable=False)
    partnership_purpose = db.Column(db.Text, nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, approved, rejected
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'organization_name': self.organization_name,
            'contact_person': self.contact_person,
            'contact_email': self.contact_email,
            'contact_phone': self.contact_phone,
            'organization_type': self.organization_type,
            'partnership_purpose': self.partnership_purpose,
            'city': self.city,
            'state': self.state,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

