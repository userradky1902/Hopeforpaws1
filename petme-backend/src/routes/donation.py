from flask import Blueprint, request, jsonify
from src.models.donation import db, Donation, AdoptionApplication, VolunteerApplication, PartnerApplication
import json
import uuid

donation_bp = Blueprint('donation', __name__)

@donation_bp.route('/donations', methods=['POST'])
def create_donation():
    try:
        data = request.get_json()
        
        # Create new donation record
        donation = Donation(
            donor_name=data.get('donor_name', 'Anonymous'),
            donor_email=data.get('donor_email', ''),
            donor_phone=data.get('donor_phone', ''),
            amount=float(data.get('amount', 0)),
            selected_items=json.dumps(data.get('selected_items', [])),
            custom_amount=float(data.get('custom_amount', 0)) if data.get('custom_amount') else None,
            payment_method=data.get('payment_method', 'online'),
            transaction_id=str(uuid.uuid4()),
            status='completed'
        )
        
        db.session.add(donation)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Donation recorded successfully!',
            'donation_id': donation.id,
            'transaction_id': donation.transaction_id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'Error processing donation: {str(e)}'
        }), 500

@donation_bp.route('/donations', methods=['GET'])
def get_donations():
    try:
        donations = Donation.query.order_by(Donation.created_at.desc()).all()
        return jsonify({
            'success': True,
            'donations': [donation.to_dict() for donation in donations]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error fetching donations: {str(e)}'
        }), 500

@donation_bp.route('/adoption-applications', methods=['POST'])
def create_adoption_application():
    try:
        data = request.get_json()
        
        application = AdoptionApplication(
            pet_name=data.get('pet_name'),
            applicant_name=data.get('applicant_name'),
            applicant_email=data.get('applicant_email'),
            applicant_phone=data.get('applicant_phone'),
            applicant_address=data.get('applicant_address'),
            city=data.get('city'),
            state=data.get('state'),
            living_situation=data.get('living_situation')
        )
        
        db.session.add(application)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Adoption application submitted successfully!',
            'application_id': application.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'Error submitting application: {str(e)}'
        }), 500

@donation_bp.route('/volunteer-applications', methods=['POST'])
def create_volunteer_application():
    try:
        data = request.get_json()
        
        application = VolunteerApplication(
            volunteer_name=data.get('volunteer_name'),
            volunteer_email=data.get('volunteer_email'),
            volunteer_phone=data.get('volunteer_phone'),
            city=data.get('city'),
            state=data.get('state'),
            preferred_activity=data.get('preferred_activity'),
            time_commitment=data.get('time_commitment'),
            experience=data.get('experience')
        )
        
        db.session.add(application)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Volunteer application submitted successfully!',
            'application_id': application.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'Error submitting application: {str(e)}'
        }), 500

@donation_bp.route('/partner-applications', methods=['POST'])
def create_partner_application():
    try:
        data = request.get_json()
        
        application = PartnerApplication(
            organization_name=data.get('organization_name'),
            contact_person=data.get('contact_person'),
            contact_email=data.get('contact_email'),
            contact_phone=data.get('contact_phone'),
            organization_type=data.get('organization_type'),
            partnership_purpose=data.get('partnership_purpose'),
            city=data.get('city'),
            state=data.get('state')
        )
        
        db.session.add(application)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Partnership application submitted successfully!',
            'application_id': application.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'Error submitting application: {str(e)}'
        }), 500

@donation_bp.route('/stats', methods=['GET'])
def get_stats():
    try:
        total_donations = db.session.query(db.func.sum(Donation.amount)).scalar() or 0
        donation_count = Donation.query.count()
        adoption_applications = AdoptionApplication.query.count()
        volunteer_applications = VolunteerApplication.query.count()
        partner_applications = PartnerApplication.query.count()
        
        return jsonify({
            'success': True,
            'stats': {
                'total_donations': total_donations,
                'donation_count': donation_count,
                'adoption_applications': adoption_applications,
                'volunteer_applications': volunteer_applications,
                'partner_applications': partner_applications
            }
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error fetching stats: {str(e)}'
        }), 500

