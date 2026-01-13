# API Reference

Complete API documentation for the ABC Active Breathing Course application.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-domain.com/api`

## Authentication

Most API endpoints require authentication via Clerk. Include the Clerk session token in requests:

```javascript
fetch('/api/endpoint', {
  headers: {
    'Authorization': 'Bearer YOUR_CLERK_TOKEN'
  }
})
```

## Progress APIs

### Get User Progress

Get all video progress for the authenticated user.

**Endpoint**: `GET /api/progress`

**Authentication**: Required

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "userId": "user_123",
      "videoId": "intro-video",
      "currentTime": 45.5,
      "duration": 120,
      "completed": false,
      "lastWatched": "2026-01-13T10:30:00Z"
    }
  ]
}
```

### Update Video Progress

Update progress for a specific video.

**Endpoint**: `POST /api/progress/update`

**Authentication**: Required

**Request Body**:
```json
{
  "videoId": "week-1-exercise-1",
  "currentTime": 45.5,
  "duration": 120
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "userId": "user_123",
    "videoId": "week-1-exercise-1",
    "currentTime": 45.5,
    "duration": 120,
    "completed": false,
    "lastWatched": "2026-01-13T10:30:00Z"
  }
}
```

**Notes**:
- Progress is automatically marked as completed when `currentTime >= duration * 0.9` (90% threshold)
- Updates are typically sent every 10 seconds during video playback

### Mark Video Complete

Manually mark a video as completed.

**Endpoint**: `POST /api/progress/complete`

**Authentication**: Required

**Request Body**:
```json
{
  "videoId": "week-1-exercise-1"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "userId": "user_123",
    "videoId": "week-1-exercise-1",
    "completed": true,
    "completedAt": "2026-01-13T10:30:00Z"
  },
  "message": "Video marked as completed"
}
```

### Reset Progress

Reset video progress for the authenticated user.

**Endpoint**: `DELETE /api/progress/reset?videoId=xxx`

**Authentication**: Required

**Query Parameters**:
- `videoId` (optional): Specific video to reset. If omitted, resets all progress.

**Response**:
```json
{
  "success": true,
  "message": "Progress reset for video: week-1-exercise-1"
}
```

## Video APIs

### Get All Videos

Get all videos in sequence order.

**Endpoint**: `GET /api/videos`

**Authentication**: Required

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "videoId": "intro-video",
      "title": "Introduction Video",
      "description": "Welcome to the breathing program",
      "filePath": "/assets/videos/Intro Video.mp4",
      "week": 0,
      "exercise": 0,
      "order": 0,
      "isIntroVideo": true
    }
  ]
}
```

### Get Available Videos

Get unlocked videos for the authenticated user.

**Endpoint**: `GET /api/videos/available`

**Authentication**: Required

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "videoId": "intro-video",
      "title": "Introduction Video",
      "week": 0,
      "order": 0
    },
    {
      "videoId": "week-1-exercise-1",
      "title": "Week 1 - Exercise 1",
      "week": 1,
      "order": 1
    }
  ]
}
```

### Get Video Metadata

Get metadata for a specific video.

**Endpoint**: `GET /api/videos/metadata?videoId=xxx`

**Authentication**: Required

**Query Parameters**:
- `videoId` (required): Video identifier

**Response**:
```json
{
  "success": true,
  "data": {
    "videoId": "week-1-exercise-1",
    "title": "Week 1 - Exercise 1: Belly Breathing",
    "description": "Learn how to do Belly Breathing",
    "filePath": "/assets/videos/Session 1 - excercise 1, part 2 final.mp4",
    "week": 1,
    "exercise": 1,
    "order": 1,
    "prerequisiteVideoId": "intro-video"
  }
}
```

### Check Unlock Status

Check if a video is unlocked for the authenticated user.

**Endpoint**: `GET /api/videos/unlock-status?videoId=xxx`

**Authentication**: Required

**Query Parameters**:
- `videoId` (required): Video identifier

**Response**:
```json
{
  "success": true,
  "data": {
    "videoId": "week-1-exercise-1",
    "isUnlocked": true
  }
}
```

### Initialize Video Metadata

Initialize video metadata in the database (admin only).

**Endpoint**: `POST /api/videos/init`

**Authentication**: Required (Admin)

**Response**:
```json
{
  "success": true,
  "message": "Video metadata initialized successfully"
}
```

## Admin APIs

### Get All User Progress

Get progress for all users (admin only).

**Endpoint**: `GET /api/admin/progress`

**Authentication**: Required (Admin)

