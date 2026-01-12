'use client';

export default function SimplePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Simple Main Page Test</h1>
      <p>This is a simplified version without Clerk components.</p>
      <div style={{ marginTop: '2rem' }}>
        <h2>Navigation Test</h2>
        <ul>
          <li><a href="/weeks/week-1">Week 1</a></li>
          <li><a href="/weeks/week-2">Week 2</a></li>
          <li><a href="/admin">Admin</a></li>
        </ul>
      </div>
    </div>
  );
}