import mongoose from 'mongoose'

const VideoMetadataSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  filePath: {
    type: String,
    required: true,
  },
  week: {
    type: Number,
    required: true,
    min: 0,
    index: true,
  },
  exercise: {
    type: Number,
    required: true,
    min: 0,
  },
  order: {
    type: Number,
    required: true,
    min: 0,
    index: true,
  },
  prerequisiteVideoId: {
    type: String,
    default: null,
  },
  isIntroVideo: {
    type: Boolean,
    default: false,
    index: true,
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

// Update the updatedAt timestamp on save
VideoMetadataSchema.pre('save', function(this: any, next: any) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.VideoMetadata || mongoose.model('VideoMetadata', VideoMetadataSchema)