**Response**:
```json
{
  "success": true,
  "data": {
    "user_123": [
      {
        "videoId": "intro-video",
        "completed": true,
        "completedAt": "2026-01-13T10:00:00Z"
      }
    ],
    "user_456": [
      {
        "videoId": "intro-video",
        "completed": false,
        "currentTime": 30
      }
    ]
  }
}
```

### Reset User Progress

Reset progress for a specific user (admin only).

**Endpoint**: `POST /api/admin/progress/reset`

**Authentication**: Required (Admin)

**Request Body**:
```json
{
  "targetUserId": "user_123",
  "videoId": "week-1-exercise-1"  // Optional
}
```

**Response**:
```json
{
  "success": true,
  "message": "Progress reset for user user_123, video week-1-exercise-1"
}
```

### Manually Unlock Video

Manually unlock a video for a specific user (admin only).

**Endpoint**: `POST /api/admin/videos/unlock`

**Authentication**: Required (Admin)

**Request Body**:
```json
{
  "targetUserId": "user_123",
  "videoId": "week-2-exercise-1"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Video week-2-exercise-1 unlocked for user user_123",
  "data": {
    "userId": "user_123",
    "videoId": "week-2-exercise-1",
    "completed": true,
    "completedAt": "2026-01-13T10:30:00Z"
  }
}
```

### Get Analytics

Get video completion analytics (admin only).

**Endpoint**: `GET /api/admin/videos/analytics`

**Authentication**: Required (Admin)

**Response**:
```json
{
  "success": true,
  "data": {
    "overall": {
      "totalUsers": 150,
      "totalProgressRecords": 450,
      "totalCompletedRecords": 300,
      "overallCompletionRate": 66.67
    },
    "byVideo": [
      {
        "videoId": "intro-video",
        "title": "Introduction Video",
        "week": 0,
        "exercise": 0,
        "totalViews": 150,
        "completedViews": 145,
        "completionRate": 96.67
      }
    ]
  }
}
```

## Form APIs

### Contact Form

Submit a contact form.

**Endpoint**: `POST /api/contact`

**Authentication**: Optional

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about course",
  "message": "I have a question..."
}
```

**Response**:
```json
{
  "success": true,
  "message": "Contact form submitted successfully"
}
```

### Donation Form

Submit a donation.

**Endpoint**: `POST /api/donate`

**Authentication**: Optional

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "amount": 50,
  "message": "Happy to support!"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Donation recorded successfully"
}
```

### Enrollment Form

Submit course enrollment.

**Endpoint**: `POST /api/enroll`

**Authentication**: Optional

**Request Body**:
```json
{
  "parentName": "Jane Doe",
  "email": "jane@example.com",
  "childName": "Tommy",
  "childAge": 10,
  "additionalInfo": "No medical conditions"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Enrollment submitted successfully"
}
```

### Newsletter Subscription

Subscribe to newsletter.

**Endpoint**: `POST /api/newsletter`

**Authentication**: Optional

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

**Notes**:
- Prevents duplicate subscriptions
- Reactivates unsubscribed users

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": "Additional error details (optional)"
  }
}
```

### Common Error Codes

- `UNAUTHORIZED` (401): Authentication required
- `FORBIDDEN` (403): Insufficient permissions
- `INVALID_INPUT` (400): Invalid request data
- `NOT_FOUND` (404): Resource not found
- `VALIDATION_ERROR` (400): Validation failed
- `INTERNAL_ERROR` (500): Server error

## Rate Limiting

- No rate limiting currently implemented
- Consider implementing for production:
  - 100 requests per minute per IP
  - 1000 requests per hour per user

## Webhooks

Currently not implemented. Future consideration for:
- Payment confirmations
- User registration events
- Progress milestones

## SDK / Client Libraries

### JavaScript/TypeScript Example

```typescript
// Using fetch
const response = await fetch('/api/progress/update', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    videoId: 'week-1-exercise-1',
    currentTime: 45.5,
    duration: 120,
  }),
})

const data = await response.json()
```

### React Hook Example

```typescript
import { useVideoProgress } from '@/hooks/useVideoProgress'

function VideoComponent({ videoId }) {
  const { progress, updateProgress, markCompleted } = useVideoProgress(videoId)
  
  // Use in your component
}
```

## Testing

### Using curl

```bash
# Get user progress
curl http://localhost:3000/api/progress \
  -H "Authorization: Bearer YOUR_TOKEN"

# Update progress
curl -X POST http://localhost:3000/api/progress/update \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"videoId":"week-1-exercise-1","currentTime":45.5,"duration":120}'
```

### Using Postman

1. Import the API endpoints
2. Set up Clerk authentication
3. Test each endpoint

---

**API Version**: 1.0.0
