/**
 * TDS Exam Question: FastAPI Request Validation with Custom Validators
 * 
 * Topic: Backend API Development with Validation
 * Difficulty: Medium-Hard
 * Student: 24f2007461
 * Date: December 17, 2025
 */

export const info = {
  name: "q-fastapi-student-validation",
  points: 12,
  desc: `
## Question 2: FastAPI Request Validation with Custom Validators

**Topic:** Backend API Development with Validation
**Difficulty:** Medium-Hard

**Description:**
Create a FastAPI application for a student management system with the following endpoint: 

\`POST /students/register\`

The endpoint should accept and validate:
- \`student_id\`: Must be exactly 10 alphanumeric characters
- \`email\`: Must be a valid institutional email ending with \`.edu\` or \`.ac.in\`
- \`phone\`: Must be valid Indian mobile number (10 digits or +91 followed by 10 digits)
- \`age\`: Must be between 16 and 35
- \`courses\`: List of course codes, each must be 6 characters (e.g., CS1001)
- \`gpa\`: Must be between 0.0 and 10.0 with max 2 decimal places

**Expected Skills Tested:**
- Pydantic model creation
- Custom validators using regex
- Type hints and constraints
- Error handling in FastAPI
- Request/Response validation
- HTTP status codes

**Learning Outcomes:**
- Implement robust API validation
- Create custom validation logic
- Handle validation errors gracefully
- Design secure API endpoints
  `,
  tags: ["fastapi", "pydantic", "validation", "api", "python", "backend"]
};

