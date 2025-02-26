import React, { useState, useEffect } from 'react';
import './ServiceRequestForm.css';

const ServiceRequestForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        department: 'Select Department',
        email: '',
        contact: '',
        deviceType: 'Laptop',
        problemDescription: '',
        signature: null
    });

    const [validEmails, setValidEmails] = useState([]); // Store valid emails
    const [emailError, setEmailError] = useState(""); // Store email validation error

    const departments = [
        "Select Department",
        "MSc - Computer Science",
        "MSc - Chemistry",
        "MSc - Mathematics",
        "MBA - Finance",
        "MBA - TTM",
        "M.com",
        "MA - Economics",
        "MA - English",
    ];

    // Fetch valid user emails from backend
    useEffect(() => {
        const fetchValidEmails = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/emails');
                const data = await response.json();
                console.log(data.email);
                setValidEmails(data.emails); // Store fetched emails in state
            } catch (error) {
                console.error('Error fetching emails:', error);
            }
        };

        fetchValidEmails();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Name: Only alphabets and spaces
        if (name === 'name' && !/^[A-Za-z\s]*$/.test(value)) return;

        // Contact: Only digits and max 10 characters
        if (name === 'contact' && !/^\d{0,10}$/.test(value)) return;

        // Clear email error when typing
        if (name === "email") setEmailError("");

        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setFormData({ ...formData, signature: file });
        } else {
            alert('Please upload a valid image file.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentDate = new Date();
        const reportingDate = currentDate.toISOString().split('T')[0];
        const reportingTime = currentDate.toTimeString().split(' ')[0];

        // Validate email
        if (!validEmails.includes(formData.email)) {
            setEmailError("This email is not registered.");
            return;
        }

        if (!formData.name || formData.department === "Select Department" || !formData.email || !formData.contact || !formData.problemDescription) {
            alert('Please fill out all required fields.');
            return;
        }

        if (formData.contact.length !== 10) {
            alert('Contact number must be exactly 10 digits.');
            return;
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('department', formData.department);
        data.append('email', formData.email);
        data.append('contact', formData.contact);
        data.append('deviceType', formData.deviceType);
        data.append('problemDescription', formData.problemDescription);
        data.append('reportingDate', reportingDate);
        data.append('reportingTime', reportingTime);
        if (formData.signature) {
            data.append('signature', formData.signature);
        }

        try {
            const response = await fetch('http://localhost:5000/api/submitRequest', { 
                method: 'POST',
                body: data
            });

            if (response.ok) {
                alert('Form submitted successfully!');
                setFormData({
                    name: '',
                    department: 'Select Department',
                    email: '',
                    contact: '',
                    deviceType: 'Laptop',
                    problemDescription: '',
                    signature: null
                });
            } else {
                alert('Error submitting the form.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Submission failed.');
        }
    };

    return (
        <div className="form-container">
            <h2>MANGALORE UNIVERSITY<br />COMPUTER CENTRE</h2>
            <h3>Service Request Form</h3>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td><input type="text" name="name" value={formData.name} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td>Department / Office / Section</td>
                            <td>
                                <select name="department" value={formData.department} onChange={handleChange} required>
                                    {departments.map((dept, index) => (
                                        <option key={index} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                    style={{ borderColor: emailError ? "red" : "" }} 
                                />
                                {emailError && <p style={{ color: "red", fontSize: "12px" }}>{emailError}</p>}
                            </td>
                        </tr>
                        <tr>
                            <td>Contact No</td>
                            <td><input type="text" name="contact" value={formData.contact} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td>Device Type</td>
                            <td>
                                <select name="deviceType" value={formData.deviceType} onChange={handleChange} required>
                                    <option value="Laptop">Laptop</option>
                                    <option value="Desktop">Desktop</option>
                                    <option value="Printer">Printer</option>
                                    <option value="Other">Other (Please Specify)</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Problem Description</td>
                            <td><textarea name="problemDescription" value={formData.problemDescription} onChange={handleChange} rows="4" required></textarea></td>
                        </tr>
                        <tr>
                            <td>Signature</td>
                            <td><input type="file" accept="image/*" onChange={handleFileChange} /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ServiceRequestForm;