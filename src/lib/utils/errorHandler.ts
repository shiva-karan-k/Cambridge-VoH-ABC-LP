import { NextResponse } from 'next/server'

export interface ApiError {
  success: false
  error: {
    code: string
    message: string
    details?: any
  }
}

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function handleApiError(error: unknown): NextResponse<ApiError> {
  console.error('API Error:', error)

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      },
      { status: error.statusCode }
    )
  }

  if (error instanceof Error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: error.message,
        },
      },
      { status: 500 }
    )
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'UNKNOWN_ERROR',
        message: 'An unknown error occurred',
      },
    },
    { status: 500 }
  )
}

export function validateRequired(fields: Record<string, any>, requiredFields: string[]): void {
  const missing = requiredFields.filter(field => !fields[field])
  
  if (missing.length > 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      `Missing required fields: ${missing.join(', ')}`,
      400,
      { missingFields: missing }
    )
  }
}

export function validateNumber(value: any, fieldName: string, min?: number, max?: number): void {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new AppError(
      'VALIDATION_ERROR',
      `${fieldName} must be a valid number`,
      400
    )
  }

  if (min !== undefined && value < min) {
    throw new AppError(
      'VALIDATION_ERROR',
      `${fieldName} must be at least ${min}`,
      400
    )
  }

  if (max !== undefined && value > max) {
    throw new AppError(
      'VALIDATION_ERROR',
      `${fieldName} must be at most ${max}`,
      400
    )
  }
}