export default function question(ctx) {
  const solution = `
# Complete FastAPI Student Registration System with Custom Validators

from fastapi import FastAPI, HTTPException, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel, validator, Field, EmailStr
from typing import List, Optional
import re
from datetime import datetime

app = FastAPI(
    title="Student Management System",
    description="API for student registration with comprehensive validation",
    version="1.0.0"
)

class StudentRegistration(BaseModel):
    student_id: str = Field(..., description="10 alphanumeric characters")
    email: str = Field(..., description="Institutional email ending with .edu or .ac.in")
    phone: str = Field(..., description="Indian mobile number")
    age: int = Field(..., ge=16, le=35, description="Age between 16 and 35")
    courses: List[str] = Field(..., min_items=1, max_items=8, description="List of course codes")
    gpa: float = Field(..., ge=0.0, le=10.0, description="GPA between 0.0 and 10.0")
    
    @validator('student_id')
    def validate_student_id(cls, v):
        """Validate student ID is exactly 10 alphanumeric characters"""
        if not v:
            raise ValueError('Student ID is required')
        
        if len(v) != 10:
            raise ValueError('Student ID must be exactly 10 characters')
        
        if not re.match(r'^[A-Za-z0-9]{10}$', v):
            raise ValueError('Student ID must contain only alphanumeric characters')
        
        return v.upper()  # Normalize to uppercase
    
    @validator('email')
    def validate_email(cls, v):
        """Validate institutional email ending with .edu or .ac.in"""
        if not v:
            raise ValueError('Email is required')
        
        # Basic email format check
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, v):
            raise ValueError('Invalid email format')
        
        # Check institutional domain
        institutional_domains = ['.edu', '.ac.in']
        if not any(v.lower().endswith(domain) for domain in institutional_domains):
            raise ValueError('Email must end with .edu or .ac.in')
        
        return v.lower()
    
    @validator('phone')
    def validate_phone(cls, v):
        """Validate Indian mobile number"""
        if not v:
            raise ValueError('Phone number is required')
        
        # Remove all spaces and hyphens
        clean_phone = re.sub(r'[\\s-]', '', v)
        
        # Pattern for Indian mobile numbers
        patterns = [
            r'^[6-9]\\d{9}$',  # 10 digit number starting with 6-9
            r'^\\+91[6-9]\\d{9}$',  # +91 followed by 10 digits
            r'^91[6-9]\\d{9}$',  # 91 followed by 10 digits
            r'^0[6-9]\\d{9}$'   # 0 followed by 10 digits
        ]
        
        if not any(re.match(pattern, clean_phone) for pattern in patterns):
            raise ValueError(
                'Invalid phone number. Must be a valid Indian mobile number '
                '(10 digits starting with 6-9, or +91 followed by 10 digits)'
            )
        
        # Normalize to +91 format
        if clean_phone.startswith('+91'):
            return clean_phone
        elif clean_phone.startswith('91') and len(clean_phone) == 12:
            return '+' + clean_phone
        elif clean_phone.startswith('0') and len(clean_phone) == 11:
            return '+91' + clean_phone[1:]
        else:  # 10 digit number
            return '+91' + clean_phone
    
    @validator('courses')
    def validate_courses(cls, v):
        """Validate course codes are 6 characters each"""
        if not v:
            raise ValueError('At least one course is required')
        
        validated_courses = []
        for course in v:
            if not course:
                raise ValueError('Course code cannot be empty')
            
            if len(course) != 6:
                raise ValueError(f'Course code "{course}" must be exactly 6 characters')
            
            # Check for valid course code pattern (2 letters + 4 digits)
            if not re.match(r'^[A-Za-z]{2}\\d{4}$', course):
                raise ValueError(
                    f'Course code "{course}" must follow pattern: 2 letters + 4 digits (e.g., CS1001)'
                )
            
            validated_courses.append(course.upper())
        
        # Check for duplicates
        if len(validated_courses) != len(set(validated_courses)):
            raise ValueError('Duplicate course codes are not allowed')
        
        return validated_courses
    
    @validator('gpa')
    def validate_gpa(cls, v):
        """Validate GPA has max 2 decimal places"""
        if v is None:
            raise ValueError('GPA is required')
        
        # Check decimal places
        decimal_places = len(str(v).split('.')[-1]) if '.' in str(v) else 0
        if decimal_places > 2:
            raise ValueError('GPA cannot have more than 2 decimal places')
        
        return round(v, 2)

class StudentResponse(BaseModel):
    student_id: str
    email: str
    phone: str
    age: int
    courses: List[str]
    gpa: float
    registration_date: datetime
    status: str

# In-memory storage for demonstration (use database in production)
students_db = {}

@app.post(
    "/students/register",
    response_model=StudentResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new student",
    description="Register a new student with comprehensive validation"
)
async def register_student(student: StudentRegistration):
    """Register a new student with validation"""
    
    try:
        # Check if student already exists
        if student.student_id in students_db:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Student with ID {student.student_id} already exists"
            )
        
        # Check if email already exists
        existing_emails = [s['email'] for s in students_db.values()]
        if student.email in existing_emails:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Student with email {student.email} already exists"
            )
        
        # Create student record
        student_record = {
            "student_id": student.student_id,
            "email": student.email,
            "phone": student.phone,
            "age": student.age,
            "courses": student.courses,
            "gpa": student.gpa,
            "registration_date": datetime.now(),
            "status": "active"
        }
        
        # Save to database
        students_db[student.student_id] = student_record
        
        return StudentResponse(**student_record)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}"
        )

@app.get("/students/{student_id}", response_model=StudentResponse)
async def get_student(student_id: str):
    """Get student by ID"""
    if student_id not in students_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student with ID {student_id} not found"
        )
    
    return StudentResponse(**students_db[student_id])

@app.get("/students", response_model=List[StudentResponse])
async def list_students():
    """List all registered students"""
    return [StudentResponse(**student) for student in students_db.values()]

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Student Management System API",
        "version": "1.0.0",
        "endpoints": {
            "register": "POST /students/register",
            "get_student": "GET /students/{student_id}",
            "list_students": "GET /students"
        }
    }

# Error handlers
@app.exception_handler(422)
async def validation_exception_handler(request, exc):
    """Custom validation error handler"""
    return JSONResponse(
        status_code=422,
        content={
            "detail": "Validation Error",
            "errors": exc.detail if hasattr(exc, 'detail') else str(exc)
        }
    )

if __name__ == "__main__":
    import uvicorn
    
    print("Starting Student Management System API...")
    print("API Documentation available at: http://localhost:8000/docs")
    print("Alternative docs at: http://localhost:8000/redoc")
    
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
  `;

  const testScript = `
# Test script for FastAPI Student Registration API

import requests
import json

BASE_URL = "http://localhost:8000"

def test_valid_registration():
    """Test valid student registration"""
    valid_data = {
        "student_id": "ABCD123456",
        "email": "john.doe@iitm.ac.in",
        "phone": "+919876543210",
        "age": 22,
        "courses": ["CS1001", "MA1001", "PH1001"],
        "gpa": 8.75
    }
    
    response = requests.post(f"{BASE_URL}/students/register", json=valid_data)
    print(f"Valid registration: {response.status_code}")
    print(json.dumps(response.json(), indent=2))

def test_invalid_registrations():
    """Test various invalid registrations"""
    
    # Invalid student ID
    invalid_data = {
        "student_id": "ABC123",  # Too short
        "email": "test@iitm.ac.in",
        "phone": "9876543210",
        "age": 20,
        "courses": ["CS1001"],
        "gpa": 8.5
    }
    
    response = requests.post(f"{BASE_URL}/students/register", json=invalid_data)
    print(f"\\nInvalid student ID: {response.status_code}")
    print(response.json())
    
    # Invalid email domain
    invalid_data["student_id"] = "VALID12345"
    invalid_data["email"] = "test@gmail.com"
    
    response = requests.post(f"{BASE_URL}/students/register", json=invalid_data)
    print(f"\\nInvalid email domain: {response.status_code}")
    print(response.json())

if __name__ == "__main__":
    test_valid_registration()
    test_invalid_registrations()
  `;

  return {
    type: "python",
    framework: "fastapi",
    solution: solution,
    testScript: testScript,
    dependencies: [
      "fastapi",
      "uvicorn",
      "pydantic[email]",
      "python-multipart"
    ],
    instructions: "Run 'pip install fastapi uvicorn pydantic[email]' then 'python app.py'"
  };
}
