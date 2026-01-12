import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)',
      padding: '2rem'
    }}>
      <div style={{ textAlign: 'center' }}>
        <img 
          src="/assets/images/ABC Logo 1.png" 
          alt="ABC Logo" 
          style={{ height: '60px', marginBottom: '2rem' }}
        />
        <SignIn 
          appearance={{
            elements: {
              rootBox: {
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                borderRadius: '16px'
              },
              card: {
                borderRadius: '16px',
                border: 'none'
              },
              headerTitle: {
                fontFamily: "'MyType', monospace",
                textTransform: 'uppercase',
                color: '#1a365d'
              },
              formButtonPrimary: {
                backgroundColor: '#2dd4bf',
                '&:hover': {
                  backgroundColor: '#14b8a6'
                }
              },
              socialButtonsBlockButton: {
                border: '2px solid #e5e7eb',
                '&:hover': {
                  borderColor: '#2dd4bf'
                }
              }
            }
          }}
        />
      </div>
    </div>
  )
}