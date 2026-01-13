'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface UserProgress {
  userId: string
  progress: Array<{
    videoId: string
    currentTime: number
    duration: number
    completed: boolean
    lastWatched: string
  }>
}

interface Analytics {
  overall: {
    totalUsers: number
    totalProgressRecords: number
    totalCompletedRecords: number
    overallCompletionRate: number
  }
  byVideo: Array<{
    videoId: string
    title: string
    week: number
    exercise: number
    totalViews: number
    completedViews: number
    completionRate: number
  }>
}

export default function AdminVideosPage() {
  const router = useRouter()
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [allProgress, setAllProgress] = useState<Record<string, any[]>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<string>('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Fetch analytics
      const analyticsRes = await fetch('/api/admin/videos/analytics')
      const analyticsData = await analyticsRes.json()

      if (!analyticsData.success) {
        throw new Error(analyticsData.error || 'Failed to fetch analytics')
      }

      setAnalytics(analyticsData.data)

      // Fetch all progress
      const progressRes = await fetch('/api/admin/progress')
      const progressData = await progressRes.json()

      if (!progressData.success) {
        throw new Error(progressData.error || 'Failed to fetch progress')
      }

      setAllProgress(progressData.data)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetProgress = async (userId: string, videoId?: string) => {
    if (!confirm(`Are you sure you want to reset progress for user ${userId}?`)) {
      return
    }

    try {
      const response = await fetch('/api/admin/progress/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUserId: userId, videoId }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error?.message || 'Failed to reset progress')
      }

      alert('Progress reset successfully')
      fetchData()
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const handleUnlockVideo = async (userId: string, videoId: string) => {
    try {
      const response = await fetch('/api/admin/videos/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUserId: userId, videoId }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error?.message || 'Failed to unlock video')
      }

      alert('Video unlocked successfully')
      fetchData()
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  if (isLoading) {
    return (
      <div className="admin-container">
        <h1>Video Progress Dashboard</h1>
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="admin-container">
        <h1>Video Progress Dashboard</h1>
        <div className="error-box">
          <p>Error: {error}</p>
          <button onClick={fetchData}>Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-container">
      <h1>Video Progress Dashboard</h1>

      {/* Overall Analytics */}
      {analytics && (
        <div className="analytics-section">
          <h2>Overall Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{analytics.overall.totalUsers}</div>
              <div className="stat-label">Total Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{analytics.overall.totalProgressRecords}</div>
              <div className="stat-label">Total Views</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{analytics.overall.totalCompletedRecords}</div>
              <div className="stat-label">Completed Views</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{analytics.overall.overallCompletionRate}%</div>
              <div className="stat-label">Completion Rate</div>
            </div>
          </div>

          <h3>Video Analytics</h3>
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Video</th>
                <th>Week</th>
                <th>Total Views</th>
                <th>Completed</th>
                <th>Completion Rate</th>
              </tr>
            </thead>
            <tbody>
              {analytics.byVideo.map((video) => (
                <tr key={video.videoId}>
                  <td>{video.title}</td>
                  <td>Week {video.week}</td>
                  <td>{video.totalViews}</td>
                  <td>{video.completedViews}</td>
                  <td>{video.completionRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* User Progress */}
      <div className="user-progress-section">
        <h2>User Progress</h2>
        <div className="user-list">
          {Object.keys(allProgress).map((userId) => (
            <div key={userId} className="user-card">
              <div className="user-header">
                <h3>User: {userId}</h3>
                <button
                  className="btn-danger"
                  onClick={() => handleResetProgress(userId)}
                >
                  Reset All Progress
                </button>
              </div>
              <div className="progress-list">
                {allProgress[userId].map((progress: any) => (
                  <div key={progress.videoId} className="progress-item">
                    <div className="progress-info">
                      <strong>{progress.videoId}</strong>
                      <span className={progress.completed ? 'completed' : 'in-progress'}>
                        {progress.completed ? '✓ Completed' : 'In Progress'}
                      </span>
                    </div>
                    <div className="progress-actions">
                      {!progress.completed && (
                        <button
                          className="btn-small"
                          onClick={() => handleUnlockVideo(userId, progress.videoId)}
                        >
                          Mark Complete
                        </button>
                      )}
                      <button
                        className="btn-small btn-danger"
                        onClick={() => handleResetProgress(userId, progress.videoId)}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .admin-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        h1 {
          font-size: 32px;
          margin-bottom: 30px;
          color: #333;
        }
        h2 {
          font-size: 24px;
          margin: 30px 0 20px;
          color: #444;
        }
        h3 {
          font-size: 18px;
          margin: 20px 0 15px;
          color: #555;
        }
        .error-box {
          background: #ffebee;
          border: 1px solid #ef5350;
          padding: 20px;
          border-radius: 8px;
          color: #c62828;
        }
        .analytics-section {
          margin-bottom: 40px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .stat-card {
          background: #f8f9fa;
          padding: 24px;
          border-radius: 12px;
          text-align: center;
        }
        .stat-value {
          font-size: 36px;
          font-weight: 700;
          color: #007bff;
          margin-bottom: 8px;
        }
        .stat-label {
          font-size: 14px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .analytics-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .analytics-table th {
          background: #007bff;
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: 600;
        }
        .analytics-table td {
          padding: 12px;
          border-bottom: 1px solid #e0e0e0;
        }
        .analytics-table tr:last-child td {
          border-bottom: none;
        }
        .user-card {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .user-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 2px solid #f0f0f0;
        }
        .progress-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .progress-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 6px;
        }
        .progress-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .progress-actions {
          display: flex;
          gap: 8px;
        }
        .completed {
          color: #4CAF50;
          font-weight: 600;
        }
        .in-progress {
          color: #FF9800;
          font-weight: 600;
        }
        button {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }
        .btn-danger {
          background: #ef5350;
          color: white;
        }
        .btn-danger:hover {
          background: #e53935;
        }
        .btn-small {
          padding: 6px 12px;
          font-size: 14px;
          background: #007bff;
          color: white;
        }
        .btn-small:hover {
          background: #0056b3;
        }
        .btn-small.btn-danger {
          background: #ef5350;
        }
        .btn-small.btn-danger:hover {
          background: #e53935;
        }
      `}</style>
    </div>
  )
}
