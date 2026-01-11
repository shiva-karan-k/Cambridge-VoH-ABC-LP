import mongoose from 'mongoose'

const EnrollmentSchema = new mongoose.Schema({
  parentName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  childName: {
    type: String,
    required: true,
  },
  childAge: {
    type: Number,
    required: true,
    min: 7,
    max: 18,
  },
  additionalInfo: {
    type: String,
    default: '',
  },
  userId: {
    type: String, // Clerk user ID
    required: false,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'completed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema)