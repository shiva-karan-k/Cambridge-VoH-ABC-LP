import mongoose from 'mongoose'

const VideoProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  videoId: {
    type: String,
    required: true,
    index: true,
  },
  currentTime: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  duration: {
    type: Number,
    required: true,
    min: 0,
  },
  completed: {
    type: Boolean,
    default: false,
    index: true,
  },
  completedAt: {
    type: Date,
  },
  lastWatched: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Compound index for efficient queries
VideoProgressSchema.index({ userId: 1, videoId: 1 }, { unique: true })

// Update the updatedAt timestamp on save
VideoProgressSchema.pre('save', function(this: any, next: any) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.VideoProgress || mongoose.model('VideoProgress', VideoProgressSchema)
