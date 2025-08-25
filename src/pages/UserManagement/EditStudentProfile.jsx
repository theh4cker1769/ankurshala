//// filepath: c:\My Laptop\Projects\Ankurshala\app\src\pages\UserManagement\EditStudentProfile.jsx
import { useState } from 'react'
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdCalendarToday,
  MdSchool,
  MdFamilyRestroom,
  MdHome,
  MdMedicalServices,
  MdUploadFile,
  MdDelete,
  MdSave,
  MdClose,
  MdOutlineMedicalServices
} from 'react-icons/md'

const MAX_DOCS = 5

const EditStudentProfile = () => {
  // Basic Info
  const [basic, setBasic] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    status: 'active'
  })

  // Education
  const [education, setEducation] = useState({
    grade: '',
    school: '',
    board: '',
    stream: ''
  })

  // Family
  const [family, setFamily] = useState({
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    guardianName: ''
  })

  // Address
  const [address, setAddress] = useState({
    line: '',
    city: '',
    state: '',
    zip: ''
  })

  // Special Info
  const [special, setSpecial] = useState({
    medical: '',
    needs: ''
  })

  // Documents
  const [docForm, setDocForm] = useState({
    name: '',
    type: '',
    file: null
  })
  const [documents, setDocuments] = useState([])
  const [profilePic, setProfilePic] = useState(null)
  const [profilePreview, setProfilePreview] = useState(null)

  const handleBasicChange = e =>
    setBasic({ ...basic, [e.target.name]: e.target.value })
  const handleEducationChange = e =>
    setEducation({ ...education, [e.target.name]: e.target.value })
  const handleFamilyChange = e =>
    setFamily({ ...family, [e.target.name]: e.target.value })
  const handleAddressChange = e =>
    setAddress({ ...address, [e.target.name]: e.target.value })
  const handleSpecialChange = e =>
    setSpecial({ ...special, [e.target.name]: e.target.value })

  const handleDocField = e =>
    setDocForm({ ...docForm, [e.target.name]: e.target.value })

  const handleDocFile = e =>
    setDocForm({ ...docForm, file: e.target.files?.[0] || null })

  const addDocument = () => {
    if (!docForm.name || !docForm.type || !docForm.file) return
    if (documents.length >= MAX_DOCS) return
    setDocuments([
      ...documents,
      {
        id: Date.now(),
        name: docForm.name,
        type: docForm.type,
        fileName: docForm.file.name
      }
    ])
    setDocForm({ name: '', type: '', file: null })
  }

  const removeDocument = id =>
    setDocuments(docs => docs.filter(d => d.id !== id))

  const handleProfilePic = e => {
    const file = e.target.files?.[0]
    if (!file) return
    setProfilePic(file)
    const reader = new FileReader()
    reader.onload = ev => setProfilePreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleCancel = () => {
    // implement navigation or reset
    window.history.back()
  }

  const handleSave = e => {
    e.preventDefault()
    console.log('Saving profile', {
      basic,
      education,
      family,
      address,
      special,
      documents,
      profilePic
    })
  }

  return (
    <section className="edit-student-page">
      <div className="esp-hero">
        <div className="esp-badge">
          <MdPerson /> Edit Student Profile
        </div>
        <h1 className="esp-title">Edit Student Profile</h1>
        <p className="esp-note">
          <strong>Note:</strong> During student signup, only basic info (name, email),
          education (grade, school) and family (parent name, emergency contact) are
          collected. All other details including address, special needs, and documents
          are managed here in the profile edit page.
        </p>
      </div>

      <form className="esp-form" onSubmit={handleSave}>
        {/* BASIC */}
        <div className="form-section dash-section">
          <div className="fs-head">
            <h2>Basic Information</h2>
          </div>
          <div className="fs-grid">
            <div className="f-control required">
              <label>Name</label>
              <div className="f-input icon">
                <MdPerson />
                <input
                  name="name"
                  value={basic.name}
                  onChange={handleBasicChange}
                  required
                  placeholder="Full name"
                />
              </div>
            </div>
            <div className="f-control required">
              <label>Email</label>
              <div className="f-input icon">
                <MdEmail />
                <input
                  type="email"
                  name="email"
                  value={basic.email}
                  onChange={handleBasicChange}
                  required
                  placeholder="name@example.com"
                />
              </div>
            </div>
            <div className="f-control">
              <label>Phone Number</label>
              <div className="f-input icon">
                <MdPhone />
                <input
                  name="phone"
                  value={basic.phone}
                  onChange={handleBasicChange}
                  placeholder="+91 ..."
                />
              </div>
            </div>
            <div className="f-control">
              <label>Date of Birth</label>
              <div className="f-input icon">
                <MdCalendarToday />
                <input
                  type="date"
                  name="dob"
                  value={basic.dob}
                  onChange={handleBasicChange}
                />
              </div>
            </div>
            <div className="f-control">
              <label>Gender</label>
              <select
                name="gender"
                value={basic.gender}
                onChange={handleBasicChange}
              >
                <option value="">Select</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </div>
            <div className="f-control">
              <label>Status</label>
              <select
                name="status"
                value={basic.status}
                onChange={handleBasicChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* EDUCATION */}
        <div className="form-section dash-section">
          <div className="fs-head">
            <h2>Education Information</h2>
          </div>
            <div className="fs-grid">
              <div className="f-control">
                <label>Grade Level</label>
                <input
                  name="grade"
                  value={education.grade}
                  onChange={handleEducationChange}
                  placeholder="e.g. 8"
                />
              </div>
              <div className="f-control">
                <label>School Name</label>
                <div className="f-input icon">
                  <MdSchool />
                  <input
                    name="school"
                    value={education.school}
                    onChange={handleEducationChange}
                    placeholder="School"
                  />
                </div>
              </div>
              <div className="f-control">
                <label>Board</label>
                <input
                  name="board"
                  value={education.board}
                  onChange={handleEducationChange}
                  placeholder="CBSE / ICSE / State"
                />
              </div>
              <div className="f-control">
                <label>Stream</label>
                <input
                  name="stream"
                  value={education.stream}
                  onChange={handleEducationChange}
                  placeholder="Science / Arts / ..."
                />
              </div>
            </div>
        </div>

        {/* FAMILY */}
        <div className="form-section dash-section">
          <div className="fs-head">
            <h2>Family Information</h2>
          </div>
          <div className="fs-grid">
            <div className="f-control">
              <label>Parent Name</label>
              <div className="f-input icon">
                <MdFamilyRestroom />
                <input
                  name="parentName"
                  value={family.parentName}
                  onChange={handleFamilyChange}
                  placeholder="Parent full name"
                />
              </div>
            </div>
            <div className="f-control">
              <label>Parent Phone</label>
              <input
                name="parentPhone"
                value={family.parentPhone}
                onChange={handleFamilyChange}
                placeholder="+91 ..."
              />
            </div>
            <div className="f-control">
              <label>Parent Email</label>
              <input
                type="email"
                name="parentEmail"
                value={family.parentEmail}
                onChange={handleFamilyChange}
                placeholder="parent@example.com"
              />
            </div>
            <div className="f-control">
              <label>Guardian Name</label>
              <input
                name="guardianName"
                value={family.guardianName}
                onChange={handleFamilyChange}
                placeholder="If different"
              />
            </div>
          </div>
        </div>

        {/* ADDRESS */}
        <div className="form-section dash-section">
          <div className="fs-head">
            <h2>Address Information</h2>
          </div>
          <div className="fs-grid">
            <div className="f-control wide">
              <label>Address</label>
              <div className="f-input textarea">
                <textarea
                  name="line"
                  rows={3}
                  value={address.line}
                  onChange={handleAddressChange}
                  placeholder="Street, area, landmark"
                />
              </div>
            </div>
            <div className="f-control">
              <label>City</label>
              <input
                name="city"
                value={address.city}
                onChange={handleAddressChange}
              />
            </div>
            <div className="f-control">
              <label>State</label>
              <input
                name="state"
                value={address.state}
                onChange={handleAddressChange}
              />
            </div>
            <div className="f-control">
              <label>Zip Code</label>
              <input
                name="zip"
                value={address.zip}
                onChange={handleAddressChange}
              />
            </div>
          </div>
        </div>

        {/* SPECIAL */}
        <div className="form-section dash-section">
          <div className="fs-head">
            <h2>Special Information</h2>
          </div>
          <div className="fs-grid">
            <div className="f-control wide">
              <label>Medical Conditions</label>
              <div className="f-input textarea icon">
                <MdMedicalServices />
                <textarea
                  name="medical"
                  rows={3}
                  value={special.medical}
                  onChange={handleSpecialChange}
                  placeholder="List any conditions..."
                />
              </div>
            </div>
            <div className="f-control wide">
              <label>Special Needs</label>
              <div className="f-input textarea icon">
                <MdMedicalServices />
                <textarea
                  name="needs"
                  rows={3}
                  value={special.needs}
                  onChange={handleSpecialChange}
                  placeholder="Learning accommodations, etc."
                />
              </div>
            </div>
          </div>
        </div>

        {/* DOCUMENTS */}
        <div className="form-section dash-section">
          <div className="fs-head docs-head">
            <h2>Documents & Profile Picture</h2>
            <span className="doc-count">
              {documents.length}/{MAX_DOCS} Documents
            </span>
          </div>
          <div className="docs-layout">
            <div className="doc-add-block">
              <div className="doc-fields">
                <div className="f-control">
                  <label>Document Name</label>
                  <input
                    name="name"
                    value={docForm.name}
                    onChange={handleDocField}
                    placeholder="Report Card"
                  />
                </div>
                <div className="f-control">
                  <label>Document Type</label>
                  <select
                    name="type"
                    value={docForm.type}
                    onChange={handleDocField}
                  >
                    <option value="">Select</option>
                    <option value="id">ID</option>
                    <option value="report">Report</option>
                    <option value="consent">Consent</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="f-control file-up">
                  <label>Upload</label>
                  <div className="file-input-wrap">
                    <input
                      type="file"
                      onChange={handleDocFile}
                      disabled={documents.length >= MAX_DOCS}
                    />
                  </div>
                </div>
                <div className="f-control add-btn-cell">
                  <label>&nbsp;</label>
                  <button
                    type="button"
                    className="mini-btn primary small"
                    onClick={addDocument}
                    disabled={
                      !docForm.name ||
                      !docForm.type ||
                      !docForm.file ||
                      documents.length >= MAX_DOCS
                    }
                  >
                    <MdUploadFile /> Add
                  </button>
                </div>
              </div>
              {documents.length > 0 && (
                <ul className="doc-list">
                  {documents.map(d => (
                    <li key={d.id} className="doc-item">
                      <span className="doc-name">
                        {d.name} <em>({d.type})</em>
                      </span>
                      <span className="doc-file">{d.fileName}</span>
                      <button
                        type="button"
                        className="icon-btn danger"
                        onClick={() => removeDocument(d.id)}
                      >
                        <MdDelete />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="profile-pic-block">
              <div className="profile-preview">
                {profilePreview ? (
                  <img src={profilePreview} alt="Profile" />
                ) : (
                  <div className="placeholder">
                    <MdPerson />
                    <span>No Photo</span>
                  </div>
                )}
              </div>
              <label className="upload-avatar-btn">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePic}
                  hidden
                />
                Upload Profile Picture
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn secondary"
            onClick={handleCancel}
          >
            <MdClose /> Cancel
          </button>
          <button type="submit" className="btn primary">
            <MdSave /> Save Changes
          </button>
        </div>
      </form>
    </section>
  )
}

export default EditStudentProfile