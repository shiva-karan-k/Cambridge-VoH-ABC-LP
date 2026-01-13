# Video Progression System

## Overview

The Video Progression System is a comprehensive feature that manages sequential video access for the learning platform. Students must watch videos in order, starting with an intro video, then unlocking subsequent weekly exercise videos one by one.

## Features

- **Sequential Video Unlocking**: Videos unlock only after completing prerequisite videos
- **Progress Tracking**: Automatic tracking of video watch progress with 90% completion threshold
- **Resume Functionality**: Users can resume videos from where they left off
- **Admin Dashboard**: Complete admin interface for monitoring and managing user progress
- **Analytics**: Detailed completion rates and engagement metrics

## Architecture

### Database Models

- **VideoProgress**: Tracks user progress for each video
- **VideoMetadata**: Stores video information and sequence configuration

### API Routes

#### Progress APIs
- `GET /api/progress` - Get user's complete progress
- `POST /api/progress/update` - Update video progress
- `POST /api/progress/complete` - Mark video as completed
- `DELETE /api/progress/reset` - Reset user progress

#### Video APIs
- `GET /api/videos` - Get all videos in sequence
- `GET /api/videos/available` - Get unlocked videos for user
- `GET /api/videos/metadata?videoId=xxx` - Get video metadata
- `GET /api/videos/unlock-status?videoId=xxx` - Check if video is unlocked
- `POST /api/videos/init` - Initialize video metadata (admin only)

#### Admin APIs
- `GET /api/admin/progress` - Get all users' progress
- `POST /api/admin/progress/reset` - Reset user progress
- `POST /api/admin/videos/unlock` - Manually unlock video for user
- `GET /api/admin/videos/analytics` - Get completion analytics

### Components

- **VideoPlayer**: Custom video player with progress tracking and lock overlay
- **ProgressIndicator**: Visual progress indicator showing completion status
- **Admin Dashboard**: Complete admin interface at `/admin/videos`

### Hooks

- **useVideoProgress**: Manages video progress state and API communication
- **useVideoUnlock**: Checks and manages video unlock status

## Setup Instructions

### 1. Initialize Video Metadata

After deployment, an admin must initialize the video metadata in the database:

```bash
# Call the init endpoint (requires admin authentication)
POST /api/videos/init
```

Or use the admin panel to trigger initialization.

### 2. Configure Video Sequence

Edit `src/lib/config/videoSequence.ts` to configure your video sequence:

```typescript
export const VIDEO_SEQUENCE: VideoConfig[] = [
  {
    videoId: 'intro-video',
    title: 'Introduction Video',
    filePath: '/assets/videos/Intro Video.mp4',
    thumbnailPath: '/assets/images/intro-thumbnail.png',
    week: 0,
    exercise: 0,
    order: 0,
    isIntroVideo: true,
  },
  // Add more videos...
]
```

### 3. Environment Variables

Ensure MongoDB connection is configured in `.env.local`:

```
MONGODB_URI=your_mongodb_connection_string
```

## Usage

### For Students

1. Navigate to any week page (e.g., `/weeks/week-1`)
2. Videos will show as locked or unlocked based on completion status
3. Watch videos to automatically track progress
4. Videos are marked complete at 90% watch time
5. Next video unlocks automatically upon completion

### For Admins

1. Navigate to `/admin/videos`
2. View overall statistics and per-video analytics
3. Monitor individual user progress
4. Reset progress or manually unlock videos as needed

## Video Progression Logic

1. **Intro Video**: Always unlocked for all users
2. **Sequential Unlock**: Each video requires the previous video to be completed
3. **Completion Threshold**: Videos are marked complete at 90% watch time
4. **Progress Persistence**: Progress is saved every 10 seconds during playback
5. **Resume Support**: Users automatically resume from last saved position

## Performance Optimizations

- **Caching**: Frequently accessed video metadata is cached
- **Indexed Queries**: MongoDB indexes on userId and videoId for fast lookups
- **Debounced Updates**: Progress updates are throttled to reduce API calls
- **Connection Pooling**: MongoDB connection pooling for concurrent users

## Error Handling

- Client-side error handling for network issues
- Server-side validation for all API inputs
- Graceful degradation for offline scenarios
- Comprehensive error logging

## Testing

The system includes:
- Input validation on all API endpoints
- Authentication checks on all routes
- Admin authorization for administrative functions
- Error handling for database operations

## Future Enhancements

- Video streaming optimization
- Offline video caching
- Progress notifications
- Completion certificates
- Advanced analytics dashboard
