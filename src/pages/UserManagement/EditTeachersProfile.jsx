//// filepath: c:\My Laptop\Projects\Ankurshala\app\src\pages\UserManagement\EditTeachersProfile.jsx
import { useState } from 'react'
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdCalendarToday,
  MdClose,
  MdSave,
  MdUploadFile,
  MdDelete,
  MdAdd,
  MdWork,
  MdStarRate,
  MdCurrencyRupee,
  MdSchool,
  MdBadge,
  MdTimer,
  MdLink,
  MdDescription,
  MdDocumentScanner,
  MdAccountBalance
} from 'react-icons/md'

const MAX_DOCS = 8

const EditTeachersProfile = () => {
  // 1 Basic
  const [basic, setBasic] = useState({
    name: '',
    email: '',
    phone: '',
    altPhone: '',
    dob: '',
    gender: '',
    status: 'active'
  })

  // 2 Professional
  const [professional, setProfessional] = useState({
    specialization: '',
    years: '',
    rate: ''
  })

  // 3 Education & Experience
  const [qualDraft, setQualDraft] = useState({ degree: '', specialization: '', university: '', year: '' })
  const [quals, setQuals] = useState([])

  const [expDraft, setExpDraft] = useState({ institution: '', role: '', subjects: '', from: '', to: '', current: false })
  const [experiences, setExperiences] = useState([])

  const [certDraft, setCertDraft] = useState({ name: '', authority: '', certId: '', year: '', expiry: '' })
  const [certs, setCerts] = useState([])

  // 4 Availability & Preference
  const [availability, setAvailability] = useState({ from: '', to: '' })
  const levelOptions = ['Primary','Middle','Secondary','Senior Secondary']
  const [preferredLevels, setPreferredLevels] = useState([])
  const [linkedin, setLinkedin] = useState('')

  // 5 Bio
  const [bio, setBio] = useState({ summary: '', additional: '' })

  // 6 Profile & Documents
  const [profilePic, setProfilePic] = useState(null)
  const [profilePreview, setProfilePreview] = useState(null)
  const [pan, setPan] = useState('')
  const [docForm, setDocForm] = useState({ name: '', type: '', file: null })
  const [documents, setDocuments] = useState([])

  // 7 Bank
  const [bank, setBank] = useState({
    accountName: '',
    accountNumber: '',
    ifsc: '',
    bankName: '',
    branch: '',
    upi: ''
  })

  const [agree, setAgree] = useState(false)

  // Handlers
  const onBasic = e => setBasic({ ...basic, [e.target.name]: e.target.value })
  const onProfessional = e => setProfessional({ ...professional, [e.target.name]: e.target.value })
  const onQualDraft = e => setQualDraft({ ...qualDraft, [e.target.name]: e.target.value })
  const onExpDraft = e => {
    const { name, value, type, checked } = e.target
    setExpDraft({ ...expDraft, [name]: type === 'checkbox' ? checked : value })
  }
  const onCertDraft = e => setCertDraft({ ...certDraft, [e.target.name]: e.target.value })
  const onAvailability = e => setAvailability({ ...availability, [e.target.name]: e.target.value })
  const onBank = e => setBank({ ...bank, [e.target.name]: e.target.value })
  const onBio = e => setBio({ ...bio, [e.target.name]: e.target.value })
  const onDocField = e => setDocForm({ ...docForm, [e.target.name]: e.target.value })
  const onDocFile = e => setDocForm({ ...docForm, file: e.target.files?.[0] || null })

  const togglePreferredLevel = lvl =>
    setPreferredLevels(prev =>
      prev.includes(lvl) ? prev.filter(x => x !== lvl) : [...prev, lvl]
    )

  const addQualification = () => {
    if (!qualDraft.degree || !qualDraft.university) return
    setQuals([...quals, { id: Date.now(), ...qualDraft }])
    setQualDraft({ degree: '', specialization: '', university: '', year: '' })
  }
  const removeQualification = id => setQuals(q => q.filter(i => i.id !== id))

  const addExperience = () => {
    if (!expDraft.institution || !expDraft.role) return
    setExperiences([...experiences, { id: Date.now(), ...expDraft }])
    setExpDraft({ institution: '', role: '', subjects: '', from: '', to: '', current: false })
  }
  const removeExperience = id => setExperiences(x => x.filter(i => i.id !== id))

  const addCert = () => {
    if (!certDraft.name || !certDraft.authority) return
    setCerts([...certs, { id: Date.now(), ...certDraft }])
    setCertDraft({ name: '', authority: '', certId: '', year: '', expiry: '' })
  }
  const removeCert = id => setCerts(c => c.filter(i => i.id !== id))

  const addDocument = () => {
    if (!docForm.name || !docForm.type || !docForm.file) return
    if (documents.length >= MAX_DOCS) return
    setDocuments([...documents, { id: Date.now(), name: docForm.name, type: docForm.type, fileName: docForm.file.name }])
    setDocForm({ name: '', type: '', file: null })
  }
  const removeDocument = id => setDocuments(d => d.filter(x => x.id !== id))

  const handleProfilePic = e => {
    const file = e.target.files?.[0]
    if (!file) return
    setProfilePic(file)
    const reader = new FileReader()
    reader.onload = ev => setProfilePreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleCancel = () => window.history.back()

  const handleSave = e => {
    e.preventDefault()
    if (!agree) return
    console.log('Save teacher profile', {
      basic, professional, quals, experiences, certs,
      availability, preferredLevels, linkedin, bio,
      documents, pan, profilePic, bank
    })
  }

  return (
    <section className="edit-student-page edit-teacher-page">
      <div className="esp-hero">
        <div className="esp-badge">
          <MdPerson /> Edit Teacher Profile
        </div>
        <h1 className="esp-title">Edit Teacher Profile</h1>
        <p className="esp-note">
          Manage teacher professional, qualification, availability and compliance details here.
        </p>
      </div>

      <form className="esp-form" onSubmit={handleSave}>
        {/* 1 BASIC */}
        <div className="form-section dash-section">
          <div className="fs-head"><h2>Basic Information</h2></div>
          <div className="fs-grid">
            <div className="f-control required">
              <label>Name</label>
              <div className="f-input icon"><MdPerson /><input name="name" required value={basic.name} onChange={onBasic} placeholder="Full name" /></div>
            </div>
            <div className="f-control required">
              <label>Email</label>
              <div className="f-input icon"><MdEmail /><input type="email" name="email" required value={basic.email} onChange={onBasic} placeholder="name@example.com" /></div>
            </div>
            <div className="f-control">
              <label>Phone</label>
              <div className="f-input icon"><MdPhone /><input name="phone" value={basic.phone} onChange={onBasic} placeholder="+91 ..." /></div>
            </div>
            <div className="f-control">
              <label>Alternate Number</label>
              <div className="f-input icon"><MdPhone /><input name="altPhone" value={basic.altPhone} onChange={onBasic} placeholder="+91 ..." /></div>
            </div>
            <div className="f-control">
              <label>Date of Birth</label>
              <div className="f-input icon"><MdCalendarToday /><input type="date" name="dob" value={basic.dob} onChange={onBasic} /></div>
            </div>
            <div className="f-control">
              <label>Gender</label>
              <select name="gender" value={basic.gender} onChange={onBasic}>
                <option value="">Select</option><option>Female</option><option>Male</option><option>Other</option><option>Prefer not to say</option>
              </select>
            </div>
            <div className="f-control">
              <label>Status</label>
              <select name="status" value={basic.status} onChange={onBasic}>
                <option value="active">Active</option><option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2 PROFESSIONAL */}
        <div className="form-section dash-section">
          <div className="fs-head"><h2>Professional Information</h2></div>
          <div className="fs-grid">
            <div className="f-control">
              <label>Specialization</label>
              <div className="f-input icon"><MdWork /><input name="specialization" value={professional.specialization} onChange={onProfessional} placeholder="e.g. Physics" /></div>
            </div>
            <div className="f-control">
              <label>Years of Experience</label>
              <div className="f-input icon"><MdStarRate /><input name="years" value={professional.years} onChange={onProfessional} placeholder="e.g. 5" /></div>
            </div>
            <div className="f-control">
              <label>Hourly Rate (INR)</label>
              <div className="f-input icon"><MdCurrencyRupee /><input name="rate" value={professional.rate} onChange={onProfessional} placeholder="e.g. 800" /></div>
            </div>
          </div>
        </div>

        {/* 3 EDUCATION & EXPERIENCE */}
        <div className="form-section dash-section">
          <div className="fs-head"><h2>Education & Experience</h2></div>

          {/* Qualifications */}
          <div className="sub-block">
            <h3 className="mini-head">Qualifications</h3>
            <div className="doc-fields slim">
              <div className="f-control">
                <label>Degree</label>
                <input name="degree" value={qualDraft.degree} onChange={onQualDraft} placeholder="B.Sc / M.Ed ..." />
              </div>
              <div className="f-control">
                <label>Specialization</label>
                <input name="specialization" value={qualDraft.specialization} onChange={onQualDraft} placeholder="Subject" />
              </div>
              <div className="f-control">
                <label>University</label>
                <input name="university" value={qualDraft.university} onChange={onQualDraft} placeholder="University" />
              </div>
              <div className="f-control">
                <label>Year</label>
                <input name="year" value={qualDraft.year} onChange={onQualDraft} placeholder="2022" />
              </div>
              <div className="f-control add-btn-cell">
                <label>&nbsp;</label>
                <button type="button" className="mini-btn primary small" onClick={addQualification} disabled={!qualDraft.degree || !qualDraft.university}>
                  <MdAdd /> Add
                </button>
              </div>
            </div>
            {quals.length > 0 && (
              <ul className="doc-list">
                {quals.map(q => (
                  <li key={q.id} className="doc-item">
                    <span className="doc-name">
                      {q.degree} <em>({q.specialization || '—'})</em>
                    </span>
                    <span className="doc-file">{q.university} {q.year && `• ${q.year}`}</span>
                    <button type="button" className="icon-btn danger" onClick={() => removeQualification(q.id)}><MdDelete /></button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Teaching Experience */}
            <div className="sub-block">
              <h3 className="mini-head">Teaching Experience</h3>
              <div className="doc-fields slim">
                <div className="f-control">
                  <label>Institution</label>
                  <input name="institution" value={expDraft.institution} onChange={onExpDraft} placeholder="School / Institute" />
                </div>
                <div className="f-control">
                  <label>Role</label>
                  <input name="role" value={expDraft.role} onChange={onExpDraft} placeholder="Teacher / Tutor" />
                </div>
                <div className="f-control">
                  <label>Subjects Taught</label>
                  <input name="subjects" value={expDraft.subjects} onChange={onExpDraft} placeholder="e.g. Physics, Math" />
                </div>
                <div className="f-control">
                  <label>From</label>
                  <input type="date" name="from" value={expDraft.from} onChange={onExpDraft} />
                </div>
                <div className="f-control">
                  <label>To</label>
                  <input type="date" name="to" value={expDraft.to} onChange={onExpDraft} disabled={expDraft.current} />
                </div>
                <div className="f-control">
                  <label>Current</label>
                  <input type="checkbox" name="current" checked={expDraft.current} onChange={onExpDraft} style={{ width: '20px', height: '20px' }} />
                </div>
                <div className="f-control add-btn-cell">
                  <label>&nbsp;</label>
                  <button type="button" className="mini-btn primary small" onClick={addExperience} disabled={!expDraft.institution || !expDraft.role}><MdAdd /> Add</button>
                </div>
              </div>
              {experiences.length > 0 && (
                <ul className="doc-list">
                  {experiences.map(ex => (
                    <li key={ex.id} className="doc-item">
                      <span className="doc-name">
                        {ex.institution} <em>({ex.role})</em>
                      </span>
                      <span className="doc-file">
                        {ex.subjects || '—'} • {ex.from || '—'} - {ex.current ? 'Present' : (ex.to || '—')}
                      </span>
                      <button type="button" className="icon-btn danger" onClick={() => removeExperience(ex.id)}><MdDelete /></button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          {/* Certifications */}
          <div className="sub-block">
            <h3 className="mini-head">Certifications</h3>
            <div className="doc-fields slim">
              <div className="f-control">
                <label>Certificate Name</label>
                <input name="name" value={certDraft.name} onChange={onCertDraft} placeholder="Cert name" />
              </div>
              <div className="f-control">
                <label>Authority</label>
                <input name="authority" value={certDraft.authority} onChange={onCertDraft} placeholder="Issuing body" />
              </div>
              <div className="f-control">
                <label>Certification ID</label>
                <input name="certId" value={certDraft.certId} onChange={onCertDraft} placeholder="ID" />
              </div>
              <div className="f-control">
                <label>Year</label>
                <input name="year" value={certDraft.year} onChange={onCertDraft} placeholder="2023" />
              </div>
              <div className="f-control">
                <label>Expiry</label>
                <input type="date" name="expiry" value={certDraft.expiry} onChange={onCertDraft} />
              </div>
              <div className="f-control add-btn-cell">
                <label>&nbsp;</label>
                <button type="button" className="mini-btn primary small" onClick={addCert} disabled={!certDraft.name || !certDraft.authority}><MdAdd /> Add</button>
              </div>
            </div>
            {certs.length > 0 && (
              <ul className="doc-list">
                {certs.map(c => (
                  <li key={c.id} className="doc-item">
                    <span className="doc-name">
                      {c.name} <em>({c.authority})</em>
                    </span>
                    <span className="doc-file">{c.certId || '—'} {c.year && `• ${c.year}`} {c.expiry && `• Exp: ${c.expiry}`}</span>
                    <button type="button" className="icon-btn danger" onClick={() => removeCert(c.id)}><MdDelete /></button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 4 AVAILABILITY */}
        <div className="form-section dash-section">
          <div className="fs-head"><h2>Availability & Preferences</h2></div>
          <div className="fs-grid">
            <div className="f-control">
              <label>Availability From</label>
              <div className="f-input icon"><MdTimer /><input type="time" name="from" value={availability.from} onChange={onAvailability} /></div>
            </div>
            <div className="f-control">
              <label>Availability To</label>
              <div className="f-input icon"><MdTimer /><input type="time" name="to" value={availability.to} onChange={onAvailability} /></div>
            </div>
            <div className="f-control wide">
              <label>Preferred Student Levels</label>
              <div className="multi-chips">
                {levelOptions.map(l => (
                  <button
                    type="button"
                    key={l}
                    className={'chip' + (preferredLevels.includes(l) ? ' active' : '')}
                    onClick={() => togglePreferredLevel(l)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="f-control wide">
              <label>LinkedIn Profile</label>
              <div className="f-input icon"><MdLink /><input value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/username" /></div>
            </div>
          </div>
        </div>

        {/* 5 BIO */}
        <div className="form-section dash-section">
          <div className="fs-head"><h2>Bio & Additional Information</h2></div>
          <div className="fs-grid">
            <div className="f-control wide">
              <label>Bio / Summary</label>
              <div className="f-input textarea icon"><MdDescription /><textarea name="summary" rows={4} value={bio.summary} onChange={onBio} placeholder="Short professional summary..." /></div>
            </div>
            <div className="f-control wide">
              <label>Additional Notes</label>
              <div className="f-input textarea"><textarea name="additional" rows={3} value={bio.additional} onChange={onBio} placeholder="Any other notes..." /></div>
            </div>
          </div>
        </div>

        {/* 6 PROFILE & DOCS */}
        <div className="form-section dash-section">
          <div className="fs-head docs-head">
            <h2>Profile & Documents</h2>
            <span className="doc-count">{documents.length}/{MAX_DOCS} Documents</span>
          </div>
          <div className="docs-layout">
            <div className="doc-add-block">
              <div className="doc-fields">
                <div className="f-control">
                  <label>Document Name</label>
                  <input name="name" value={docForm.name} onChange={onDocField} placeholder="Resume" />
                </div>
                <div className="f-control">
                  <label>Document Type</label>
                  <select name="type" value={docForm.type} onChange={onDocField}>
                    <option value="">Select</option>
                    <option value="resume">Resume</option>
                    <option value="id">ID</option>
                    <option value="certificate">Certificate</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="f-control">
                  <label>PAN Number</label>
                  <div className="f-input icon"><MdDocumentScanner /><input value={pan} onChange={e => setPan(e.target.value)} placeholder="ABCDE1234F" /></div>
                </div>
                <div className="f-control file-up">
                  <label>Upload</label>
                  <input type="file" onChange={onDocFile} disabled={documents.length >= MAX_DOCS} />
                </div>
                <div className="f-control add-btn-cell">
                  <label>&nbsp;</label>
                  <button type="button" className="mini-btn primary small" onClick={addDocument} disabled={!docForm.name || !docForm.type || !docForm.file || documents.length >= MAX_DOCS}>
                    <MdUploadFile /> Add
                  </button>
                </div>
              </div>
              {documents.length > 0 && (
                <ul className="doc-list">
                  {documents.map(d => (
                    <li key={d.id} className="doc-item">
                      <span className="doc-name">{d.name} <em>({d.type})</em></span>
                      <span className="doc-file">{d.fileName}</span>
                      <button type="button" className="icon-btn danger" onClick={() => removeDocument(d.id)}><MdDelete /></button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="profile-pic-block">
              <div className="profile-preview">
                {profilePreview ? <img src={profilePreview} alt="Profile" /> : (
                  <div className="placeholder">
                    <MdPerson /><span>No Photo</span>
                  </div>
                )}
              </div>
              <label className="upload-avatar-btn">
                <input type="file" accept="image/*" hidden onChange={handleProfilePic} />
                Upload Profile Picture
              </label>
            </div>
          </div>
        </div>

        {/* 7 BANK */}
        <div className="form-section dash-section">
          <div className="fs-head"><h2>Bank Account Details</h2></div>
          <div className="fs-grid">
            <div className="f-control">
              <label>Account Name</label>
              <div className="f-input icon"><MdAccountBalance /><input name="accountName" value={bank.accountName} onChange={onBank} placeholder="Name on account" /></div>
            </div>
            <div className="f-control">
              <label>Account Number</label>
              <input name="accountNumber" value={bank.accountNumber} onChange={onBank} placeholder="******" />
            </div>
            <div className="f-control">
              <label>IFSC</label>
              <input name="ifsc" value={bank.ifsc} onChange={onBank} placeholder="IFSC Code" />
            </div>
            <div className="f-control">
              <label>Bank Name</label>
              <input name="bankName" value={bank.bankName} onChange={onBank} />
            </div>
            <div className="f-control">
              <label>Branch</label>
              <input name="branch" value={bank.branch} onChange={onBank} />
            </div>
            <div className="f-control">
              <label>UPI ID</label>
              <input name="upi" value={bank.upi} onChange={onBank} placeholder="optional" />
            </div>
          </div>
        </div>

        {/* AGREEMENT */}
        <div className="form-section dash-section">
          <div className="fs-head"><h2>Confirmation</h2></div>
          <div className="fs-grid">
            <div className="f-control wide">
              <label>Agreement</label>
              <div className="agree-box">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agree}
                  onChange={e => setAgree(e.target.checked)}
                  style={{ width: 20, height: 20 }}
                />{' '}
                <span>I confirm all entered information is accurate.</span>
              </div>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn secondary" onClick={handleCancel}><MdClose /> Cancel</button>
            <button type="submit" className="btn primary" disabled={!agree}><MdSave /> Save Changes</button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default EditTeachersProfile